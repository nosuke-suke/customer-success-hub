import Image from "next/image"
import { ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsCardProps {
  id: number
  title: string
  source: string
  date: string
  summary: string
  imageUrl: string
  url: string
}

export default function NewsCard({ title, source, date, summary, imageUrl, url }: NewsCardProps) {
  return (
    <Card className="bg-white shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover rounded-t-lg" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar size={14} />
          {date} | {source}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 line-clamp-3">{summary}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800">
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            記事を読む <ExternalLink size={16} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
