"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// ナビゲーションアイテムの型定義
interface NavItem {
  name: string
  href: string
}

// ナビゲーションメニューの項目
const navItems: NavItem[] = [
  { name: "ホーム", href: "/" },
  { name: "CSってなに？", href: "/guide" },
  { name: "おすすめ本", href: "/books" },
  { name: "おすすめ記事", href: "/articles" },
  { name: "最新ニュース", href: "/news" },
  { name: "SaaS成長トレンド", href: "/trends" },
  { name: "サクセスクエスト", href: "/success-quest" },
]

export default function Navbar() {
  // モバイルメニューの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false)
  // 現在のパス名を取得
  const pathname = usePathname()
  // スクロール状態を管理
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()

  // スクロールイベントのハンドラーを設定
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* ロゴ部分 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">サクセスの森</span>
            </Link>
          </div>

          {/* デスクトップ用ナビゲーション */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-gray-900 bg-[#BDEBD2]"
                    : "text-gray-700 hover:bg-[#DFF5E1] hover:text-gray-900",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* モバイル用メニューボタン */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* モバイル用ナビゲーションメニュー */}
      {isOpen && isMobile && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "text-gray-900 bg-[#BDEBD2]"
                    : "text-gray-700 hover:bg-[#DFF5E1] hover:text-gray-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
