import { Button } from "@/components/ui/button"
import FadeInSection from "@/components/fade-in-section"
import BookCard from "@/components/book-card"
import PageHeader from "@/components/page-header"
import { getAllBooks } from "@/lib/books"

export const revalidate = 3600 // 1時間ごとに再検証

export default async function BooksPage() {
    const books = await getAllBooks();

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
                                {books.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        id={book.id}
                                        title={book.title}
                                        author={book.author}
                                        description={book.description}
                                        category={book.category}
                                        imageUrl={book.image_url}
                                        amazonUrl={book.amazon_url}
                                    />
                                ))}
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
