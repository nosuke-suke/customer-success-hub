"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Book, Map, Sword, Scroll, Briefcase } from "lucide-react"
import GameMap from "@/components/success-quest/game-map"
import StatusBar from "@/components/success-quest/status-bar"
import QuestLog from "@/components/success-quest/quest-log"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("map")

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white flex flex-col">
      {/* Header with status */}
      <StatusBar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        {/* Main game area */}
        <div className="flex-1 bg-[#0D0D1C] border-2 border-[#4ECDC4] rounded-lg p-4">
          {activeTab === "map" && <GameMap />}
          {activeTab === "quests" && <QuestLog />}
          {activeTab === "inventory" && (
            <div className="h-full flex items-center justify-center">
              <p className="text-[#FFE66D] text-xl">インベントリ準備中...</p>
            </div>
          )}
          {activeTab === "encyclopedia" && (
            <div className="h-full flex items-center justify-center">
              <p className="text-[#FFE66D] text-xl">CS用語図鑑準備中...</p>
            </div>
          )}
        </div>

        {/* Side menu for mobile */}
        <div className="md:hidden flex justify-between bg-[#0D0D1C] border-2 border-[#4ECDC4] rounded-lg p-2">
          <Button
            variant={activeTab === "map" ? "default" : "ghost"}
            onClick={() => setActiveTab("map")}
            className={activeTab === "map" ? "bg-[#4ECDC4]" : ""}
          >
            <Map size={20} />
          </Button>
          <Button
            variant={activeTab === "quests" ? "default" : "ghost"}
            onClick={() => setActiveTab("quests")}
            className={activeTab === "quests" ? "bg-[#4ECDC4]" : ""}
          >
            <Scroll size={20} />
          </Button>
          <Button
            variant={activeTab === "inventory" ? "default" : "ghost"}
            onClick={() => setActiveTab("inventory")}
            className={activeTab === "inventory" ? "bg-[#4ECDC4]" : ""}
          >
            <Briefcase size={20} />
          </Button>
          <Button
            variant={activeTab === "encyclopedia" ? "default" : "ghost"}
            onClick={() => setActiveTab("encyclopedia")}
            className={activeTab === "encyclopedia" ? "bg-[#4ECDC4]" : ""}
          >
            <Book size={20} />
          </Button>
        </div>

        {/* Side menu for desktop */}
        <div className="hidden md:flex flex-col bg-[#0D0D1C] border-2 border-[#4ECDC4] rounded-lg p-4 w-64 gap-2">
          <Button
            variant={activeTab === "map" ? "default" : "outline"}
            onClick={() => setActiveTab("map")}
            className={`justify-start ${activeTab === "map" ? "bg-[#4ECDC4]" : "border-[#4ECDC4] text-[#4ECDC4]"}`}
          >
            <Map className="mr-2" size={20} /> 世界地図
          </Button>
          <Button
            variant={activeTab === "quests" ? "default" : "outline"}
            onClick={() => setActiveTab("quests")}
            className={`justify-start ${activeTab === "quests" ? "bg-[#4ECDC4]" : "border-[#4ECDC4] text-[#4ECDC4]"}`}
          >
            <Scroll className="mr-2" size={20} /> クエスト
          </Button>
          <Button
            variant={activeTab === "inventory" ? "default" : "outline"}
            onClick={() => setActiveTab("inventory")}
            className={`justify-start ${activeTab === "inventory" ? "bg-[#4ECDC4]" : "border-[#4ECDC4] text-[#4ECDC4]"}`}
          >
            <Briefcase className="mr-2" size={20} /> インベントリ
          </Button>
          <Button
            variant={activeTab === "encyclopedia" ? "default" : "outline"}
            onClick={() => setActiveTab("encyclopedia")}
            className={`justify-start ${activeTab === "encyclopedia" ? "bg-[#4ECDC4]" : "border-[#4ECDC4] text-[#4ECDC4]"}`}
          >
            <Book className="mr-2" size={20} /> CS用語図鑑
          </Button>

          <div className="mt-auto">
            <Link href="/success-quest/battle">
              <Button className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-white">
                <Sword className="mr-2" size={20} /> バトルに挑む
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
