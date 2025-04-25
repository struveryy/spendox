
import { Helmet } from "react-helmet-async";
import SavingTips from "@/components/suggestions/SavingTips";

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

      <SavingTips />
    </>
  );
};

export default Suggestions;
