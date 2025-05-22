export interface QiitaArticle {
  id: string
  title: string
  url: string
  likes_count: number
  created_at: string
  updated_at: string
  user: {
    id: string
    name: string
    profile_image_url: string
  }
  tags: {
    name: string
    versions: string[]
  }[]
}

export async function fetchQiitaArticles(tag: string): Promise<QiitaArticle[]> {
  const response = await fetch(
    `https://qiita.com/api/v2/items?query=tag:${encodeURIComponent(tag)}&per_page=20&sort=created`,
    {
      headers: {
        "Authorization": `Bearer ${process.env.QIITA_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 } // 1時間ごとにキャッシュを更新
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch Qiita articles")
  }

  return response.json()
} 