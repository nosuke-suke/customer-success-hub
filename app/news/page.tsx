"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FadeInSection from "@/components/fade-in-section"
import NewsCard from "@/components/news-card"
import NewsSlider from "@/components/news-slider"
import PageHeader from "@/components/page-header"

interface NewsItem {
  id: number
  title: string
  source: string
  date: string
  summary: string
  imageUrl: string
  url: string
}

// ニュースサイトのドメインリスト
const NEWS_DOMAINS = [
  "nikkei.com",
  "reuters.com",
  "bloomberg.co.jp",
  "forbes.jp",
  "businessinsider.jp",
  "zdnet.com",
  "itmedia.co.jp",
  "techcrunch.com",
  "cnet.com",
  "ascii.jp"
]

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [error, setError] = useState<any>(null)

  console.log('Component mounted'); // コンポーネントのマウントを確認

  useEffect(() => {
    console.log('useEffect triggered');

    const fetchNews = async () => {
      console.log('fetchNews function called');
      try {
        const response = await fetch('/api/news');
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);

        if (!data.results || !Array.isArray(data.results)) {
          console.error('Unexpected API response format:', data);
          throw new Error('Invalid API response format');
        }

        setNewsItems(data.results);
      } catch (error: any) {
        console.error('API Error details:', {
          message: error.message,
          stack: error.stack
        });
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter news based on search term
  const filteredNews = newsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort news based on sort order
  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.date.replace(/年|月|日/g, ""))
    const dateB = new Date(b.date.replace(/年|月|日/g, ""))

    return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
  })

  return (
    <div className="min-h-screen">
      <PageHeader
        title="最新ニュース"
        description="カスタマーサクセス業界の最新ニュースをお届けします"
      />
      <div className="container mx-auto px-4 py-8">

        {/* Featured News Slider */}
        <FadeInSection>
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">ピックアップニュース</h2>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BDEBD2]"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-xl text-red-500">ニュースの取得に失敗しました。</p>
                </div>
              ) : (
                <NewsSlider newsItems={newsItems.slice(0, 3)} />
              )}
            </div>
          </section>
        </FadeInSection>

        {/* Search and Filter */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="キーワードで検索..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              >
                <Calendar size={16} />
                {sortOrder === "newest" ? "新しい順" : "古い順"}
                <ArrowUpDown size={16} />
              </Button>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BDEBD2]"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-xl text-red-500">ニュースの取得に失敗しました。</p>
                </div>
              ) : sortedNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedNews.map((item) => (
                    <NewsCard key={item.id} {...item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-700">検索結果が見つかりませんでした。</p>
                  <Button
                    className="mt-4 bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800"
                    onClick={() => setSearchTerm("")}
                  >
                    すべて表示
                  </Button>
                </div>
              )}
            </div>
          </section>
        </FadeInSection>
      </div>
    </div>
  )
}
