import { NextResponse } from 'next/server';

const NEWS_DOMAINS = [
  "nikkei.com",
  "reuters.com",
  "bloomberg.co.jp",
  "forbes.jp",
  "businessinsider.jp",
  "zdnet.com",
  "itmedia.co.jp",
  "techcrunch.com",
  "cnet.com",
  "ascii.jp"
];

// 利用可能な画像のリスト
const AVAILABLE_IMAGES = [
  '/A_01_office_presentation1.png',
  '/A_01office_seane004.png',
  '/A_01office_seane003.png',
  '/E_04_childcare007_3d_front.png',
  '/A_01_office_Discussion3.png'
];

// ドメインと情報源の対応マップ
const DOMAIN_SOURCE_MAP: { [key: string]: string } = {
  'nikkei.com': '日本経済新聞',
  'reuters.com': 'ロイター',
  'bloomberg.co.jp': 'Bloomberg',
  'forbes.jp': 'Forbes JAPAN',
  'businessinsider.jp': 'Business Insider Japan',
  'zdnet.com': 'ZDNet Japan',
  'itmedia.co.jp': 'ITmedia',
  'techcrunch.com': 'TechCrunch',
  'cnet.com': 'CNET Japan',
  'ascii.jp': 'ASCII.jp'
};

// 文字化け修正関数
function fixCharacterEncoding(text: string, domain: string): string {
  try {
    if (!text) return '';

    let processedText = text;

    // ITmedia特有の文字化け対策
    if (domain.includes('itmedia.co.jp')) {
      processedText = text
        .replace(/[\u0080-\u00ff]/g, '') // 不正なLatin-1文字を削除
        .replace(/[\ufffd]/g, '') // 置換文字を削除
        .replace(/[^\x20-\x7E\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g, ''); // 許可された文字以外を削除
    }

    // 一般的な文字化け対策
    return processedText
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .replace(/[\uFFF0-\uFFFF]/g, '')
      .replace(/　/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } catch (e) {
    console.error('Text encoding fix failed:', e);
    return text || '';
  }
}

// URLからドメインを抽出し、情報源を特定する関数
function extractSource(url: string): string {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    
    // 完全一致で検索
    if (DOMAIN_SOURCE_MAP[domain]) {
      return DOMAIN_SOURCE_MAP[domain];
    }

    // 部分一致で検索
    for (const [key, value] of Object.entries(DOMAIN_SOURCE_MAP)) {
      if (domain.includes(key)) {
        return value;
      }
    }

    return domain;
  } catch (e) {
    return '情報源不明';
  }
}

// ランダムな画像URLを取得する関数
function getRandomImageUrl(): string {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_IMAGES.length);
  return AVAILABLE_IMAGES[randomIndex];
}

export async function GET() {
  const apiKey = process.env.TAVILY_API_KEY;
  
  if (!apiKey) {
    console.error('環境変数TAVILY_API_KEYが設定されていません');
    return NextResponse.json(
      { 
        error: 'API key is not configured',
        message: '環境変数TAVILY_API_KEYが設定されていません。開発者に連絡してください。',
        details: 'APIキーが環境変数に設定されていません。.env.localファイルまたはVercelの環境変数で設定してください。'
      },
      { status: 500 }
    );
  }

  try {
    // APIキーの形式を簡易チェック
    if (!apiKey.match(/^tvly-/)) {
      console.error('無効なTavily APIキーの形式です');
      return NextResponse.json(
        {
          error: 'Invalid API key format',
          message: 'APIキーの形式が正しくありません。',
          details: 'Tavily APIキーは"tvly-"で始まる必要があります。'
        },
        { status: 400 }
      );
    }

    const requestBody = {
      query: 'カスタマーサクセス customer success 最新ニュース',
      search_depth: 'advanced',
      include_domains: NEWS_DOMAINS,
      exclude_domains: ['qiita.com', 'zenn.dev', 'note.com'],
      language: 'ja',
      max_results: 30,
      include_answer: false,
      include_images: true,
      include_raw_content: false,
      filter_by_source_type: ['news'],
    };

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept-Charset': 'utf-8'
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorDetails = {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        message: response.status === 401 
          ? 'APIキーが無効または期限切れです。Tavilyダッシュボードで確認してください。'
          : 'APIリクエストに失敗しました。'
      };
      
      console.error('Tavily API Error:', errorDetails);
      
      return NextResponse.json(
        errorDetails,
        { status: response.status }
      );
    }

    const rawData = await response.json();
    
    // レスポンスデータの整形
    const formattedData = rawData.results.map((article: any, index: number) => {
      const domain = new URL(article.url).hostname;
      return {
        id: String(index),
        title: fixCharacterEncoding(article.title || '無題', domain),
        description: fixCharacterEncoding(article.content || article.snippet || article.title, domain),
        date: new Date(article.published_date || Date.now()).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        imageUrl: getRandomImageUrl(),
        url: article.url,
      };
    });

    return NextResponse.json({
      status: 'success',
      results: formattedData,
      total: formattedData.length,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('News API Error:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch news',
        details: error.message
      },
      { status: 500 }
    );
  }
} 