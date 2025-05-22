"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NewsItem {
  id: number
  title: string
  source: string
  date: string
  summary: string
  imageUrl: string
  url: string
}

interface NewsSliderProps {
  newsItems: NewsItem[]
}

export default function NewsSlider({ newsItems }: NewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  if (!newsItems.length) return null

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out h-96"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {newsItems.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0 relative">
            <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="mb-4 line-clamp-2">{item.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">
                  {item.date} | {item.source}
                </span>
                <Button className="bg-[#BDEBD2] hover:bg-[#A5D6BA] text-gray-800">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    詳細を見る <ExternalLink size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {newsItems.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-white w-4" : "bg-white/50",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
