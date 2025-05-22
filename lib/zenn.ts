import { XMLParser } from 'fast-xml-parser';

export async function fetchZennArticles(keyword: string) {
  try {
    // Zennのトップフィードを取得
    const response = await fetch('https://zenn.dev/feed');
    if (!response.ok) {
      throw new Error('Failed to fetch Zenn RSS feed');
    }

    const xmlData = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    });
    const feed = parser.parse(xmlData);
    const articles = feed.rss.channel.item;

    // キーワードでフィルタリング
    const filteredArticles = articles.filter((article: any) => {
      const content = `${article.title} ${article.description}`.toLowerCase();
      return content.includes(keyword.toLowerCase());
    });

    // 記事データを統一フォーマットに変換
    return filteredArticles.slice(0, 10).map((article: any) => {
      // URLからユーザー名を抽出
      const urlParts = article.link.split('/');
      const username = urlParts[3];

      return {
        id: article.guid,
        title: article.title,
        url: article.link,
        created_at: article.pubDate,
        likes_count: 0, // RSSフィードではいいね数が取得できないため0を設定
        user: {
          name: username,
          profile_image_url: `https://zenn.dev/${username}/avatar`, // Zennのデフォルトアバター
        },
        tags: [{ name: 'Zenn' }], // RSSフィードではタグ情報が取得できないため
      };
    });

  } catch (error) {
    console.error('Error fetching Zenn articles:', error);
    return [];
  }
} 