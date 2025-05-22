"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sword, Shield, Sparkles, ArrowLeft } from "lucide-react"

export default function BattlePage() {
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)
  const [battleLog, setBattleLog] = useState<string[]>(["チャーンスライムが現れた！"])
  const [battleState, setBattleState] = useState<"active" | "won" | "lost">("active")

  const addLogMessage = (message: string) => {
    setBattleLog((prev) => [...prev, message])
  }

  const attack = () => {
    // Player attacks
    const damage = Math.floor(Math.random() * 20) + 10
    setEnemyHealth((prev) => Math.max(0, prev - damage))
    addLogMessage(`勇者の攻撃！チャーンスライムに${damage}のダメージ！`)

    // Check if enemy is defeated
    if (enemyHealth - damage <= 0) {
      setBattleState("won")
      addLogMessage("チャーンスライムを倒した！")
      return
    }

    // Enemy attacks after a delay
    setTimeout(() => {
      const enemyDamage = Math.floor(Math.random() * 15) + 5
      setPlayerHealth((prev) => Math.max(0, prev - enemyDamage))
      addLogMessage(`チャーンスライムの攻撃！勇者に${enemyDamage}のダメージ！`)

      // Check if player is defeated
      if (playerHealth - enemyDamage <= 0) {
        setBattleState("lost")
        addLogMessage("勇者は倒れてしまった...")
      }
    }, 1000)
  }

  const defend = () => {
    addLogMessage("勇者は防御の構えをとった！")

    // Enemy attacks with reduced damage
    setTimeout(() => {
      const enemyDamage = Math.floor(Math.random() * 8) + 2
      setPlayerHealth((prev) => Math.max(0, prev - enemyDamage))
      addLogMessage(`チャーンスライムの攻撃！防御により勇者は${enemyDamage}のダメージで済んだ！`)
    }, 1000)
  }

  const useSpecial = () => {
    // Special attack with higher damage
    const damage = Math.floor(Math.random() * 30) + 20
    setEnemyHealth((prev) => Math.max(0, prev - damage))
    addLogMessage(`勇者の必殺技！チャーンスライムに${damage}の大ダメージ！`)

    // Check if enemy is defeated
    if (enemyHealth - damage <= 0) {
      setBattleState("won")
      addLogMessage("チャーンスライムを倒した！")
      return
    }

    // Enemy attacks after a delay
    setTimeout(() => {
      const enemyDamage = Math.floor(Math.random() * 15) + 5
      setPlayerHealth((prev) => Math.max(0, prev - enemyDamage))
      addLogMessage(`チャーンスライムの攻撃！勇者に${enemyDamage}のダメージ！`)

      // Check if player is defeated
      if (playerHealth - enemyDamage <= 0) {
        setBattleState("lost")
        addLogMessage("勇者は倒れてしまった...")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white flex flex-col">
      <div className="p-4">
        <Link href="/success-quest/dashboard">
          <Button variant="ghost" className="text-[#4ECDC4]">
            <ArrowLeft className="mr-2" size={16} /> マップに戻る
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <div className="bg-[#0D0D1C] border-2 border-[#4ECDC4] rounded-lg p-4 flex-1 flex flex-col">
          <h1 className="text-2xl font-bold text-center mb-4 text-[#FFD700]">バトル：チャーンスライム</h1>

          {/* Battle arena */}
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            {/* Battle visuals */}
            <div className="flex-1 flex flex-col">
              {/* Enemy */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-[#FF6B6B]">チャーンスライム Lv.5</h2>
                  <div className="text-sm">HP: {enemyHealth}/100</div>
                </div>
                <Progress value={enemyHealth} className="h-4 [&>div]:bg-[#FF6B6B] bg-[#1A1A2E]" />
                <div className="mt-4 flex justify-center">
                  <div className="relative w-32 h-32 bg-[#1A1A2E] rounded-full flex items-center justify-center border-2 border-[#FF6B6B]">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Enemy"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Player */}
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-[#4ECDC4]">勇者 Lv.1</h2>
                  <div className="text-sm">HP: {playerHealth}/100</div>
                </div>
                <Progress value={playerHealth} className="h-4 [&>div]:bg-[#4ECDC4] bg-[#1A1A2E]" />
                <div className="mt-4 flex justify-center">
                  <div className="relative w-32 h-32 bg-[#1A1A2E] rounded-full flex items-center justify-center border-2 border-[#4ECDC4]">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Player"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Battle log */}
            <div className="w-full md:w-64 bg-[#1A1A2E] border border-[#4ECDC4] rounded p-2 h-64 md:h-auto overflow-y-auto">
              <h3 className="font-bold mb-2 text-[#FFE66D]">バトルログ</h3>
              <div className="space-y-2">
                {battleLog.map((log, index) => (
                  <p key={index} className="text-sm">
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Battle actions */}
          <div className="mt-4">
            {battleState === "active" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Button onClick={attack} className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-white">
                  <Sword className="mr-2" size={16} /> 攻撃
                </Button>
                <Button onClick={defend} className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-white">
                  <Shield className="mr-2" size={16} /> 防御
                </Button>
                <Button
                  onClick={useSpecial}
                  className="bg-[#FFD700] hover:bg-[#FFD700]/80 text-[#0D0D1C] col-span-2 md:col-span-1"
                >
                  <Sparkles className="mr-2" size={16} /> 必殺技
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-[#FFE66D]">
                  {battleState === "won" ? "バトル勝利！" : "バトル敗北..."}
                </h2>
                <Link href="/success-quest/dashboard">
                  <Button className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-white">マップに戻る</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
