
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
  { month: 'Mar', week: 1, food: 600, shopping: 400, transport: 200, entertainment: 300, education: 500 },
  { month: 'Mar', week: 2, food: 700, shopping: 600, transport: 300, entertainment: 400, education: 500 },
  { month: 'Mar', week: 3, food: 800, shopping: 500, transport: 400, entertainment: 200, education: 500 },
  { month: 'Mar', week: 4, food: 900, shopping: 800, transport: 500, entertainment: 600, education: 500 },
  { month: 'Apr', week: 1, food: 1000, shopping: 700, transport: 600, entertainment: 500, education: 500 },
  { month: 'Apr', week: 2, food: 1100, shopping: 900, transport: 700, entertainment: 400, education: 500 },
  { month: 'Apr', week: 3, food: 1200, shopping: 1000, transport: 800, entertainment: 300, education: 500 },
  { month: 'Apr', week: 4, food: 1300, shopping: 1100, transport: 900, entertainment: 700, education: 500 },
  { month: 'May', week: 1, food: 1400, shopping: 1200, transport: 1000, entertainment: 900, education: 500 },
  { month: 'May', week: 2, food: 1500, shopping: 1300, transport: 1100, entertainment: 700, education: 500 },
  { month: 'May', week: 3, food: 1600, shopping: 1400, transport: 1200, entertainment: 800, education: 500 },
  { month: 'May', week: 4, food: 1700, shopping: 1500, transport: 1300, entertainment: 900, education: 500 },
];

// Calculate totals for each data point
const dataWithTotal = data.map(item => ({
  ...item,
  total: item.food + item.shopping + item.transport + item.entertainment + item.education
}));

const SpendingChart = () => {
  return (
    <Card className="col-span-3 animate-entrance">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <BarChart3 className="mr-2 h-4 w-4 text-primary" />
          Spending Trends
        </CardTitle>
        <div className="text-xs font-medium">Last 3 Months</div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataWithTotal} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey={(v) => `${v.month} W${v.week}`} 
                scale="band" 
                tickLine={false}
                axisLine={false}
                className="text-xs" 
              />
              <YAxis 
                tickFormatter={(value) => `₹${value}`} 
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />
              <Tooltip 
                formatter={(value) => [`₹${value}`, ``]}
                labelFormatter={(value) => `${value}`}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}
              />
              <Legend />
              <Bar dataKey="food" name="Food" fill="#8884d8" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="shopping" name="Shopping" fill="#82ca9d" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="transport" name="Transport" fill="#ffc658" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="entertainment" name="Entertainment" fill="#ff8042" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="education" name="Education" fill="#0088fe" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
