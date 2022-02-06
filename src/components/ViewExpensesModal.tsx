import React, { FC } from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utilities/currencyFormatter";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";
import { ExpenseInterface } from "../utilities/model";

interface ViewExpensesModalProps {
  budgetId: string;
  viewExpenses: boolean;
  setViewExpenseModalByBudget: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewExpensesModal: FC<ViewExpensesModalProps> = ({
  budgetId,
  viewExpenses,
  setViewExpenseModalByBudget,
}) => {
  const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } =
    useBudgets();
  const expenses: ExpenseInterface[] = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);

  const handleCloseModal = () => setViewExpenseModalByBudget(false);
  const deleteBudgetAndCloseModal = (budgetId: string) => {
    deleteBudget(budgetId);
    handleCloseModal();
  };

  return (
    <Modal show={viewExpenses} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>
              Expenses - {budget?.name}
              {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <Button
                  onClick={() => deleteBudgetAndCloseModal(budgetId)}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              )}
            </div>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense.id)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
