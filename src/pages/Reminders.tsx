
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useReminderStore } from "@/store/reminderStore";
import { useBudgetStore } from "@/store/budgetStore";
import { getCurrencySymbol } from "@/utils/currencies";

const Reminders = () => {
  const { reminders, addReminder, toggleReminder, removeReminder } = useReminderStore();
  const currency = useBudgetStore((state) => state.settings.currency);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    amount: "",
    dueDate: "",
    category: "",
    isPriority: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminder.title && newReminder.amount && newReminder.dueDate) {
      addReminder({
        ...newReminder,
        amount: parseFloat(newReminder.amount),
        isCompleted: false,
      });
      setIsDialogOpen(false);
      setNewReminder({
        title: "",
        amount: "",
        dueDate: "",
        category: "",
        isPriority: false,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>SpendoX - Reminders</title>
      </Helmet>
      
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reminders</h1>
            <p className="text-muted-foreground">Set and manage payment reminders</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reminder</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newReminder.amount}
                    onChange={(e) => setNewReminder({ ...newReminder, amount: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newReminder.category}
                    onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newReminder.isPriority}
                    onCheckedChange={(checked) => setNewReminder({ ...newReminder, isPriority: checked })}
                  />
                  <Label>Priority</Label>
                </div>
                <Button type="submit" className="w-full">Add Reminder</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="grid gap-4">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className={reminder.isCompleted ? "opacity-60" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{reminder.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(reminder.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    {getCurrencySymbol(currency)}{reminder.amount}
                  </span>
                  {reminder.isPriority && (
                    <Badge variant="destructive">Priority</Badge>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant={reminder.isCompleted ? "outline" : "default"}
                  onClick={() => toggleReminder(reminder.id)}
                >
                  {reminder.isCompleted ? "Mark Incomplete" : "Mark Complete"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => removeReminder(reminder.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Reminders;
