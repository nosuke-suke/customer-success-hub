"use client"
import Image from "next/image"
import { ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  title: string
  author: string
  date: string
  description: string
  tags: string[]
  imageUrl: string
  articleUrl: string
}

export default function ArticleCard({
  title,
  author,
  date,
  description,
  tags,
  imageUrl,
  articleUrl,
}: ArticleCardProps) {
  return (
    <Card className="bg-white shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover rounded-t-lg" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{title}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Calendar size={14} />
          {date} | {author}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 line-clamp-3 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-[#DFF5E1] text-gray-800 border-none">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800">
          <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            記事を読む <ExternalLink size={16} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
