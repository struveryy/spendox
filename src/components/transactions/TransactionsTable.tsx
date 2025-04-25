
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
import { useTransactionStore } from "@/store/transactionStore";

interface TransactionsTableProps {
  currency?: string;
}

export function TransactionsTable({ currency = "USD" }: TransactionsTableProps) {
  const transactions = useTransactionStore((state) => state.transactions);
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
