import { create } from "zustand";

interface BudgetStore {
  budget: number;
  updateBudget: (newBudget: number) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budget: 5000, // Initial budget
  updateBudget: (newBudget) => set({ budget: newBudget }),
}));
