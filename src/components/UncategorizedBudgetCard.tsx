import { FC } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import { ExpenseInterface } from "../utilities/model";
import BudgetCard from "./BudgetCard";

interface UncategorizedBudgetCardProps {
  props?: object;
  openAddExpenseModal: (id: string) => void;
  onViewExpensesClick: (id: string) => void;
}

const UncategorizedBudgetCard: FC<UncategorizedBudgetCardProps> = ({
  openAddExpenseModal,
  onViewExpensesClick,
}) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (acc: number, expense: ExpenseInterface) => acc + expense.amount,
    0
  );

  if (amount === 0) return null;
  return (
    <BudgetCard
      max={0}
      openAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
      amount={amount}
      name={UNCATEGORIZED_BUDGET_ID}
      gray
      showButtons={true}
      onViewExpensesClick={() => onViewExpensesClick(UNCATEGORIZED_BUDGET_ID)}
    />
  );
};

export default UncategorizedBudgetCard;
