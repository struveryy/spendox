
import { Eye, ArrowUpRight, ArrowDownLeft, Coffee, ShoppingBag, Bus, Film, Book } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock data for recent transactions
const recentTransactions = [
  {
    id: "t1",
    description: "Cafe Coffee Day",
    amount: -180,
    date: "Today",
    category: "Food",
    icon: Coffee
  },
  {
    id: "t2",
    description: "Zomato Order",
    amount: -430,
    date: "Yesterday",
    category: "Food",
    icon: Coffee
  },
  {
    id: "t3",
    description: "H&M Purchase",
    amount: -1200,
    date: "May 23, 2025",
    category: "Shopping",
    icon: ShoppingBag
  },
  {
    id: "t4",
    description: "Uber Ride",
    amount: -350,
    date: "May 22, 2025",
    category: "Transport",
    icon: Bus
  },
  {
    id: "t5",
    description: "Movie Tickets",
    amount: -500,
    date: "May 20, 2025",
    category: "Entertainment",
    icon: Film
  },
];

export default function RecentTransactions() {
  return (
    <Card className="animate-entrance" style={{ animationDelay: "100ms" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest spending activities</CardDescription>
        </div>
        <Eye className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-1">
          {recentTransactions.map((transaction) => {
            const Icon = transaction.icon;
            const isIncome = transaction.amount > 0;

            return (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center">
                  <div className={cn(
                    "rounded-full p-2 mr-3",
                    transaction.category === "Food" ? "bg-primary/10" :
                    transaction.category === "Shopping" ? "bg-lavender/50" :
                    transaction.category === "Transport" ? "bg-paleyellow/50" :
                    "bg-accent/50"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      transaction.category === "Food" ? "text-primary" :
                      transaction.category === "Shopping" ? "text-purple-500" :
                      transaction.category === "Transport" ? "text-yellow-600" :
                      "text-orange-500"
                    )} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {transaction.date}
                      <Badge variant="outline" className="ml-1 py-0 h-4 text-[10px]">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className={cn(
                  "font-medium text-sm",
                  isIncome ? "text-green-600" : "text-navytext"
                )}>
                  <div className="flex items-center">
                    {isIncome ? (
                      <ArrowDownLeft className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 text-navytext mr-1" />
                    )}
                    ₹{Math.abs(transaction.amount)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/transactions">View All Transactions</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
