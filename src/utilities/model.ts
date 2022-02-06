export interface BudgetInterface {
  id: string;
  name: string;
  max: number;
}

export interface ExpenseInterface {
  id: string;
  budgetId: string;
  amount: number;
  description: string;
}
