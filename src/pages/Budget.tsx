
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudgetStore } from "@/store/budgetStore";
import { getCurrencySymbol } from "@/utils/currencies";

const Budget = () => {
  const { budgets, settings, updateBudget } = useBudgetStore();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState("");
  
  const handleUpdateBudget = (category: string) => {
    const amount = parseFloat(newAmount);
    if (!isNaN(amount) && amount > 0) {
      updateBudget(category, amount);
      setEditingCategory(null);
      setNewAmount("");
    }
  };

  return (
    <>
      <Helmet>
        <title>SpendoX - Budget</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Budget</h1>
        <p className="text-muted-foreground">Set and manage your monthly budget</p>
      </header>

      <div className="grid gap-6">
        {budgets.map((budget) => (
          <Card key={budget.category}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{budget.category}</span>
                <span className="text-lg">
                  {getCurrencySymbol(settings.currency)}{budget.amount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingCategory === budget.category ? (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="Enter new budget"
                  />
                  <Button onClick={() => handleUpdateBudget(budget.category)}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingCategory(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingCategory(budget.category);
                    setNewAmount(budget.amount.toString());
                  }}
                >
                  Update Budget
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Budget;
