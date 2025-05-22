"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// フリップカードのプロパティ型定義
interface FlipCardProps {
  term: string      // 用語
  definition: string // 定義
}

export default function FlipCard({ term, definition }: FlipCardProps) {
  // カードの裏表の状態を管理
  const [isFlipped, setIsFlipped] = useState(false)

  // カードをクリックした時の処理
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    // カード全体のコンテナ（3D効果用のパースペクティブを適用）
    <div className="h-48 perspective-1000 cursor-pointer" onClick={handleFlip}>
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
          isFlipped ? "rotate-y-180" : "",
        )}
      >
        {/* カードの表面 */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden bg-[#BDEBD2] rounded-lg shadow-md flex items-center justify-center p-6",
            isFlipped ? "invisible" : "visible",
          )}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center">{term}</h3>
        </div>

        {/* カードの裏面 */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md p-6 flex items-center justify-center rotate-y-180",
            isFlipped ? "visible" : "invisible",
          )}
        >
          <p className="text-gray-700 text-center">{definition}</p>
        </div>
      </div>
    </div>
  )
}
