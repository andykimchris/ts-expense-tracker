import React, { FC, createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BudgetInterface, ExpenseInterface } from "../utilities/model";

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

type budgetContextType = {
  budgets: BudgetInterface[];
  expenses: ExpenseInterface[];
  getBudgetExpenses: Function;
  addExpense: Function;
  addBudget: Function;
  deleteBudget: Function;
  deleteExpense: Function;
};

const budgetContextDefaultValues: budgetContextType = {
  budgets: [],
  expenses: [],
  addBudget: () => [],
  getBudgetExpenses: () => [],
  addExpense: () => [],
  deleteBudget: () => [],
  deleteExpense: () => [],
};
export const BudgetsContext = createContext<budgetContextType>(
  budgetContextDefaultValues
);

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

type BudgetsProviderProps = {
  children: React.ReactElement;
};

export const BudgetsProvider: FC<BudgetsProviderProps> = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId: string) => {
    const findExpenses: ExpenseInterface[] = expenses.filter(
      (expense: { budgetId: string }) => expense.budgetId === budgetId
    );
    return findExpenses;
  };

  const addBudget = ({ name, max }: BudgetInterface) => {
    setBudgets((prevBudgets: BudgetInterface[]) => {
      if (prevBudgets.find((budget) => budget.name === name))
        return prevBudgets;

      return [...prevBudgets, { id: uuid(), name, max }];
    });
  };

  const addExpense = (expense: ExpenseInterface) => {
    setExpenses((prevExpenses: ExpenseInterface[]) => {
      return [...prevExpenses, expense];
    });
  };

  const deleteBudget = (budgetId: string) => {
    // This sets expenses as uncategorized if their budget is deleted
    setExpenses((prevExpenses: ExpenseInterface[]) => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== budgetId) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })

    setBudgets((prevBudgets: BudgetInterface[]) => {
      return prevBudgets.filter((budget) => budget.id !== budgetId);
    });
  };

  const deleteExpense = (expenseId: string) => {
    setExpenses((prevExpenses: ExpenseInterface[]) => {
      return prevExpenses.filter((expense) => expense.id !== expenseId);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
