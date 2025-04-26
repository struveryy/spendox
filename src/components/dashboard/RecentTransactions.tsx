
import { Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTransactionStore } from "@/store/transactionStore";
import { format } from "date-fns";

export default function RecentTransactions() {
  const { transactions } = useTransactionStore();
  
  // Get the 5 most recent transactions
  const recentTransactions = transactions
    .slice(0, 5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-medium text-sm">{transaction.description}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    {format(new Date(transaction.date), "MMM d, yyyy")}
                    <Badge variant="outline" className="ml-1 py-0 h-4 text-[10px]">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className={`font-medium text-sm ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                ₹{Math.abs(transaction.amount)}
              </div>
            </div>
          ))}
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
