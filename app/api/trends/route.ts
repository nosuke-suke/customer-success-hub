import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // 過去5年分のデータを取得
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

    const { data: metricsData, error: metricsError } = await supabase
      .from('saas_metrics')
      .select('*')
      .gte('date', fiveYearsAgo.toISOString())
      .order('date', { ascending: true });

    if (metricsError) throw metricsError;

    // ユニークな企業名と指標名を抽出
    const companies = Array.from(new Set(metricsData.map(d => d.company_name)))
      .sort()
      .map(name => ({ id: name, name }));

    const metrics = Array.from(new Set(metricsData.map(d => d.metric_name)))
      .sort()
      .map(name => {
        let unit = '';
        switch (name.toLowerCase()) {
          case 'arr':
            unit = '億円';
            break;
          case 'nrr':
          case 'churn_rate':
            unit = '%';
            break;
          default:
            unit = '';
        }
        return { id: name, name, unit };
      });

    // データを整形
    const formattedData = {
      companies,
      metrics,
      trends: metricsData.reduce((acc: any, curr: any) => {
        const companyName = curr.company_name;
        const metricName = curr.metric_name;
        
        if (!acc[companyName]) {
          acc[companyName] = {};
        }
        if (!acc[companyName][metricName]) {
          acc[companyName][metricName] = [];
        }
        
        // 日付をYYYY/MMの形式に整形
        const date = new Date(curr.date);
        const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        acc[companyName][metricName].push({
          date: curr.date,
          formattedDate,
          value: curr.value,
          unit: metrics.find(m => m.name === metricName)?.unit || ''
        });
        
        return acc;
      }, {})
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching trends data:', error);
    return NextResponse.json({ error: 'データの取得に失敗しました' }, { status: 500 });
  }
} 