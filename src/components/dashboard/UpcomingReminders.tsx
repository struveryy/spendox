
import { Bell, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Mock data for upcoming reminders
const upcomingReminders = [
  {
    id: "r1",
    title: "Internet Bill Payment",
    amount: 999,
    dueDate: "May 28, 2025",
    isPriority: true,
    daysLeft: 3
  },
  {
    id: "r2",
    title: "Mobile Recharge",
    amount: 499,
    dueDate: "June 2, 2025",
    isPriority: false,
    daysLeft: 8
  },
  {
    id: "r3",
    title: "Rent Payment",
    amount: 8500,
    dueDate: "June 5, 2025",
    isPriority: true,
    daysLeft: 11
  }
];

export default function UpcomingReminders() {
  return (
    <Card className="animate-entrance" style={{ animationDelay: "200ms" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Payments</CardTitle>
          <CardDescription>Don't miss important due dates</CardDescription>
        </div>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
          {upcomingReminders.map((reminder) => (
            <div 
              key={reminder.id}
              className={cn(
                "flex items-center justify-between p-2 rounded-lg transition-all",
                reminder.isPriority && reminder.daysLeft <= 3 
                  ? "bg-red-50 border border-red-100" 
                  : "hover:bg-muted"
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  "rounded-full p-2 mr-3",
                  reminder.isPriority && reminder.daysLeft <= 3 
                    ? "bg-red-100" 
                    : "bg-secondary"
                )}>
                  {reminder.isPriority && reminder.daysLeft <= 3 ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm">{reminder.title}</div>
                  <div className="text-xs text-muted-foreground">Due: {reminder.dueDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">₹{reminder.amount}</div>
                <div className="flex justify-end items-center mt-1">
                  {reminder.daysLeft <= 3 ? (
                    <Badge variant={reminder.isPriority ? "destructive" : "outline"} className="text-xs">
                      {reminder.daysLeft} days left
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">{reminder.daysLeft} days left</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/reminders">Manage Reminders</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
