
import { Helmet } from "react-helmet-async";
import SpendingTrends from "@/components/analytics/SpendingTrends";
import CategoryBreakdown from "@/components/analytics/CategoryBreakdown";

const Analytics = () => {
  return (
    <>
      <Helmet>
        <title>SpendoX - Analytics</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Understand your spending patterns</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SpendingTrends />
        <CategoryBreakdown />
      </div>
    </>
  );
};

export default Analytics;
