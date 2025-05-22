"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample SaaS company data
const saasCompanies = [
  {
    id: 1,
    name: "クラウドタワー",
    type: "tower",
    size: "large",
    arr: 10000000,
    position: { x: 20, y: 30 },
    description: "ARR1000万ドルの大手SaaS企業。高いチャーン率が課題。",
  },
  {
    id: 2,
    name: "データビレッジ",
    type: "village",
    size: "medium",
    arr: 5000000,
    position: { x: 60, y: 50 },
    description: "データ分析に特化したSaaS。成長率は高いが顧客獲得コストも高い。",
  },
  {
    id: 3,
    name: "スタートアップ洞窟",
    type: "cave",
    size: "small",
    arr: 1000000,
    position: { x: 80, y: 70 },
    description: "急成長中のスタートアップ。製品は優れているがオンボーディングに課題。",
  },
  {
    id: 4,
    name: "セキュリティ城",
    type: "castle",
    size: "large",
    arr: 8000000,
    position: { x: 40, y: 20 },
    description: "セキュリティに特化したSaaS。安定した成長だが新規顧客獲得に苦戦。",
  },
  {
    id: 5,
    name: "マーケティング村",
    type: "village",
    size: "small",
    arr: 3000000,
    position: { x: 70, y: 40 },
    description: "マーケティングツールを提供するSaaS。顧客満足度は高いが規模拡大に課題。",
  },
]

export default function GameMap() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 })

  const getLocationIcon = (type: string, size: string) => {
    switch (type) {
      case "tower":
        return "🏢"
      case "village":
        return "🏘️"
      case "cave":
        return "🏔️"
      case "castle":
        return "🏰"
      default:
        return "🏢"
    }
  }

  const getLocationSize = (size: string) => {
    switch (size) {
      case "large":
        return "text-4xl"
      case "medium":
        return "text-3xl"
      case "small":
        return "text-2xl"
      default:
        return "text-3xl"
    }
  }

  const moveToLocation = (x: number, y: number) => {
    setPlayerPosition({ x, y })
  }

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#1A1A2E] rounded-lg overflow-hidden border border-[#4ECDC4]">
      {/* Map grid background */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="border border-[#4ECDC4]/10"></div>
        ))}
      </div>

      {/* SaaS locations */}
      {saasCompanies.map((company) => (
        <TooltipProvider key={company.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                  selectedLocation === company.id ? "scale-125" : ""
                } ${getLocationSize(company.size)}`}
                style={{
                  left: `${company.position.x}%`,
                  top: `${company.position.y}%`,
                }}
                onClick={() => {
                  setSelectedLocation(company.id)
                  moveToLocation(company.position.x, company.position.y)
                }}
              >
                {getLocationIcon(company.type, company.size)}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{company.name}</p>
              <p className="text-xs">ARR: ${(company.arr / 1000000).toFixed(1)}M</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      {/* Player character */}
      <div
        className="absolute w-8 h-8 bg-[#FFD700] rounded-full border-2 border-white z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 animate-pulse"
        style={{
          left: `${playerPosition.x}%`,
          top: `${playerPosition.y}%`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-[#0D0D1C] font-bold">勇</div>
      </div>

      {/* Location info panel */}
      {selectedLocation && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#0D0D1C] border-t-2 border-[#4ECDC4] p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-[#FFD700]">
                {saasCompanies.find((c) => c.id === selectedLocation)?.name}
              </h3>
              <p className="text-sm text-[#4ECDC4] mb-2">
                ARR: ${(saasCompanies.find((c) => c.id === selectedLocation)?.arr || 0 / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm">{saasCompanies.find((c) => c.id === selectedLocation)?.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/location/${selectedLocation}`}>
                <Button size="sm" className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/80">
                  <Info className="mr-1" size={16} /> 詳細
                </Button>
              </Link>
              <Link href={`/battle?location=${selectedLocation}`}>
                <Button size="sm" className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/80">
                  <AlertCircle className="mr-1" size={16} /> 課題に挑む
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute top-2 right-2 bg-[#0D0D1C]/80 p-2 rounded border border-[#4ECDC4] text-xs">
        <div className="flex items-center mb-1">
          <span className="mr-2">🏢</span>
          <span>タワー</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="mr-2">🏘️</span>
          <span>村</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="mr-2">🏔️</span>
          <span>洞窟</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🏰</span>
          <span>城</span>
        </div>
      </div>
    </div>
  )
}
