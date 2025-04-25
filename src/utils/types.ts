
export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

export interface Budget {
  category: string;
  amount: number;
  spent: number;
  color: string;
}

export interface BudgetSetting {
  monthlyBudget: number;
  currency: string;
  notifications: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  isPriority: boolean;
  isCompleted: boolean;
  category: string;
}
