import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utilities/currencyFormatter";
import { getProgressBarVariant } from "../utilities/getProgressBar";
import classNames from "classnames";

interface BudgetCardProps {
  name: string;
  amount: number;
  max: number;
  gray: boolean;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ name, amount, max, gray }) => {
  const cardColorClass = classNames({
    "bg-danger bg-opacity-10": amount > max,
    "bg-light": !(amount > max) && gray,
  });
  return (
    <Card className={cardColorClass}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            <span className="text-muted fs-6 ms-1">
              / {currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />

        <Stack direction="horizontal" gap={2} className="mt-4">
          <Button variant="outline-primary" className="ms-autp">
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
