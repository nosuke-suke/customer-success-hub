"use client"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface BookCardProps {
    title: string
    author: string
    description: string
    category: string
    imageUrl: string
    amazonUrl: string
}


export default function BookCard({ title, author, description, category, imageUrl, amazonUrl }: BookCardProps) {
    const truncatedDescription =
        description.length > 60 ? description.slice(0, 80) + "..." : description;
    const DialogDesc =
        description.length > 250 ? description.slice(0, 250) + "..." : description;

    return (
        <Card className="bg-white shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="line-clamp-2">{title}</CardTitle>
                        <CardDescription>{author}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-[#DFF5E1] text-gray-800 border-none">
                        {category}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={title}
                            width={100}
                            height={150}
                            className="rounded shadow"
                        />
                    </div>
                    <p className="text-gray-700 line-clamp-4">{truncatedDescription}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">詳細を見る</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{author}</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col sm:flex-row gap-6 py-4">
                            <div className="flex-shrink-0 mx-auto sm:mx-0">
                                <Image
                                    src={imageUrl || "/placeholder.svg"}
                                    alt={title}
                                    width={150}
                                    height={225}
                                    className="rounded shadow"
                                />
                            </div>
                            <div>
                                <Badge className="mb-4 bg-[#DFF5E1] text-gray-800 hover:bg-[#BDEBD2]">{category}</Badge>
                                <p className="text-gray-700 mb-4">{DialogDesc}</p>
                                <p className="text-gray-700 mb-4">
                                    この本はカスタマーサクセスの
                                    {category === "入門編"
                                        ? "基礎知識を身につけたい方"
                                        : category === "実務編"
                                            ? "実践的なスキルを磨きたい方"
                                            : "マネジメントスキルを向上させたい方"}
                                    におすすめです。
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800">
                                <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    Amazonで見る <ExternalLink size={16} />
                                </a>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800">
                    <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        購入する <ExternalLink size={16} />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}