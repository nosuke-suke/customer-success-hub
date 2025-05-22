import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FadeInSection from "@/components/fade-in-section"

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#DFF5E1] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">サクセスの森
                <span className="block text-2xl sm:text-3xl text-gray-600 mt-2">カスタマーサクセス、<br></br>はじめの一歩はこの森から</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
              <br></br>ようこそ、「サクセスの森」へ。
              <br></br>カスタマーサクセスを“知る”と“使う”が、ここでつながります。
              <br></br>実務にも役立つヒントが、きっと見つかります。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800 px-6 py-3 rounded-lg text-lg">
                  <Link href="#about-cs" className="flex items-center gap-2">
                    CSとは何か？ <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/icon1.svg"
                alt="カスタマーサクセスのイラスト"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About CS Section */}
      <FadeInSection>
        <section id="about-cs" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">CSとは何か？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#BDEBD2] text-gray-800">
                      1
                    </span>
                    顧客の成功をサポート
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>カスタマーサクセスは、顧客が製品やサービスを通じて目標を達成できるよう支援する活動です。</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#BDEBD2] text-gray-800">
                      2
                    </span>
                    継続的な価値提供
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>顧客との長期的な関係構築を通じて、継続的な価値を提供し、解約を防止します。</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#BDEBD2] text-gray-800">
                      3
                    </span>
                    ビジネス成長の鍵
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>SaaS企業において、顧客維持率向上とアップセルによる収益拡大に貢献します。</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">あなたに合った情報を見つけましょう</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800 px-6 py-3 rounded-lg">
                  <Link href="/guide" className="flex items-center gap-2">
                    <BookOpen size={18} />
                    CSを学びたい方
                  </Link>
                </Button>
                <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800 px-6 py-3 rounded-lg">
                  <Link href="/articles" className="flex items-center gap-2">
                    <FileText size={18} />
                    業務で活かしたい方
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Featured Sections */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7FCFA]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">コンテンツをチェック</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="text-[#BDEBD2]" />
                    初心者ガイド
                  </CardTitle>
                  <CardDescription>CSの基礎を学ぶ</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>カスタマーサクセスの基本概念や用語を分かりやすく解説します。</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href="/guide" className="flex items-center justify-center gap-2">
                      詳しく見る <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="text-[#BDEBD2]" />
                    おすすめ本
                  </CardTitle>
                  <CardDescription>CS関連の書籍紹介</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>初心者から実務者まで、役立つCS関連の書籍を紹介します。</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href="/books" className="flex items-center justify-center gap-2">
                      詳しく見る <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-[#BDEBD2]" />
                    おすすめ記事
                  </CardTitle>
                  <CardDescription>実務に役立つ情報</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>CS実務に役立つ記事やブログを厳選して紹介します。</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href="/articles" className="flex items-center justify-center gap-2">
                      詳しく見る <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-[#BDEBD2]" />
                    SaaS成長トレンド
                  </CardTitle>
                  <CardDescription>業界データを可視化</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>主要SaaS企業の成長指標やトレンドをグラフで確認できます。</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href="/trends" className="flex items-center justify-center gap-2">
                      詳しく見る <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Latest News Preview */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">最新CSニュース</h2>
              <Button variant="outline">
                <Link href="/news" className="flex items-center gap-2">
                  すべて見る <ArrowRight size={16} />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="bg-white shadow hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">SaaS企業のカスタマーサクセス最新動向</CardTitle>
                    <CardDescription>2023年10月15日</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">
                      最新のカスタマーサクセス戦略とSaaS企業の成長についての分析記事です。
                      顧客維持率向上のための実践的なアプローチを紹介しています。
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="px-0">
                      <Link href="#" className="flex items-center gap-1 text-[#4CAF50]">
                        続きを読む <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  )
}
