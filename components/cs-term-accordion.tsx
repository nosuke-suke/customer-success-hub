"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  toggleOpen: () => void
}

function AccordionItem({ question, answer, isOpen, toggleOpen }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </span>
      </button>
      <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-96" : "max-h-0")}>
        <div className="py-4 px-6 text-gray-700">{answer}</div>
      </div>
    </div>
  )
}

export default function CSTermAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const items = [
    {
      question: "カスタマーサクセスとカスタマーサポートの違いは？",
      answer:
        "カスタマーサポートは顧客からの問い合わせに対応する受動的なサービスであるのに対し、カスタマーサクセスは顧客が製品から最大の価値を得られるよう積極的にサポートする能動的なアプローチです。サポートが問題解決を中心とするのに対し、サクセスは顧客の成功と長期的な関係構築を目指します。",
    },
    {
      question: "ARRって何ですか？",
      answer:
        "ARR（Annual Recurring Revenue）は年間経常収益を指し、SaaS企業の健全性を測る重要な指標です。月額料金に12を掛けたもの、または年間契約の合計額として計算されます。ARRの成長率は企業の拡大速度を示す重要な指標となります。",
    },
    {
      question: "LTVとは何ですか？どうやって計算するの？",
      answer:
        "LTV（Life Time Value）は顧客生涯価値を指し、顧客が契約期間中にもたらす総収益を表します。基本的な計算式は「平均月間収益 × 顧客の平均契約期間（月）」です。より精緻な計算では「平均月間収益 × 粗利益率 ÷ 月間解約率」という式も使われます。LTVが高いほど、顧客獲得コスト（CAC）に対する投資効率が良いとされます。",
    },
    {
      question: "オンボーディングで重要なポイントは？",
      answer:
        "オンボーディングでは、1）明確な目標設定、2）段階的な導入プロセス、3）パーソナライズされたサポート、4）定期的なフォローアップ、5）成功事例の共有が重要です。特に「初期成功体験（Early Win）」を提供することで、顧客の製品に対する信頼と満足度を早期に高めることができます。",
    },
    {
      question: "ヘルススコアはどうやって設計すればいい？",
      answer:
        "ヘルススコアは、製品利用状況、契約更新リスク、成長機会を可視化する指標です。設計には、1）重要な利用指標（ログイン頻度、機能利用率など）、2）ビジネス指標（契約規模、成長率など）、3）エンゲージメント指標（サポート対応、フィードバック参加など）を組み合わせます。各指標に重み付けを行い、総合スコアを100点満点などで表現するのが一般的です。定期的に見直しを行い、精度を高めていくことが重要です。",
    },
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          toggleOpen={() => toggleAccordion(index)}
        />
      ))}
    </div>
  )
}
