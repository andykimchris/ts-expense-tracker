import classNames from "classnames";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utilities/currencyFormatter";
import { getProgressBarVariant } from "../utilities/getProgressBar";
import { IoAddSharp } from "react-icons/io5";

interface BudgetCardProps {
  name: string;
  amount: number;
  max: number;
  gray: boolean;
  showButtons: boolean;
  openAddExpenseClick: () => void;
  onViewExpensesClick: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  name,
  amount,
  max,
  gray,
  showButtons,
  openAddExpenseClick,
  onViewExpensesClick,
}) => {
  const cardColorClass = classNames({
    "bg-danger bg-opacity-10": amount > max,
    "bg-light": !(amount > max) && gray,
  });

  const animatedProgressBar = amount < max;

  return (
    <Card className={`${cardColorClass} mb-4`}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            animated={animatedProgressBar}
            min={0}
            max={max}
            now={amount}
          />
        )}

        {showButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              size="sm"
              onClick={openAddExpenseClick}
            >
              Expense
              <IoAddSharp />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onViewExpensesClick}
            >
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
