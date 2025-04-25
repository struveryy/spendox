
import { Helmet } from "react-helmet-async";

const Budget = () => {
  return (
    <>
      <Helmet>
        <title>SpendoX - Budget</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Budget</h1>
        <p className="text-muted-foreground">Set and manage your monthly budget</p>
      </header>

      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Budget Management</h2>
        <p className="text-muted-foreground mb-4">
          This page will allow you to create and adjust your budget across different spending categories.
        </p>
      </div>
    </>
  );
};

export default Budget;
