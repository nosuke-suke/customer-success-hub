import { Suspense } from "react"
import { fetchQiitaArticles } from "@/lib/qiita"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import PageHeader from "@/components/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"

// 利用可能なタグの定義
export const AVAILABLE_TAGS = [
  "カスタマーサクセス",
  "UI", 
  "UX",
  "マーケティング",
  "SaaS",
  "分析",
  "データ分析",
  "ビジネス",
  "スタートアップ"
] as const

export type Tag = typeof AVAILABLE_TAGS[number]

// 記事の型定義
type UnifiedArticle = {
  id: string
  title: string
  url: string
  created_at: string
  likes_count: number
  user: {
    name: string
    profile_image_url: string
  }
  tags: Array<{ name: string }>
}

// ページごとの記事数
const ARTICLES_PER_PAGE = 20

// タグ選択コンポーネント
function TagSelector({ 
  selectedTags, 
  currentPage 
}: { 
  selectedTags: Tag[]
  currentPage: number
}) {
  const handleTagToggle = (tag: Tag) => {
    const currentTags = selectedTags
    let newTags: Tag[]

    if (currentTags.includes(tag)) {
      newTags = currentTags.filter(t => t !== tag)
    } else {
      newTags = [...currentTags, tag]
    }

    // タグを変更する時はページを1にリセット
    const params = new URLSearchParams()
    if (newTags.length > 0) {
      params.set("tags", newTags.join(","))
    }
    params.set("page", "1")

    return `/articles?${params.toString()}`
  }

  return (
    <div className="flex justify-end mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-700 mb-3">記事のタグを選択</h3>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map((tag) => (
            <Link key={tag} href={handleTagToggle(tag)}>
              <Button
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                className="text-xs"
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Button>
            </Link>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-gray-600">
              選択中: {selectedTags.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ページネーションコンポーネント
function Pagination({ 
  currentPage, 
  totalPages, 
  selectedTags 
}: { 
  currentPage: number
  totalPages: number
  selectedTags: Tag[]
}) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","))
    }
    params.set("page", page.toString())
    return `/articles?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Link 
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          前へ
        </Button>
      </Link>

      <div className="flex gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum
          if (totalPages <= 5) {
            pageNum = i + 1
          } else if (currentPage <= 3) {
            pageNum = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i
          } else {
            pageNum = currentPage - 2 + i
          }

          return (
            <Link key={pageNum} href={createPageUrl(pageNum)}>
              <Button
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                className="w-10"
              >
                {pageNum}
              </Button>
            </Link>
          )
        })}
      </div>

      <Link 
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
        >
          次へ
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  )
}

async function fetchArticlesForTags(tags: Tag[]): Promise<{
  articles: UnifiedArticle[]
  qiitaError: boolean
}> {
  let allQiitaArticles: UnifiedArticle[] = [];
  let qiitaError = false;

  // 各タグに対して記事を取得（より多くの記事を取得）
  for (const tag of tags) {
    try {
      const qiitaArticles = await fetchQiitaArticles(tag);
      allQiitaArticles = [...allQiitaArticles, ...qiitaArticles];
    } catch (error) {
      console.error(`Qiita記事の取得に失敗しました (${tag}):`, error);
      qiitaError = true;
    }
  }

  // 重複記事を除去（URLベース）
  const uniqueArticles = new Map<string, UnifiedArticle>();
  allQiitaArticles.forEach(article => {
    if (!uniqueArticles.has(article.url)) {
      uniqueArticles.set(article.url, article);
    }
  });

  // 記事を日付順にソート
  const sortedArticles = Array.from(uniqueArticles.values())
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return {
    articles: sortedArticles,
    qiitaError
  };
}

async function TechArticles({ 
  selectedTags, 
  currentPage 
}: { 
  selectedTags: Tag[]
  currentPage: number
}) {
  if (selectedTags.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-700">タグを選択して記事を表示してください。</p>
      </div>
    );
  }

  const result = await fetchArticlesForTags(selectedTags);
  const { articles, qiitaError } = result;

  // ページネーション計算
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const paginatedArticles = articles.slice(startIndex, endIndex)

  return (
    <div>
      {qiitaError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>記事の取得に失敗しました</AlertTitle>
          <AlertDescription className="mt-2">
            <div className="mb-1">
              ・Qiitaの記事を取得できませんでした。
            </div>
            <div className="mt-2 text-sm">
              環境変数の設定やネットワーク接続を確認してください。
            </div>
          </AlertDescription>
        </Alert>
      )}

      {articles.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          全{articles.length}件中 {startIndex + 1}-{Math.min(endIndex, articles.length)}件を表示 
          (ページ {currentPage}/{totalPages})
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedArticles.length > 0 ? (
          paginatedArticles.map((article) => (
            <Card key={`${article.url}-${article.id}`} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={article.user.profile_image_url} alt={article.user.name} />
                    <AvatarFallback>{article.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-600">{article.user.name}</div>
                </div>
                <CardTitle className="text-lg">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {article.title}
                  </a>
                </CardTitle>
                <CardDescription>
                  {formatDistanceToNow(new Date(article.created_at), { locale: ja, addSuffix: true })}
                  {" • "}
                  <span>❤️ {article.likes_count}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge
                      key={`${tag.name}-${index}`}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-xl text-gray-700">選択されたタグの記事が見つかりませんでした。</p>
          </div>
        )}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        selectedTags={selectedTags}
      />
    </div>
  );
}

export default function ArticlesPage({
  searchParams,
}: {
  searchParams: { tags?: string; page?: string }
}) {
  // URLパラメータからタグを取得、デフォルトは「カスタマーサクセス」
  const selectedTagsParam = searchParams.tags || "カスタマーサクセス";
  const selectedTags = selectedTagsParam
    .split(",")
    .filter((tag): tag is Tag => AVAILABLE_TAGS.includes(tag as Tag));

  // タグが指定されていない場合はデフォルトタグを設定
  const tagsToUse = selectedTags.length > 0 ? selectedTags : ["カスタマーサクセス" as Tag];

  // ページ番号を取得、デフォルトは1
  const currentPage = Math.max(1, parseInt(searchParams.page || "1", 10));

  return (
    <div className="min-h-screen">
      <PageHeader
        title="技術記事"
        description="Qiitaから厳選された技術記事をお届けします"
      />
      <div className="container mx-auto px-4 py-8">
        <TagSelector selectedTags={tagsToUse} currentPage={currentPage} />
        <Suspense fallback={<div className="text-center py-12">記事を読み込み中...</div>}>
          <TechArticles selectedTags={tagsToUse} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  )
}
