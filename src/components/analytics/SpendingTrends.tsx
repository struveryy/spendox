
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactionStore } from "@/store/transactionStore";
import { useBudgetStore } from "@/store/budgetStore";
import { getCurrencySymbol } from "@/utils/currencies";

const SpendingTrends = () => {
  const { transactions } = useTransactionStore();
  const { settings } = useBudgetStore();
  
  // Process transactions for monthly trends
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    const existingMonth = acc.find(item => item.month === monthYear);
    if (existingMonth) {
      if (transaction.type === 'expense') {
        existingMonth.expenses += transaction.amount;
      } else {
        existingMonth.income += transaction.amount;
      }
    } else {
      acc.push({
        month: monthYear,
        expenses: transaction.type === 'expense' ? transaction.amount : 0,
        income: transaction.type === 'income' ? transaction.amount : 0
      });
    }
    return acc;
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Monthly Spending Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `${getCurrencySymbol(settings.currency)}${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`${getCurrencySymbol(settings.currency)}${value}`, ""]}
            />
            <Bar name="Income" dataKey="income" fill="#4ade80" />
            <Bar name="Expenses" dataKey="expenses" fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingTrends;
