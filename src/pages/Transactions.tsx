
import { Helmet } from "react-helmet";

const Transactions = () => {
  return (
    <>
      <Helmet>
        <title>SpendoX - Transactions</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">View and manage your transaction history</p>
      </header>

      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <p className="text-muted-foreground mb-4">
          This page will display your transaction history with filtering and search capabilities.
        </p>
      </div>
    </>
  );
};

export default Transactions;
