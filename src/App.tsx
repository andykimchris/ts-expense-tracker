import React from "react";
import "./App.css";
import BudgetCard from "./components/BudgetCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
      </Stack>

      <div className="main">
        <BudgetCard
          name="Entertainment"
          max={1000}
          amount={100}
          gray
        ></BudgetCard>
      </div>
    </Container>
  );
};

export default App;
