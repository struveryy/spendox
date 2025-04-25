
import { ArrowRight, DollarSign, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BudgetStatusProps {
  className?: string;
}

export default function BudgetStatus({ className }: BudgetStatusProps) {
  // Budget data
  const budget = 12000;
  const spent = 8400;
  const remaining = budget - spent;
  const percentageSpent = (spent / budget) * 100;
  const daysLeftInMonth = 8;
  
  // Determine if user is on track
  const dailyBudget = remaining / daysLeftInMonth;
  const averageDailySpend = spent / (30 - daysLeftInMonth);
  const isOnTrack = dailyBudget >= averageDailySpend;
  
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-primary" />
          Monthly Budget
        </CardTitle>
        <CardDescription>May 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Budget Utilization</span>
              <span className="text-sm font-medium">{Math.round(percentageSpent)}%</span>
            </div>
            <Progress value={percentageSpent} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Spent</p>
              <p className="text-xl font-bold">₹{spent.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-xl font-bold text-primary">₹{remaining.toLocaleString()}</p>
            </div>
          </div>
          
          {percentageSpent > 70 && (
            <div className={`rounded-lg p-3 flex items-start gap-2 ${isOnTrack ? "bg-yellow-50" : "bg-red-50"}`}>
              <AlertTriangle className={`h-5 w-5 mt-0.5 ${isOnTrack ? "text-yellow-500" : "text-red-500"}`} />
              <div>
                <p className="text-sm font-medium mb-1">
                  {isOnTrack ? "Caution" : "Budget Alert"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isOnTrack 
                    ? `You have ₹${Math.round(dailyBudget)} left to spend per day.` 
                    : `You're spending ₹${Math.round(averageDailySpend - dailyBudget)} too much per day.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/budget" className="flex items-center justify-center">
            Adjust Budget <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
