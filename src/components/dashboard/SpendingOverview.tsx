
import { BarChart3, ArrowUpRight, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Spending categories data
const spendingCategories = [
  { 
    name: "Food & Dining", 
    spent: 850, 
    budget: 1000, 
    percentage: 85, 
    trend: -5,
    color: "bg-primary" 
  },
  { 
    name: "Shopping", 
    spent: 620, 
    budget: 600, 
    percentage: 103, 
    trend: 12,
    color: "bg-lavender" 
  },
  { 
    name: "Transportation", 
    spent: 350, 
    budget: 500, 
    percentage: 70, 
    trend: -10,
    color: "bg-paleyellow" 
  },
  { 
    name: "Entertainment", 
    spent: 280, 
    budget: 300, 
    percentage: 93, 
    trend: 4,
    color: "bg-accent" 
  },
];

export default function SpendingOverview() {
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
                  ₹{category.spent} 
                  <span className="text-xs text-muted-foreground ml-1">of ₹{category.budget}</span>
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
                indicatorClassName={`${category.percentage > 100 ? 'bg-red-500' : category.color}`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {category.percentage >= 100 
                  ? `You've exceeded your budget by ₹${category.spent - category.budget}` 
                  : `₹${category.budget - category.spent} remaining`
                }
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
