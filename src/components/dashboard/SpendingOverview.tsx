
import { BarChart3, ArrowUpRight, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTransactionStore } from "@/store/transactionStore";
import { useBudgetStore } from "@/store/budgetStore";

export default function SpendingOverview() {
  const { transactions } = useTransactionStore();
  const { budgets } = useBudgetStore();
  
  // Calculate spending by category
  const categorySpending = transactions.reduce((acc: { [key: string]: number }, transaction) => {
    if (transaction.type === 'expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Calculate month-over-month trends
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const spendingCategories = budgets.map(budget => {
    const spent = categorySpending[budget.category] || 0;
    const percentage = (spent / budget.amount) * 100;

    // Calculate trend
    const currentMonthSpending = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === budget.category &&
        new Date(t.date).getMonth() === currentMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthSpending = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === budget.category &&
        new Date(t.date).getMonth() === lastMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const trend = lastMonthSpending ? 
      ((currentMonthSpending - lastMonthSpending) / lastMonthSpending) * 100 : 0;

    return {
      name: budget.category,
      spent,
      budget: budget.amount,
      percentage,
      trend: Math.round(trend),
      color: budget.color
    };
  });

  return (
    <Card className="animate-entrance">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Spending Overview</CardTitle>
          <CardDescription>Track your spending across categories</CardDescription>
        </div>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {spendingCategories.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm flex items-center">
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                  {category.name}
                </div>
                <div className="text-sm font-medium flex items-center gap-1">
                  ₹{category.spent.toLocaleString()} 
                  <span className="text-xs text-muted-foreground ml-1">of ₹{category.budget.toLocaleString()}</span>
                  {category.trend > 0 ? (
                    <span className="inline-flex items-center text-xs text-red-500">
                      <ArrowUpRight className="h-3 w-3" />
                      {category.trend}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs text-green-500">
                      <TrendingDown className="h-3 w-3" />
                      {Math.abs(category.trend)}%
                    </span>
                  )}
                </div>
              </div>
              <Progress 
                value={category.percentage} 
                className={`h-2 ${category.percentage > 100 ? 'bg-red-100' : 'bg-secondary'}`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {category.percentage >= 100 
                  ? `You've exceeded your budget by ₹${(category.spent - category.budget).toLocaleString()}` 
                  : `₹${(category.budget - category.spent).toLocaleString()} remaining`
                }
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
