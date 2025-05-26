import { Suspense } from "react"
import { fetchQiitaArticles } from "@/lib/qiita"
import { fetchZennArticles } from "@/lib/zenn"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import PageHeader from "@/components/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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

async function TechArticles() {
  let qiitaArticles: UnifiedArticle[] = [];
  let zennArticles: UnifiedArticle[] = [];
  let qiitaError = false;
  let zennError = false;

  try {
    // Qiitaの記事を取得
    qiitaArticles = await fetchQiitaArticles("カスタマーサクセス");
  } catch (error) {
    console.error("Qiita記事の取得に失敗しました:", error);
    qiitaError = true;
  }

  try {
    // Zennの記事を取得
    zennArticles = await fetchZennArticles("カスタマーサクセス");
  } catch (error) {
    console.error("Zenn記事の取得に失敗しました:", error);
    zennError = true;
  }

  // 記事を統合して日付順にソート
  const unifiedArticles: UnifiedArticle[] = [...qiitaArticles, ...zennArticles]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div>
      {(qiitaError || zennError) && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>一部の記事の取得に失敗しました</AlertTitle>
          <AlertDescription className="mt-2">
            {qiitaError && (
              <div className="mb-1">
                ・Qiitaの記事を取得できませんでした。
              </div>
            )}
            {zennError && (
              <div className="mb-1">
                ・Zennの記事を取得できませんでした。
              </div>
            )}
            <div className="mt-2 text-sm">
              取得できた記事のみ表示しています。しばらく時間をおいて再度お試しください。
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {unifiedArticles.length > 0 ? (
          unifiedArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
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
                  {article.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-xl text-gray-700">記事が見つかりませんでした。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="カスタマーサクセスの最新記事"
        description="QiitaとZennから厳選されたカスタマーサクセスに関する記事をお届けします"
      />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>記事を読み込み中...</div>}>
          <TechArticles />
        </Suspense>
      </div>
    </div>
  )
}
