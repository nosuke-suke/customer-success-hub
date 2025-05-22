"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FadeInSection from "@/components/fade-in-section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageHeader from "@/components/page-header"

// データ型の定義
interface CompanyData {
  name: string;
  [key: string]: string | number; // 企業名をキーとした動的なプロパティ
}

interface IndustryData {
  name: string;
  ARR: number;
  Churn: number;
  NPS: number;
}

// Mock data for SaaS growth trends
const arrData: CompanyData[] = [
  { name: "Q1 2022", Salesforce: 7.41, HubSpot: 0.39, Zendesk: 0.43, Slack: 0.63 },
  { name: "Q2 2022", Salesforce: 7.72, HubSpot: 0.42, Zendesk: 0.45, Slack: 0.68 },
  { name: "Q3 2022", Salesforce: 7.84, HubSpot: 0.44, Zendesk: 0.46, Slack: 0.71 },
  { name: "Q4 2022", Salesforce: 8.38, HubSpot: 0.47, Zendesk: 0.48, Slack: 0.73 },
  { name: "Q1 2023", Salesforce: 8.72, HubSpot: 0.48, Zendesk: 0.5, Slack: 0.75 },
  { name: "Q2 2023", Salesforce: 8.6, HubSpot: 0.5, Zendesk: 0.51, Slack: 0.78 },
  { name: "Q3 2023", Salesforce: 8.72, HubSpot: 0.51, Zendesk: 0.52, Slack: 0.8 },
]

const churnData: CompanyData[] = [
  { name: "Q1 2022", Salesforce: 7.2, HubSpot: 8.5, Zendesk: 9.8, Slack: 8.1 },
  { name: "Q2 2022", Salesforce: 7.0, HubSpot: 8.3, Zendesk: 9.5, Slack: 7.9 },
  { name: "Q3 2022", Salesforce: 6.8, HubSpot: 8.0, Zendesk: 9.3, Slack: 7.7 },
  { name: "Q4 2022", Salesforce: 6.5, HubSpot: 7.8, Zendesk: 9.0, Slack: 7.5 },
  { name: "Q1 2023", Salesforce: 6.3, HubSpot: 7.5, Zendesk: 8.8, Slack: 7.3 },
  { name: "Q2 2023", Salesforce: 6.1, HubSpot: 7.3, Zendesk: 8.5, Slack: 7.0 },
  { name: "Q3 2023", Salesforce: 5.9, HubSpot: 7.0, Zendesk: 8.3, Slack: 6.8 },
]

const npsData: CompanyData[] = [
  { name: "Q1 2022", Salesforce: 42, HubSpot: 45, Zendesk: 38, Slack: 48 },
  { name: "Q2 2022", Salesforce: 43, HubSpot: 46, Zendesk: 39, Slack: 49 },
  { name: "Q3 2022", Salesforce: 45, HubSpot: 47, Zendesk: 40, Slack: 50 },
  { name: "Q4 2022", Salesforce: 46, HubSpot: 48, Zendesk: 41, Slack: 51 },
  { name: "Q1 2023", Salesforce: 47, HubSpot: 49, Zendesk: 42, Slack: 52 },
  { name: "Q2 2023", Salesforce: 48, HubSpot: 50, Zendesk: 43, Slack: 53 },
  { name: "Q3 2023", Salesforce: 49, HubSpot: 51, Zendesk: 44, Slack: 54 },
]

const industryData: IndustryData[] = [
  { name: "CRM", ARR: 96.3, Churn: 7.2, NPS: 45 },
  { name: "Marketing", ARR: 68.5, Churn: 8.1, NPS: 42 },
  { name: "Customer Service", ARR: 58.7, Churn: 8.9, NPS: 39 },
  { name: "Collaboration", ARR: 47.2, Churn: 7.5, NPS: 48 },
  { name: "HR Tech", ARR: 38.6, Churn: 9.2, NPS: 36 },
  { name: "Finance", ARR: 42.3, Churn: 6.8, NPS: 41 },
]

export default function TrendsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["Salesforce", "HubSpot", "Zendesk", "Slack"])
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter data based on selected companies
  const filteredArrData = arrData.map((item) => {
    const filteredItem: CompanyData = { name: item.name }
    selectedCompanies.forEach((company) => {
      filteredItem[company] = item[company]
    })
    return filteredItem
  })

  const filteredChurnData = churnData.map((item) => {
    const filteredItem: CompanyData = { name: item.name }
    selectedCompanies.forEach((company) => {
      filteredItem[company] = item[company]
    })
    return filteredItem
  })

  const filteredNpsData = npsData.map((item) => {
    const filteredItem: CompanyData = { name: item.name }
    selectedCompanies.forEach((company) => {
      filteredItem[company] = item[company]
    })
    return filteredItem
  })

  // Filter industry data
  const filteredIndustryData =
    selectedIndustry === "all" ? industryData : industryData.filter((item) => item.name === selectedIndustry)

  // Colors for charts
  const colors = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"]

  return (
    <div className="min-h-screen">
      <PageHeader
        title="SaaS成長トレンド"
        description="最新のSaaS業界の成長トレンドと分析をご紹介します"
      />
      <div className="container mx-auto px-4 py-8">

        {/* Filter Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCompanies.includes("Salesforce") ? "default" : "outline"}
                  className={selectedCompanies.includes("Salesforce") ? "bg-[#4CAF50] hover:bg-[#3d8b40]" : ""}
                  onClick={() => {
                    if (selectedCompanies.includes("Salesforce")) {
                      setSelectedCompanies(selectedCompanies.filter((c) => c !== "Salesforce"))
                    } else {
                      setSelectedCompanies([...selectedCompanies, "Salesforce"])
                    }
                  }}
                >
                  Salesforce
                </Button>
                <Button
                  variant={selectedCompanies.includes("HubSpot") ? "default" : "outline"}
                  className={selectedCompanies.includes("HubSpot") ? "bg-[#2196F3] hover:bg-[#1976d2]" : ""}
                  onClick={() => {
                    if (selectedCompanies.includes("HubSpot")) {
                      setSelectedCompanies(selectedCompanies.filter((c) => c !== "HubSpot"))
                    } else {
                      setSelectedCompanies([...selectedCompanies, "HubSpot"])
                    }
                  }}
                >
                  HubSpot
                </Button>
                <Button
                  variant={selectedCompanies.includes("Zendesk") ? "default" : "outline"}
                  className={selectedCompanies.includes("Zendesk") ? "bg-[#FF9800] hover:bg-[#f57c00]" : ""}
                  onClick={() => {
                    if (selectedCompanies.includes("Zendesk")) {
                      setSelectedCompanies(selectedCompanies.filter((c) => c !== "Zendesk"))
                    } else {
                      setSelectedCompanies([...selectedCompanies, "Zendesk"])
                    }
                  }}
                >
                  Zendesk
                </Button>
                <Button
                  variant={selectedCompanies.includes("Slack") ? "default" : "outline"}
                  className={selectedCompanies.includes("Slack") ? "bg-[#9C27B0] hover:bg-[#7b1fa2]" : ""}
                  onClick={() => {
                    if (selectedCompanies.includes("Slack")) {
                      setSelectedCompanies(selectedCompanies.filter((c) => c !== "Slack"))
                    } else {
                      setSelectedCompanies([...selectedCompanies, "Slack"])
                    }
                  }}
                >
                  Slack
                </Button>
              </div>

              <div className="w-full md:w-auto">
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="業界を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての業界</SelectItem>
                    <SelectItem value="CRM">CRM</SelectItem>
                    <SelectItem value="Marketing">マーケティング</SelectItem>
                    <SelectItem value="Customer Service">カスタマーサービス</SelectItem>
                    <SelectItem value="Collaboration">コラボレーション</SelectItem>
                    <SelectItem value="HR Tech">HR Tech</SelectItem>
                    <SelectItem value="Finance">ファイナンス</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BDEBD2]"></div>
                </div>
              ) : (
                <Tabs defaultValue="company">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="company">企業別分析</TabsTrigger>
                    <TabsTrigger value="industry">業界別分析</TabsTrigger>
                  </TabsList>

                  <TabsContent value="company">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* ARR Chart */}
                      <Card>
                        <CardHeader>
                          <CardTitle>ARR推移（十億ドル）</CardTitle>
                          <CardDescription>四半期ごとの年間経常収益の推移</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={filteredArrData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              {selectedCompanies.map((company, index) => (
                                <Line
                                  key={company}
                                  type="monotone"
                                  dataKey={company}
                                  stroke={colors[index % colors.length]}
                                  activeDot={{ r: 8 }}
                                />
                              ))}
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Churn Rate Chart */}
                      <Card>
                        <CardHeader>
                          <CardTitle>解約率推移（%）</CardTitle>
                          <CardDescription>四半期ごとの顧客解約率の推移</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={filteredChurnData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              {selectedCompanies.map((company, index) => (
                                <Line
                                  key={company}
                                  type="monotone"
                                  dataKey={company}
                                  stroke={colors[index % colors.length]}
                                  activeDot={{ r: 8 }}
                                />
                              ))}
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* NPS Chart */}
                      <Card>
                        <CardHeader>
                          <CardTitle>NPS推移</CardTitle>
                          <CardDescription>四半期ごとのNet Promoter Scoreの推移</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={filteredNpsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              {selectedCompanies.map((company, index) => (
                                <Line
                                  key={company}
                                  type="monotone"
                                  dataKey={company}
                                  stroke={colors[index % colors.length]}
                                  activeDot={{ r: 8 }}
                                />
                              ))}
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Growth Rate Comparison */}
                      <Card>
                        <CardHeader>
                          <CardTitle>成長率比較（2023 Q3）</CardTitle>
                          <CardDescription>主要指標の企業間比較</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: "ARR成長率", Salesforce: 11.2, HubSpot: 16.3, Zendesk: 12.8, Slack: 14.5 },
                                { name: "顧客数成長率", Salesforce: 9.8, HubSpot: 15.2, Zendesk: 11.5, Slack: 13.8 },
                                { name: "ARPU成長率", Salesforce: 5.2, HubSpot: 7.8, Zendesk: 6.3, Slack: 6.9 },
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              {selectedCompanies.map((company, index) => (
                                <Bar key={company} dataKey={company} fill={colors[index % colors.length]} />
                              ))}
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="industry">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Industry ARR Comparison */}
                      <Card>
                        <CardHeader>
                          <CardTitle>業界別ARR比較（十億ドル）</CardTitle>
                          <CardDescription>2023年第3四半期のデータ</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredIndustryData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="ARR" fill="#4CAF50" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Industry Churn Comparison */}
                      <Card>
                        <CardHeader>
                          <CardTitle>業界別解約率比較（%）</CardTitle>
                          <CardDescription>2023年第3四半期のデータ</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredIndustryData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="Churn" fill="#FF9800" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Industry NPS Comparison */}
                      <Card>
                        <CardHeader>
                          <CardTitle>業界別NPS比較</CardTitle>
                          <CardDescription>2023年第3四半期のデータ</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredIndustryData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="NPS" fill="#2196F3" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Industry Growth Trends */}
                      <Card>
                        <CardHeader>
                          <CardTitle>業界別成長率トレンド（%）</CardTitle>
                          <CardDescription>2022-2023年の年間成長率</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: "CRM", "2022": 18.5, "2023": 15.2 },
                                { name: "Marketing", "2022": 22.3, "2023": 19.8 },
                                { name: "Customer Service", "2022": 16.8, "2023": 14.5 },
                                { name: "Collaboration", "2022": 25.6, "2023": 21.3 },
                                { name: "HR Tech", "2022": 19.2, "2023": 17.5 },
                                { name: "Finance", "2022": 15.7, "2023": 13.9 },
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="2022" fill="#9C27B0" />
                              <Bar dataKey="2023" fill="#4CAF50" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </section>
        </FadeInSection>

        {/* Insights Section */}
        <FadeInSection>
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7FCFA]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">データから見るCS戦略のポイント</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle>解約率と成長の相関</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      解約率が1%低下すると、ARRの成長率は平均して2.5%向上することがデータから読み取れます。
                      特にコラボレーションツールでは、この効果が顕著に表れています。
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle>NPS向上の効果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      NPSが10ポイント向上すると、顧客維持率は平均3.2%向上し、アップセル機会も20%増加する傾向があります。
                      顧客体験の向上が直接的な収益増加につながっています。
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle>業界別CS戦略</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      マーケティングツールはオンボーディングの質が、CRMは継続的な価値提供が、
                      コラボレーションツールは利用頻度の向上が、それぞれ成功の鍵となっています。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </FadeInSection>
      </div>
    </div>
  )
}
