import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Pixel art background elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-20 w-16 h-16 bg-[#FFD700] rounded-sm animate-pulse"></div>
          <div className="absolute top-40 right-40 w-8 h-8 bg-[#FF6B6B] rounded-sm animate-bounce"></div>
          <div className="absolute bottom-40 left-1/3 w-12 h-12 bg-[#4ECDC4] rounded-sm animate-ping"></div>
          <div className="absolute bottom-60 right-1/4 w-10 h-10 bg-[#FFE66D] rounded-sm animate-pulse"></div>
        </div>

        {/* Main content */}
        <div className="z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 pixel-font text-[#FFD700] animate-pulse">
            新米CS勇者の冒険
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#4ECDC4]">
            CSの知識とデータを武器に、SaaS世界のダンジョンを攻略しよう！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/success-quest/character-select">
              <Button className="bg-[#FFD700] hover:bg-[#FFE66D] text-[#0D0D1C] font-bold text-lg px-8 py-6 rounded-md transition-all transform hover:scale-105">
                冒険を始める <ChevronRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/20 font-bold text-lg px-8 py-6 rounded-md"
              >
                冒険について
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative pixel art footer */}
        <div className="absolute bottom-0 w-full h-16 bg-[#0D0D1C] flex items-center justify-center">
          <div className="flex space-x-4">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-[#4ECDC4] rounded-sm"
                style={{
                  opacity: Math.random() * 0.5 + 0.5,
                  animation: `pulse ${Math.random() * 2 + 1}s infinite alternate`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
