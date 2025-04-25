import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getCurrencySymbol } from "@/utils/currencies";

// Mock data for transactions
const transactions = [
  {
    id: 1,
    date: "2025-05-25",
    description: "Cafe Coffee Day",
    category: "Food & Dining",
    amount: -180,
    type: "expense"
  },
  {
    id: 2,
    date: "2025-05-24",
    description: "Monthly Salary",
    category: "Income",
    amount: 45000,
    type: "income"
  },
  {
    id: 3,
    date: "2025-05-23",
    description: "H&M Purchase",
    category: "Shopping",
    amount: -1200,
    type: "expense"
  },
  {
    id: 4,
    date: "2025-05-22",
    description: "Uber Ride",
    category: "Transportation",
    amount: -350,
    type: "expense"
  },
  {
    id: 5,
    date: "2025-05-21",
    description: "Movie Tickets",
    category: "Entertainment",
    amount: -500,
    type: "expense"
  },
];

interface TransactionsTableProps {
  currency?: string;
}

export function TransactionsTable({ currency = "USD" }: TransactionsTableProps) {
  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className={`text-right ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {currencySymbol}{Math.abs(transaction.amount)}
              </TableCell>
              <TableCell>
                <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                  {transaction.type}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
