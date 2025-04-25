
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BarChart3, Calendar, CreditCard, DollarSign, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import SpendingChart from "@/components/dashboard/SpendingChart";
import SpendingOverview from "@/components/dashboard/SpendingOverview";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import UpcomingReminders from "@/components/dashboard/UpcomingReminders";
import SavingSuggestion from "@/components/dashboard/SavingSuggestion";
import BudgetStatus from "@/components/dashboard/BudgetStatus";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Welcome toast on first load
    toast({
      title: "Welcome back, Suhani!",
      description: "Your finances are looking good today.",
      duration: 5000,
    });
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>SpendoX - Dashboard</title>
      </Helmet>

      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Hello, Suhani!</h1>
            <p className="text-muted-foreground">Here's an overview of your finances</p>
          </div>
          <div className="flex items-center">
            <Badge variant="outline" className="text-xs bg-secondary">
              <Calendar className="h-3 w-3 mr-1" />
              May 25, 2025
            </Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Spent"
          value="₹8,400"
          trend={-5}
          trendLabel="vs last month"
          icon={DollarSign}
          className="animate-entrance"
        />
        <StatCard
          title="Monthly Budget"
          value="₹12,000"
          description="₹3,600 remaining"
          icon={CreditCard}
          iconClassName="bg-secondary"
          className="animate-entrance delay-50"
        />
        <StatCard
          title="Upcoming Bills"
          value="₹9,998"
          description="3 payments due soon"
          icon={Calendar}
          iconClassName="bg-accent"
          className="animate-entrance delay-100"
        />
        <StatCard
          title="Saving Potential"
          value="₹1,800"
          description="Based on your spending"
          icon={TrendingDown}
          iconClassName="bg-lavender"
          className="animate-entrance delay-150"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SpendingChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SpendingOverview />
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactions />
          <UpcomingReminders />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SavingSuggestion />
        <BudgetStatus className="md:col-span-1 animate-entrance delay-400" />
        
        {/* Weekly Insight Card */}
        <Card className="animate-entrance delay-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary rounded-full">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Weekly Insight</h3>
            <p className="text-sm text-muted-foreground mb-3">
              You've reduced your food expenses by 12% compared to last week. Great job sticking to your budget!
            </p>
            <div className="bg-mint/20 rounded-lg p-3 border border-mint">
              <p className="text-sm font-medium">Keep it up!</p>
              <p className="text-xs text-muted-foreground">
                Continue this trend to reach your savings goal faster.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Index;
