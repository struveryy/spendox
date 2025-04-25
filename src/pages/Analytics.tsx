
import { Helmet } from "react-helmet-async";

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

      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
        <p className="text-muted-foreground mb-4">
          This page will contain detailed spending analytics, charts, and financial insights.
        </p>
      </div>
    </>
  );
};

export default Analytics;
