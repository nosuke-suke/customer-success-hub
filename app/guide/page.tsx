import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FadeInSection from "@/components/fade-in-section"
import CSTermAccordion from "@/components/cs-term-accordion"
import FlipCard from "@/components/flip-card"
import PageHeader from "@/components/page-header"

export default function GuidePage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="CSってなに？"
        description="カスタマーサクセスの基本から応用まで、初心者にもわかりやすく解説します。"
      />
      <div className="container mx-auto px-4 py-8">
        {/* 3-Step Understanding */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">3ステップでCSを理解しよう</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#BDEBD2]">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-[#DFF5E1] flex items-center justify-center text-2xl font-bold text-gray-800">
                        1
                      </div>
                    </div>
                    <CardTitle className="text-center">CSの定義</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">
                      カスタマーサクセスとは、顧客が製品やサービスを通じて目標を達成し、成功するためのサポートを行う活動です。
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#BDEBD2]">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-[#DFF5E1] flex items-center justify-center text-2xl font-bold text-gray-800">
                        2
                      </div>
                    </div>
                    <CardTitle className="text-center">CSの目的</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">
                      顧客の成功を支援することで、解約率の低減、顧客生涯価値（LTV）の向上、そして収益の安定化を図ります。
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#BDEBD2]">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-[#DFF5E1] flex items-center justify-center text-2xl font-bold text-gray-800">
                        3
                      </div>
                    </div>
                    <CardTitle className="text-center">CSの実践</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">
                      オンボーディング、定期的なチェックイン、ユーザー教育、プロアクティブなサポートなどを通じて実践します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* CS Terms Accordion */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7FCFA]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">よくある質問と用語解説</h2>

              <CSTermAccordion />
            </div>
          </section>
        </FadeInSection>

        {/* Flip Cards for Terms */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">CS用語カード</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <FlipCard
                  term="ARR"
                  definition="Annual Recurring Revenue（年間経常収益）。SaaS企業の年間サブスクリプション収益を表す指標です。"
                />
                <FlipCard
                  term="LTV"
                  definition="Life Time Value（顧客生涯価値）。顧客が契約期間中にもたらす総収益を表す指標です。"
                />
                <FlipCard
                  term="チャーン"
                  definition="解約率。一定期間内に解約した顧客の割合を表します。低いほど良いとされます。"
                />
                <FlipCard
                  term="オンボーディング"
                  definition="新規顧客が製品やサービスを効果的に利用できるようにサポートするプロセスです。"
                />
                <FlipCard
                  term="NPS"
                  definition="Net Promoter Score（顧客推奨度）。顧客ロイヤルティを測定する指標です。"
                />
                <FlipCard
                  term="エンゲージメント"
                  definition="顧客が製品やサービスとどれだけ積極的に関わっているかを示す指標です。"
                />
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* CS Book Diagnosis */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7FCFA]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">あなたに必要なCS本は？</h2>
              <p className="text-xl text-gray-700 mb-8">
                簡単な質問に答えて、あなたにぴったりのCS関連書籍を見つけましょう。
              </p>
              <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800 px-6 py-3 rounded-lg">
                <Link href="/books" className="flex items-center gap-2">
                  診断を始める <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </section>
        </FadeInSection>

        {/* Next Steps */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">次のステップ</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle>CS関連の書籍を探す</CardTitle>
                    <CardDescription>初心者から上級者まで、レベル別におすすめ書籍をご紹介</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      カスタマーサクセスについてさらに深く学ぶための書籍を見つけましょう。
                      入門書から実践的なガイドまで、幅広く取り揃えています。
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Link href="/books" className="flex items-center justify-center gap-2">
                        書籍一覧へ <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle>実務に役立つ記事を読む</CardTitle>
                    <CardDescription>現場で使えるCS実践ノウハウが満載</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>カスタマーサクセスの実務に役立つ記事やブログを読んで、 実践的なスキルを身につけましょう。</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Link href="/articles" className="flex items-center justify-center gap-2">
                        記事一覧へ <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        </FadeInSection>
      </div>
    </div>
  )
}
