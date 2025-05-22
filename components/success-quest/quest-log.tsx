"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, ArrowRight, Trophy } from "lucide-react"

// Sample quest data
const quests = [
  {
    id: 1,
    title: "CS用語マスター：初級",
    description: "NPS、CSAT、CESの違いを学び、それぞれの特徴を理解しよう",
    reward: "経験値 +20、金貨 +50",
    type: "daily",
    status: "active",
    progress: 0,
    totalSteps: 3,
  },
  {
    id: 2,
    title: "ARR成長のヒミツ",
    description: "ARR上位5社を調査し、成長要因を分析せよ",
    reward: "経験値 +30、金貨 +100、「分析の書」獲得",
    type: "weekly",
    status: "active",
    progress: 1,
    totalSteps: 5,
  },
  {
    id: 3,
    title: "チャーンスライム討伐",
    description: "クラウドタワーに出現したチャーンスライムを倒せ",
    reward: "経験値 +50、金貨 +200、「チャーン対策の盾」獲得",
    type: "main",
    status: "active",
    progress: 0,
    totalSteps: 1,
  },
  {
    id: 4,
    title: "オンボーディングの達人",
    description: "スタートアップ洞窟のオンボーディング課題を解決せよ",
    reward: "経験値 +40、金貨 +150、「ユーザー満足の杖」獲得",
    type: "main",
    status: "locked",
    progress: 0,
    totalSteps: 4,
  },
  {
    id: 5,
    title: "LTVの秘密",
    description: "LTVを高めるための施策を3つ考案せよ",
    reward: "経験値 +25、金貨 +80",
    type: "daily",
    status: "completed",
    progress: 3,
    totalSteps: 3,
  },
]

export default function QuestLog() {
  const [activeTab, setActiveTab] = useState<"all" | "daily" | "weekly" | "main">("all")

  const filteredQuests = activeTab === "all" ? quests : quests.filter((quest) => quest.type === activeTab)

  const getStatusIcon = (status: string, progress: number, total: number) => {
    if (status === "completed") return <CheckCircle2 className="text-[#4ECDC4]" size={16} />
    if (status === "locked") return <Clock className="text-gray-400" size={16} />
    return progress > 0 ? (
      <div className="text-xs text-[#FFE66D]">
        {progress}/{total}
      </div>
    ) : (
      <Circle className="text-[#FFE66D]" size={16} />
    )
  }

  const getQuestTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "bg-[#4ECDC4]/20 text-[#4ECDC4]"
      case "weekly":
        return "bg-[#FFD700]/20 text-[#FFD700]"
      case "main":
        return "bg-[#FF6B6B]/20 text-[#FF6B6B]"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-[#4ECDC4]/30 mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "all" ? "text-[#FFD700] border-b-2 border-[#FFD700]" : "text-gray-400"}`}
          onClick={() => setActiveTab("all")}
        >
          すべて
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "daily" ? "text-[#4ECDC4] border-b-2 border-[#4ECDC4]" : "text-gray-400"}`}
          onClick={() => setActiveTab("daily")}
        >
          デイリー
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "weekly" ? "text-[#FFD700] border-b-2 border-[#FFD700]" : "text-gray-400"}`}
          onClick={() => setActiveTab("weekly")}
        >
          ウィークリー
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "main" ? "text-[#FF6B6B] border-b-2 border-[#FF6B6B]" : "text-gray-400"}`}
          onClick={() => setActiveTab("main")}
        >
          メイン
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {filteredQuests.map((quest) => (
            <div
              key={quest.id}
              className={`border rounded-lg p-4 ${
                quest.status === "locked"
                  ? "border-gray-600 bg-[#1A1A2E]/50 opacity-60"
                  : quest.status === "completed"
                    ? "border-[#4ECDC4] bg-[#4ECDC4]/10"
                    : "border-[#4ECDC4] bg-[#1A1A2E]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {getStatusIcon(quest.status, quest.progress, quest.totalSteps)}
                    <h3 className="font-bold ml-2 text-white">{quest.title}</h3>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${getQuestTypeColor(quest.type)}`}>
                      {quest.type === "daily" ? "デイリー" : quest.type === "weekly" ? "ウィークリー" : "メイン"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{quest.description}</p>
                  <div className="flex items-center text-xs text-[#FFD700]">
                    <Trophy size={12} className="mr-1" />
                    <span>{quest.reward}</span>
                  </div>
                </div>

                {quest.status !== "locked" && (
                  <Link href={`/quest/${quest.id}`}>
                    <Button
                      size="sm"
                      className={quest.status === "completed" ? "bg-[#4ECDC4]" : "bg-[#FFD700] text-[#0D0D1C]"}
                    >
                      {quest.status === "completed" ? "完了" : "挑戦"} <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
