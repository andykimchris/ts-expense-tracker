import React, { useState } from "react";
import "./App.css";
import BudgetCard from "./components/BudgetCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets } from "./contexts/BudgetContext";
import { ExpenseInterface } from "./utilities/model";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const { budgets, getBudgetExpenses } = useBudgets();

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h2 className="me-auto">Budgets</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>

        <div className="main">
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
                gray
              />
            );
          })}
        </div>
      </Container>
      <AddBudgetModal show={showAddModal} handleClose={setShowAddModal} />
    </>
  );
};

export default App;
