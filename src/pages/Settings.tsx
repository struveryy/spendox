
import { Helmet } from "react-helmet-async";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { currencies } from "@/utils/currencies";

const budgetFormSchema = z.object({
  monthlyBudget: z.string().min(1, "Monthly budget is required"),
  currency: z.string().min(1, "Currency is required"),
  notificationPreference: z.string(),
});

const Settings = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof budgetFormSchema>>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      monthlyBudget: "12000",
      currency: "USD",
      notificationPreference: "daily",
    },
  });

  function onSubmit(values: z.infer<typeof budgetFormSchema>) {
    toast({
      title: "Budget settings updated",
      description: `Monthly budget set to ${currencies.find(c => c.code === values.currency)?.symbol}${values.monthlyBudget}`,
    });
  }

  return (
    <>
      <Helmet>
        <title>SpendoX - Settings</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </header>

      <div className="grid gap-8">
        <div className="rounded-lg border p-8">
          <h2 className="text-2xl font-semibold mb-6">Budget Settings</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="monthlyBudget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Budget</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your monthly budget" {...field} />
                    </FormControl>
                    <FormDescription>
                      Set your target monthly spending limit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} - {currency.name} ({currency.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notificationPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often would you like to receive budget alerts?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Save Settings</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Settings;
