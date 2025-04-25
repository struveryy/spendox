
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Budget, BudgetSetting } from '@/utils/types';

interface BudgetStore {
  budgets: Budget[];
  settings: BudgetSetting;
  updateBudget: (category: string, amount: number) => void;
  updateSettings: (settings: BudgetSetting) => void;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      budgets: [
        { category: "Food & Dining", amount: 10000, spent: 0, color: "bg-primary" },
        { category: "Shopping", amount: 6000, spent: 0, color: "bg-lavender" },
        { category: "Transportation", amount: 5000, spent: 0, color: "bg-paleyellow" },
        { category: "Entertainment", amount: 3000, spent: 0, color: "bg-accent" },
        { category: "Education", amount: 5000, spent: 0, color: "bg-cyan-500" },
      ],
      settings: {
        monthlyBudget: 120000,
        currency: "INR",
        notifications: true,
      },
      updateBudget: (category, amount) =>
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.category === category ? { ...b, amount } : b
          ),
        })),
      updateSettings: (settings) => set({ settings }),
    }),
    {
      name: 'budget-storage',
    }
  )
);
