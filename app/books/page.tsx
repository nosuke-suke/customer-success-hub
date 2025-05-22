import { Button } from "@/components/ui/button"
import FadeInSection from "@/components/fade-in-section"
import BookCard from "@/components/book-card"
import PageHeader from "@/components/page-header"

export default function BooksPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                title="CSおすすめの本"
                description="カスタマーサクセスの実践に役立つ厳選書籍をご紹介します"
            />
            <div className="container mx-auto px-4 py-8">

                {/* Filter Section */}
                <section className="py-8 px-4 sm:px-6 lg:px-8 border-b">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800">すべて</Button>
                            <Button variant="outline">入門編</Button>
                            <Button variant="outline">実務編</Button>
                            <Button variant="outline">マネジメント向け</Button>
                        </div>
                    </div>
                </section>

                {/* Books Grid */}
                <FadeInSection>
                    <section className="py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <BookCard
                                    title="カスタマーサクセス――サブスクリプション時代に求められる「顧客の成功」10の原則"
                                    author="ニック・メータ他"
                                    description="「対応」から「伴走」へ。顧客との関係づくりの新常識。
                                                    あらゆる分野でサブスクリプションが広がる今日、
                                                    企業は「売る」から「長く使ってもらう」への発想を変え、
                                                    データを駆使して顧客を支援しなければならない。
                                                    シリコンバレーで生まれ、アドビ、シスコ、マイクロソフトなど
                                                    有名企業が取り組む世界的潮流のバイブル、待望の邦訳。

                                                    「顧客の成功が企業の利益になる時代。これからのビジネスの基礎となる考え方と組織のあり方を学べるガイドブック。」
                                                    ――馬田隆明(東京大学本郷テックガレージディレクター、『逆説のスタートアップ思考』著者)"
                                    category="入門編"
                                    imageUrl="/book1.jpg"
                                    amazonUrl="https://www.amazon.co.jp/%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%83%BC%E3%82%B5%E3%82%AF%E3%82%BB%E3%82%B9%E2%80%95%E2%80%95%E3%82%B5%E3%83%96%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E6%99%82%E4%BB%A3%E3%81%AB%E6%B1%82%E3%82%81%E3%82%89%E3%82%8C%E3%82%8B%E3%80%8C%E9%A1%A7%E5%AE%A2%E3%81%AE%E6%88%90%E5%8A%9F%E3%80%8D10%E3%81%AE%E5%8E%9F%E5%89%87-%E3%83%8B%E3%83%83%E3%82%AF%E3%83%BB%E3%83%A1%E3%83%BC%E3%82%BF/dp/4862762603/ref=asc_df_4862762603?mcid=142c5324522f370ebc3ff9deb687c416&th=1&psc=1&tag=jpgo-22&linkCode=df0&hvadid=707442440814&hvpos=&hvnetw=g&hvrand=15417640991956887380&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9197747&hvtargid=pla-590109573317&psc=1&gad_source=1"
                                />

                                <BookCard
                                    title="完全版 カスタマーサクセス実行戦略"
                                    author="山田ひさのり"
                                    description="ビジネスの成功は“顧客”から始まる。
                                                究極のカスタマーサクセス戦略を身につけ、ビジネスを次のレベルへ──

                                                日本企業のカスタマーサクセスの教科書として、大好評だった旧版（『カスタマーサクセス実行戦略』（2020）『増補改訂版カスタマーサクセス実行戦略』（2021）にさらに、最新動向とノウハウを大幅に追加した完全版。

                                                新時代のビジネスモデルが急速に変化する中で、企業の成功はいかに「顧客との強固な関係」を築けるかにかかっている。"
                                    category="入門編"
                                    imageUrl="/book2.jpg"
                                    amazonUrl="https://www.amazon.co.jp/%E5%AE%8C%E5%85%A8%E7%89%88-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%83%BC%E3%82%B5%E3%82%AF%E3%82%BB%E3%82%B9%E5%AE%9F%E8%A1%8C%E6%88%A6%E7%95%A5-%E5%B1%B1%E7%94%B0%E3%81%B2%E3%81%95%E3%81%AE%E3%82%8A/dp/B0CL8BJT91/ref=asc_df_B0CL8BJT91?mcid=c22301d6407434a3b3e31223ce0fe806&th=1&psc=1&tag=jpgo-22&linkCode=df0&hvadid=707482416700&hvpos=&hvnetw=g&hvrand=15417640991956887380&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9197747&hvtargid=pla-2246758878899&psc=1&gad_source=1"
                                />

                                <BookCard
                                    title="THE MODEL（MarkeZine BOOKS） マーケティング・インサイドセールス・営業・カスタマーサクセスの共業プロセス"
                                    author="福田康隆"
                                    description="●これまでの営業スタイルは通用しない

                                                「営業が顧客に初めて接触するとき、
                                                　すでに商談プロセスの半分以上は終わっている」

                                                この事実の前に、企業のマーケティング、営業活動は変革を迫られています。
                                                スマートフォンの普及によって、情報発信やビジネスの主導権は、企業から
                                                消費者へシフト。法人営業、BtoBのビジネスにおいても、デジタル化の推進、
                                                新たなプロセス構築が急務となっています。"
                                    category="実務編"
                                    imageUrl="/book3.jpg"
                                    amazonUrl="https://www.amazon.co.jp/MODEL%EF%BC%88MarkeZine-BOOKS%EF%BC%89-%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%83%BB%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%89%E3%82%BB%E3%83%BC%E3%83%AB%E3%82%B9%E3%83%BB%E5%96%B6%E6%A5%AD%E3%83%BB%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%83%BC%E3%82%B5%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%AE%E5%85%B1%E6%A5%AD%E3%83%97%E3%83%AD%E3%82%BB%E3%82%B9-%E7%A6%8F%E7%94%B0-%E5%BA%B7%E9%9A%86-ebook/dp/B07M5W8GCQ/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1U2V0VXZLCJ14&dib=eyJ2IjoiMSJ9.LzelFRAAV1CAP6wNmsD6_tGSZnObv6zlZu7_N7JGLWJrxr6DU1lmIA4MAiBt33CeGZwcj5kuFBERT14-r5EBkh8Pl8jYuD01mMw0TZnciRCIfSyvGDl6RMt_VZBFM0w5Pym9t1055I8wVHVToA-WRl75mpMQwgzgsFyUcNcrFNluxtLMqVNl5hSnTL9U4_U9dG74uqaoypuLa1KFdMj_RU1lBRtaqggi5fegEFFr0zI.N6fyatg4jOoUB12oTX6AbKJ3HgLMpMx00f_uK2-8xL4&dib_tag=se&keywords=The+model&qid=1747900278&s=books&sprefix=the+model%2Cstripbooks%2C146&sr=1-1"
                                />

                                <BookCard
                                    title="サブスクリプション・マーケティング――モノが売れない時代の顧客との関わり方"
                                    author="アン・Ｈ・ジャンザー"
                                    description="所有から利用へ、販売から関係づくりへ
                                                Netflix、セールスフォース、Amazonプライム・・・
                                                共有型経済とスマートデバイスの普及を背景に、あらゆる分野で
                                                サブスクリプション（定額制、継続課金）へのシフトが進んでいる。
                                                「モノが売れない時代」を迎える中、いま何をするべきか？
                                                ビジネスの原則を変える大潮流の本質と実践指針がわかる！

                                                近い将来、私たちは何も「買わなく」なる――？
                                                ソフトウェア、食品、アパレル、
                                                日用品、メディア、ヘルスケア…
                                                あらゆるビジネスを変革する
                                                新時代マーケティングの教科書。"
                                    category="実務編"
                                    imageUrl="/book4.jpg"
                                    amazonUrl="https://www.amazon.co.jp/%E3%82%B5%E3%83%96%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%BB%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E2%80%95%E2%80%95%E3%83%A2%E3%83%8E%E3%81%8C%E5%A3%B2%E3%82%8C%E3%81%AA%E3%81%84%E6%99%82%E4%BB%A3%E3%81%AE%E9%A1%A7%E5%AE%A2%E3%81%A8%E3%81%AE%E9%96%A2%E3%82%8F%E3%82%8A%E6%96%B9-%E3%82%A2%E3%83%B3%E3%83%BB%EF%BC%A8%E3%83%BB%E3%82%B8%E3%83%A3%E3%83%B3%E3%82%B6%E3%83%BC-ebook/dp/B07712VR4C/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PVB6XIN4L8KR&dib=eyJ2IjoiMSJ9.7fnV4YkFgBlE57oMbKf6boGiFw7xs6fXNXEYRepasGX80xiTUHDWhNPYKSH4Dnus8NgPc3uS7gwR2Zjd8NHAo56NVb7_fHcMZ9fYFzTduZk1ssYQTgOdgnnDT9gKzgPqiLSV9ISFjV1i0tNJY8Nl6QcTfCQ8ePs5dYebD0mMkSY.7j-znjuHFE4mZIpCTRDZFTk6h2fvN1WCa0CIgxCZX-U&dib_tag=se&keywords=%E3%82%B5%E3%83%96%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%BB%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E2%80%95%E2%80%95%E3%83%A2%E3%83%8E%E3%81%8C%E5%A3%B2%E3%82%8C%E3%81%AA%E3%81%84%E6%99%82%E4%BB%A3%E3%81%AE%E9%A1%A7%E5%AE%A2%E3%81%A8%E3%81%AE%E9%96%A2%E3%82%8F%E3%82%8A&qid=1747900148&s=books&sprefix=%E3%82%B5%E3%83%96%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3+%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0+%E3%83%A2%E3%83%8E%E3%81%8C%E5%A3%B2%E3%82%8C%E3%81%AA%E3%81%84%E6%99%82%E4%BB%A3%E3%81%AE%E9%A1%A7%E5%AE%A2%E3%81%A8%E3%81%AE%E9%96%A2%E3%82%8F%E3%82%8A%2Cstripbooks%2C154&sr=1-1"
                                />

                                <BookCard
                                    title="売上につながる「顧客ロイヤルティ戦略」入門"
                                    author="遠藤直紀他"
                                    description="■なぜ顧客満足は「お題目」で終わるのか?
                                                顧客満足、クライアントファーストというのは、あらゆる企業にとって金科玉条のようにいわれ、
                                                理念にそれを掲げる企業が多い。しかし、実際の現場では企業論理を顧客に押しつけ、売上のために顧客の感情を犠牲にするようなことが日常茶飯に行われている。
                                                なぜなら、顧客志向が収益につながらないからだ。だから、お題目に終わってしまう。
                                                逆にいえば、顧客志向が収益につながれば、理念が実のあるものになるはずだ。

                                                ■顧客の行動心理をデータ分析し、売上に直結するアクションを導く7つのステップ
                                                本書は、顧客の行動心理をデータ分析し、顧客を満足させることが売上に直結するアクションを導く方法論を徹底解説。
                                                顧客戦略に関心のある経営者、経営企画担当者、事業責任者などに強くおすすめしたい。
                                                「顧客価値の最大化」が「売上の最大化」に自然につながるように経営を変革する時の羅針盤となる一冊。"
                                    category="入門"
                                    imageUrl="/book5.jpg"
                                    amazonUrl="https://www.amazon.co.jp/%E5%A3%B2%E4%B8%8A%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E3%80%8C%E9%A1%A7%E5%AE%A2%E3%83%AD%E3%82%A4%E3%83%A4%E3%83%AB%E3%83%86%E3%82%A3%E6%88%A6%E7%95%A5%E3%80%8D%E5%85%A5%E9%96%80-%E9%81%A0%E8%97%A4-%E7%9B%B4%E7%B4%80/dp/4534053398"
                                />

                                <BookCard
                                    title="LTV（ライフタイムバリュー）の罠 "
                                    author="垣内 勇威"
                                    description="3万7000サイトのデータ分析と、
                                                4000人を超える担当者インタビューから浮かび上がった
                                                顧客が逃げる「4つのボトルネック」＝「MAST」の解消法を公開！

                                                自社の製品やブランドを末永く愛してもらい、顧客と良好かつ継続的な関係を築いて利益を最大限に高めたいが、有効な手立てが見つけられない企業は多い。実際「LTV（ライフタイムバリュー＝顧客生涯価値）」という言葉や概念は浸透しているが、正しくマーケティング戦略に組み入れ、機能させている企業は想像以上に少ない。

                                                LTV向上施策において、企業のマーケターや顧客担当者が陥りやすい最大の罠（わな）が、LTVを「一人の顧客が一生涯に生み出してくれる利益合計額」と捉える「企業視点」に潜んでいる。顧客から見れば、LTVは「一生涯に企業が提供してくれる価値の総量」なのだ。本書はLTVを損ねる「ボトルネック」の正体を明らかにし、その具体的な解消法を示した「LTV向上の実践書」である。
"
                                    category="マネジメント向け"
                                    imageUrl="/book6.jpg"
                                    amazonUrl="https://www.amazon.co.jp/LTV%EF%BC%88%E3%83%A9%E3%82%A4%E3%83%95%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%90%E3%83%AA%E3%83%A5%E3%83%BC%EF%BC%89%E3%81%AE%E7%BD%A0-%E5%9E%A3%E5%86%85-%E5%8B%87%E5%A8%81/dp/4296202669/ref=pd_sbs_d_sccl_3_3/358-4599354-9674709?pd_rd_w=a06j8&content-id=amzn1.sym.13eb81e1-7d13-4eb9-803d-fea9198bc9c1&pf_rd_p=13eb81e1-7d13-4eb9-803d-fea9198bc9c1&pf_rd_r=XTWJ3YS955ERVFGSP1WC&pd_rd_wg=bfico&pd_rd_r=a63ad370-945f-412a-8202-507194b4f7e5&pd_rd_i=4296202669&psc=1"
                                />
                            </div>
                        </div>
                    </section>
                </FadeInSection>

                {/* Book Recommendation */}
                <FadeInSection>
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7FCFA]">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">あなたに合った本を見つけましょう</h2>
                            <p className="text-xl text-gray-700 mb-8">現在の役割や課題に合わせて、最適な一冊をご提案します。</p>
                            <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800 px-6 py-3 rounded-lg">
                                本の診断を始める
                            </Button>
                        </div>
                    </section>
                </FadeInSection>
            </div>
        </div>
    )
}
