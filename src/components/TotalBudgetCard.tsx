import { FC } from "react";
import { useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

interface TotalBudgetCardProps {}

const TotalBudgetCard: FC<TotalBudgetCardProps> = () => {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((curr, expense) => curr + expense.amount, 0);
  const max = budgets.reduce((curr, budget) => curr + budget.max, 0);

  if (max === 0) return null;
  return (
    <BudgetCard
      openAddExpenseClick={function (): void {
        throw new Error("Function not implemented.");
      }}
      amount={amount}
      name="Total"
      max={max}
      gray
      showButtons={false}
      onViewExpensesClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default TotalBudgetCard;
