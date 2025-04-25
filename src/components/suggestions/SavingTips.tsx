
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionStore } from "@/store/transactionStore";
import { useBudgetStore } from "@/store/budgetStore";
import { getCurrencySymbol } from "@/utils/currencies";
import { TrendingDown, BadgeDollarSign, ShoppingBag, Utensils } from "lucide-react";

const SavingTips = () => {
  const { transactions } = useTransactionStore();
  const { settings } = useBudgetStore();
  
  // Calculate monthly food expenses
  const foodExpenses = transactions
    .filter(t => t.category === "Food & Dining" && t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate shopping expenses
  const shoppingExpenses = transactions
    .filter(t => t.category === "Shopping" && t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const tips = [
    {
      icon: Utensils,
      title: "Reduce Food Expenses",
      description: `You've spent ${getCurrencySymbol(settings.currency)}${foodExpenses} on food this month. Try meal prepping to save up to ${getCurrencySymbol(settings.currency)}${Math.round(foodExpenses * 0.3)} monthly.`,
      saving: Math.round(foodExpenses * 0.3),
      difficulty: "Medium"
    },
    {
      icon: ShoppingBag,
      title: "Smart Shopping",
      description: `Your shopping expenses are ${getCurrencySymbol(settings.currency)}${shoppingExpenses}. Using cashback apps could save you ${getCurrencySymbol(settings.currency)}${Math.round(shoppingExpenses * 0.1)} monthly.`,
      saving: Math.round(shoppingExpenses * 0.1),
      difficulty: "Easy"
    },
    {
      icon: BadgeDollarSign,
      title: "Student Discounts",
      description: "Use your student ID to get discounts on software, transportation, and entertainment.",
      saving: 200,
      difficulty: "Easy"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tips.map((tip, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <tip.icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">{tip.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{tip.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>
                <p className="text-xl font-bold text-primary flex items-center gap-1">
                  <TrendingDown className="h-4 w-4" />
                  {getCurrencySymbol(settings.currency)}{tip.saving}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tip.difficulty === "Easy" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {tip.difficulty}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SavingTips;
