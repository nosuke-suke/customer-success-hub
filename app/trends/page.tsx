"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHeader from "@/components/page-header"

interface TrendData {
  date: string;
  formattedDate: string;
  value: number;
  unit: string;
}

interface CompanyTrends {
  [key: string]: {
    [key: string]: TrendData[];
  };
}

interface Company {
  id: string;
  name: string;
}

interface Metric {
  id: string;
  name: string;
  unit: string;
}

const COLORS = ['#BDEBD2', '#A5D6BA', '#8DC1A3', '#75AC8C', '#5D9775'];

export default function TrendsPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [trends, setTrends] = useState<CompanyTrends>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<string>("")

  useEffect(() => {
    fetchTrendsData()
  }, [])

  const fetchTrendsData = async () => {
    try {
      const response = await fetch("/api/trends")
      const data = await response.json()
      
      if (response.ok) {
        setCompanies(data.companies)
        setMetrics(data.metrics)
        setTrends(data.trends)
        setSelectedMetric(data.metrics[0]?.name || "")
      } else {
        setError("データの取得に失敗しました")
      }
    } catch (err) {
      setError("エラーが発生しました")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatChartData = (metricName: string) => {
    const allDates = new Set<string>()
    const companyData: { [key: string]: { [key: string]: number } } = {}

    // 全ての日付を収集
    Object.entries(trends).forEach(([companyName, metrics]) => {
      if (metrics[metricName]) {
        metrics[metricName].forEach(data => {
          allDates.add(data.date)
        })
      }
    })

    // 日付でソート
    const sortedDates = Array.from(allDates).sort()

    // データを整形
    const formattedData = sortedDates.map(date => {
      const dataPoint: any = { 
        date,
        formattedDate: trends[Object.keys(trends)[0]]?.[metricName]?.find(d => d.date === date)?.formattedDate || date
      }
      Object.entries(trends).forEach(([companyName, metrics]) => {
        const metric = metrics[metricName]?.find(m => m.date === date)
        dataPoint[companyName] = metric?.value || null
      })
      return dataPoint
    })

    return formattedData
  }

  // Y軸の値をフォーマットする関数を追加
  const formatYAxisValue = (value: number, unit: string) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}億${unit}`
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}万${unit}`
    } else {
      return `${value.toLocaleString()}${unit}`
    }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">読み込み中...</div>
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>

  const currentMetric = metrics.find(m => m.name === selectedMetric)
  const chartData = formatChartData(selectedMetric)

  return (
    <div className="min-h-screen">
      <PageHeader
        title="SaaS成長トレンド"
        description="主要SaaS企業の成長指標の推移をグラフで確認できます（※データはダミーデータです）"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>注意:</strong> このページのデータはダミーデータです。実際のSaaS企業のデータではありません。
          </p>
        </div>
        
        <Tabs defaultValue={metrics[0]?.name} className="w-full">
          <TabsList className="mb-8">
            {metrics.map(metric => (
              <TabsTrigger
                key={metric.id}
                value={metric.name}
                onClick={() => setSelectedMetric(metric.name)}
              >
                {metric.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {metrics.map(metric => (
            <TabsContent key={metric.id} value={metric.name}>
              <Card>
                <CardHeader>
                  <CardTitle>{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="formattedDate"
                          interval="preserveStartEnd"
                          minTickGap={50}
                        />
                        <YAxis
                          width={120}
                          domain={['auto', 'auto']}
                          tickFormatter={(value) => formatYAxisValue(value, currentMetric?.unit || '')}
                        />
                        <Tooltip
                          formatter={(value: number) => [
                            `${value.toLocaleString()}${currentMetric?.unit}`,
                            ""
                          ]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <Legend />
                        {companies.map((company, index) => (
                          <Line
                            key={company.id}
                            type="monotone"
                            dataKey={company.name}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 8 }}
                            connectNulls
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
