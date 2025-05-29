"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { AVAILABLE_TAGS, type Tag } from "@/app/articles/page"

interface TagSelectorProps {
  selectedTags: Tag[]
}

export default function TagSelector({ selectedTags }: TagSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTagToggle = (tag: Tag) => {
    const currentTags = selectedTags
    let newTags: Tag[]

    if (currentTags.includes(tag)) {
      // タグを削除
      newTags = currentTags.filter(t => t !== tag)
    } else {
      // タグを追加
      newTags = [...currentTags, tag]
    }

    // URLパラメータを更新
    const params = new URLSearchParams(searchParams.toString())
    if (newTags.length > 0) {
      params.set("tags", newTags.join(","))
    } else {
      params.delete("tags")
    }

    router.push(`/articles?${params.toString()}`)
  }

  return (
    <div className="flex justify-end mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-700 mb-3">記事のタグを選択</h3>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagToggle(tag)}
              className="text-xs"
            >
              {tag}
              {selectedTags.includes(tag) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Button>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-gray-600">
              選択中: {selectedTags.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 