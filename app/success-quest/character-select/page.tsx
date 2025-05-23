"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function CharacterSelect() {
  const [selectedCharacter, setSelectedCharacter] = useState(0)
  const [heroName, setHeroName] = useState("")

  const characters = [
    { id: 0, name: "男性勇者", image: "/MaleHero.png", description: "バランスの取れた能力を持つ男性勇者。顧客との信頼関係を築くのが得意。" },
    { id: 1, name: "女性勇者", image: "/FemaleHero.png", description: "高いコミュニケーション能力を持つ女性勇者。問題解決力に優れている。" },
  ]

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-[#0D0D1C] border-2 border-[#4ECDC4] rounded-lg p-6 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">勇者を選択</h1>

          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-xs h-80 mb-4 bg-[#1A1A2E] border-2 border-[#4ECDC4] rounded-md flex items-center justify-center overflow-hidden">
              <Image
                src={characters[selectedCharacter].image}
                alt={characters[selectedCharacter].name}
                width={300}
                height={400}
                className="object-contain transform scale-110 hover:scale-125 transition-transform duration-300"
              />

              {/* Character selection arrows */}
              <button
                onClick={() => setSelectedCharacter((prev) => (prev === 0 ? characters.length - 1 : prev - 1))}
                className="absolute left-2 bg-[#0D0D1C]/80 rounded-full p-1 hover:bg-[#4ECDC4]/30"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setSelectedCharacter((prev) => (prev === characters.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 bg-[#0D0D1C]/80 rounded-full p-1 hover:bg-[#4ECDC4]/30"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-[#4ECDC4] mb-2">{characters[selectedCharacter].name}</h2>
            <p className="text-sm text-[#FFE66D] text-center max-w-xs mb-4">{characters[selectedCharacter].description}</p>
          </div>

          <div className="mb-8">
            <label className="block text-[#FFE66D] mb-2 font-bold">勇者の名前</label>
            <Input
              type="text"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder="名前を入力してください"
              className="bg-[#0D0D1C] border-[#4ECDC4] text-white"
              maxLength={20}
            />
          </div>

          <div className="flex justify-between">
            <Link href="/success-quest">
              <Button variant="outline" className="border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10">
                戻る
              </Button>
            </Link>
            <Link 
              href={{
                pathname: "/success-quest/dashboard",
                query: { 
                  character: characters[selectedCharacter].name,
                  name: heroName
                }
              }}
            >
              <Button 
                className="bg-[#FFD700] hover:bg-[#FFE66D] text-[#0D0D1C]" 
                disabled={!heroName.trim()}
              >
                冒険に出発
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
