
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useTransactionStore } from '@/store/transactionStore';

const SpendingChart = () => {
  const { transactions } = useTransactionStore();

  // Process transactions to get weekly data
  const weeklyData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date);
    const monthName = date.toLocaleString('default', { month: 'short' });
    const weekNumber = Math.ceil(date.getDate() / 7);
    const key = `${monthName} W${weekNumber}`;

    const existingWeek = acc.find(item => `${item.month} W${item.week}` === key);
    
    if (existingWeek) {
      if (transaction.type === 'expense') {
        existingWeek[transaction.category.toLowerCase()] = 
          (existingWeek[transaction.category.toLowerCase()] || 0) + transaction.amount;
      }
    } else {
      const newWeek = {
        month: monthName,
        week: weekNumber,
        food: 0,
        shopping: 0,
        transport: 0,
        entertainment: 0,
        education: 0
      };
      if (transaction.type === 'expense') {
        newWeek[transaction.category.toLowerCase()] = transaction.amount;
      }
      acc.push(newWeek);
    }
    return acc;
  }, []);

  return (
    <Card className="col-span-3 animate-entrance">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <BarChart3 className="mr-2 h-4 w-4 text-primary" />
          Spending Trends
        </CardTitle>
        <div className="text-xs font-medium">Weekly View</div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
