
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTransactionStore } from "@/store/transactionStore";
import { useBudgetStore } from "@/store/budgetStore";
import { getCurrencySymbol } from "@/utils/currencies";

const COLORS = ['#8b5cf6', '#ec4899', '#f97316', '#06b6d4', '#84cc16', '#6366f1'];

const CategoryBreakdown = () => {
  const { transactions } = useTransactionStore();
  const { settings } = useBudgetStore();

  // Process transactions for category breakdown
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any[], transaction) => {
      const existingCategory = acc.find(item => item.name === transaction.category);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        acc.push({
          name: transaction.category,
          value: transaction.amount
        });
      }
      return acc;
    }, []);

  const totalSpent = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => 
                `${name} (${getCurrencySymbol(settings.currency)}${value})`
              }
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => 
                `${getCurrencySymbol(settings.currency)}${value} (${((value/totalSpent)*100).toFixed(1)}%)`
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
