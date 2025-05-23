import yahooFinance from 'yahoo-finance2';
import axios from 'axios';
import * as cheerio from 'cheerio';

// 対象企業のティッカーシンボルと企業情報
const COMPANIES = [
  {
    symbol: '4443.T', // Sansan
    name: 'Sansan株式会社',
    product: 'Sansan',
    color: '#36A2EB'
  },
  {
    symbol: '4478.T', // フリー
    name: 'フリー株式会社',
    product: 'freee',
    color: '#FF6384'
  },
  {
    symbol: '4484.T', // ランドコンピュータ
    name: 'ランドコンピュータ株式会社',
    product: 'LANDMark',
    color: '#4BC0C0'
  },
  {
    symbol: '3966.T', // ユーザベース
    name: '株式会社ユーザベース',
    product: 'SPEEDA',
    color: '#FFCD56'
  },
  {
    symbol: '4489.T', // プレイド
    name: '株式会社プレイド',
    product: 'KARTE',
    color: '#FF9F40'
  }
];

interface FinancialData {
  date: string;
  revenue: number;
  arr?: number;
}

interface CompanyData {
  name: string;
  product: string;
  color: string;
  financials: FinancialData[];
}

// 四半期データを年間換算してARRを概算
function calculateARR(quarterlyRevenue: number): number {
  return quarterlyRevenue * 4;
}

// Yahoo Financeから四半期データを取得
async function getQuarterlyData(symbol: string): Promise<FinancialData[]> {
  try {
    const result = await yahooFinance.quoteSummary(symbol, {
      modules: ['earnings', 'financialData']
    });

    const quarterlyRevenue = result.earnings?.quarterlyRevenue || [];
    
    return quarterlyRevenue.map(quarter => ({
      date: quarter.date,
      revenue: quarter.revenue,
      arr: calculateARR(quarter.revenue)
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return [];
  }
}

// すべての企業のデータを取得
export async function getAllCompaniesData(): Promise<CompanyData[]> {
  const companiesData: CompanyData[] = [];

  for (const company of COMPANIES) {
    const financials = await getQuarterlyData(company.symbol);
    companiesData.push({
      name: company.name,
      product: company.product,
      color: company.color,
      financials
    });
  }

  return companiesData;
}

// データをキャッシュするための簡易的な実装
let cachedData: CompanyData[] | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1時間

export async function getCachedCompaniesData(): Promise<CompanyData[]> {
  const now = Date.now();
  if (!cachedData || now - lastFetch > CACHE_DURATION) {
    cachedData = await getAllCompaniesData();
    lastFetch = now;
  }
  return cachedData;
} 