
import { Helmet } from "react-helmet-async";

const Suggestions = () => {
  return (
    <>
      <Helmet>
        <title>SpendoX - Suggestions</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Saving Suggestions</h1>
        <p className="text-muted-foreground">Smart tips to save money</p>
      </header>

      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Money Saving Tips</h2>
        <p className="text-muted-foreground mb-4">
          This page will provide personalized suggestions to help you reduce expenses and save more.
        </p>
      </div>
    </>
  );
};

export default Suggestions;
