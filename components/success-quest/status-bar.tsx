"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { User, Settings, LogOut, Heart, Star, Zap } from "lucide-react"

export default function StatusBar() {
  const [level, setLevel] = useState(1)
  const [exp, setExp] = useState(30)
  const [hp, setHp] = useState(80)
  const [mp, setMp] = useState(50)
  const [gold, setGold] = useState(100)

  return (
    <div className="bg-[#0D0D1C] border-b-2 border-[#4ECDC4] p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Character info */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#4ECDC4] rounded-full flex items-center justify-center text-[#0D0D1C] font-bold text-xl mr-3">
            勇
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="font-bold text-[#FFD700]">新米CS勇者</h2>
              <div className="ml-2 px-2 py-0.5 bg-[#4ECDC4]/20 rounded text-xs text-[#4ECDC4] flex items-center">
                <Star className="mr-1" size={12} /> Lv.{level}
              </div>
            </div>
            <div className="flex items-center mt-1">
              <div className="text-xs text-[#FFE66D] mr-2 flex items-center">
                <Zap size={12} className="mr-1" /> EXP
              </div>
              <Progress value={exp} className="h-2 w-24 [&>div]:bg-[#FFE66D] bg-[#1A1A2E]" />
              <div className="text-xs ml-2">{exp}/100</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center text-xs text-[#FF6B6B] mb-1">
              <Heart size={12} className="mr-1" /> HP
            </div>
            <Progress value={hp} className="h-2 w-24 [&>div]:bg-[#FF6B6B] bg-[#1A1A2E]" />
          </div>
          <div>
            <div className="flex items-center text-xs text-[#4ECDC4] mb-1">
              <Zap size={12} className="mr-1" /> MP
            </div>
            <Progress value={mp} className="h-2 w-24 [&>div]:bg-[#4ECDC4] bg-[#1A1A2E]" />
          </div>
          <div className="flex items-center">
            <div className="text-[#FFD700] font-bold flex items-center">
              <span className="mr-1">💰</span> {gold}
            </div>
          </div>
        </div>

        {/* Menu buttons */}
        <div className="flex gap-2">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-[#4ECDC4]">
              <User size={20} />
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-[#4ECDC4]">
              <Settings size={20} />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-[#FF6B6B]">
              <LogOut size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
