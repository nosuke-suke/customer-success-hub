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
  const token = process.env.QIITA_ACCESS_TOKEN;
  
  if (!token) {
    console.error('環境変数QIITA_ACCESS_TOKENが設定されていません');
    return [];
  }

  try {
    const response = await fetch(
      `https://qiita.com/api/v2/items?query=tag:${encodeURIComponent(tag)}&per_page=20&sort=created`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        next: { revalidate: 3600 } // 1時間ごとにキャッシュを更新
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Qiita API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return [];
    }

    return response.json();
  } catch (error) {
    console.error("Qiita記事の取得に失敗しました:", error);
    return [];
  }
} 