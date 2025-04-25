
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTransactionForm } from "@/components/transactions/AddTransactionForm";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";

const Transactions = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>SpendoX - Transactions</title>
      </Helmet>
      
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">View and manage your transaction history</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Enter the details of your transaction below.
                </DialogDescription>
              </DialogHeader>
              <AddTransactionForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <TransactionsTable />
    </>
  );
};

export default Transactions;
