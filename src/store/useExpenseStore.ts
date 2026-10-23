import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction } from '../types/transaction';
import { Goal } from '../types/goal';
import { BudgetConfig } from '../types/budget';
import { initialBudgetConfig, initialGoals, initialTransactions } from './sampleData';

interface ExpenseState {
  transactions: Transaction[];
  goals: Goal[];
  budgetConfig: BudgetConfig;

  // Transactions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;

  // Budget
  updateBudget: (amount: number) => void;

  // Goals
  addGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
  deleteGoal: (id: string) => void;
  depositToGoal: (id: string, amount: number) => void;

  // Reset
  resetToSampleData: () => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      transactions: initialTransactions,
      goals: initialGoals,
      budgetConfig: initialBudgetConfig,

      addTransaction: (txData) =>
        set((state) => ({
          transactions: [
            {
              ...txData,
              id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            },
            ...state.transactions,
          ],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),

      updateBudget: (amount) =>
        set((state) => ({
          budgetConfig: {
            ...state.budgetConfig,
            monthlyBudget: amount,
          },
        })),

      addGoal: (goalData) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...goalData,
              id: `goal-${Date.now()}`,
              currentAmount: 0,
            },
          ],
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),

      depositToGoal: (id, amount) =>
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id === id) {
              const newAmount = Math.min(g.targetAmount, g.currentAmount + amount);
              return { ...g, currentAmount: newAmount };
            }
            return g;
          }),
        })),

      resetToSampleData: () =>
        set({
          transactions: initialTransactions,
          goals: initialGoals,
          budgetConfig: initialBudgetConfig,
        }),
    }),
    {
      name: 'pocket-storage',
    }
  )
);
