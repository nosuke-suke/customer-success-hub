"use client"

import { useState, useEffect } from "react"

// モバイルデバイスかどうかを判定するカスタムフック
export const useMobile = () => {
  // モバイル状態を管理
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // ウィンドウサイズの変更を監視する関数
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // 768px未満をモバイルとして扱う
    }

    handleResize() // 初期チェック

    // リサイズイベントのリスナーを設定
    window.addEventListener("resize", handleResize)
    // クリーンアップ関数
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}
