import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./App.css";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import { ExpenseInterface } from "./utilities/model";
import { IoAddSharp } from "react-icons/io5";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { budgets, getBudgetExpenses } = useBudgets();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showExpenseModal, setShowExpenseModal] = useState<boolean>(false);
  const [viewExpenseModalByBudget, setViewExpenseModalByBudget] =
    useState<boolean>(false);
  const [addExpenseModalBudgetID, setAddExpenseModalBudgetID] =
    useState<string>("");

  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
    useState<string>("");

  const openAddExpenseModal = (budgetId: string) => {
    setShowExpenseModal(true);
    setAddExpenseModalBudgetID(budgetId);
  };

  const openViewExpenseModal = (budgetId: string) => {
    setViewExpenseModalByBudget(true);
    setViewExpensesModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h2 className="me-auto">Budgets</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Budget
            <IoAddSharp />
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          >
            Expense
            <IoAddSharp />
          </Button>
        </Stack>

        <div className="main mb-4">
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (acc: number, expense: ExpenseInterface) => acc + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                max={budget.max}
                amount={amount}
                showButtons={true}
                gray
                openAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => openViewExpenseModal(budget.id)}
              />
            );
          })}
        </div>
        <UncategorizedBudgetCard
          openAddExpenseModal={openAddExpenseModal}
          onViewExpensesClick={openViewExpenseModal}
        />
        <TotalBudgetCard />
      </Container>
      <AddBudgetModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />

      <AddExpenseModal
        show={showExpenseModal}
        handleClose={() => setShowExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetID}
      />

      <ViewExpensesModal
        viewExpenses={viewExpenseModalByBudget}
        setViewExpenseModalByBudget={setViewExpenseModalByBudget}
        budgetId={viewExpensesModalBudgetId}
      />
    </>
  );
};

export default App;
