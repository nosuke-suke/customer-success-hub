// アプリケーションのメインレイアウトを定義
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlobCursor from "@/components/BlobCursor/BlobCursor"

// Interフォントの設定（Latin文字セットのみ）
const inter = Inter({ subsets: ["latin"] })

// メタデータの設定
export const metadata: Metadata = {
  title: "サクセスの森",
  description: "「サクセスの森」は、カスタマーサクセス(CS)をやさしく深く学べる情報サイトです。はじめてCSにふれる方から、実務で悩む現場の方まで、すべてのサクセスの旅人を応援します。基礎から実践ノウハウまで、わかりやすく、今すぐ使えるヒントをぎゅっと詰め込みました。あなたのCSの冒険が、ここから始まります。",
}

// ルートレイアウトコンポーネント
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 言語設定とhydrationの警告を抑制
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        {/* テーマプロバイダーでアプリケーション全体をラップ */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BlobCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
