
import { Lightbulb, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for savings suggestions
const savingsStrategies = [
  {
    id: "s1",
    title: "Cut down on food delivery",
    description: "You spent ₹1,800 on food delivery last month. Try cooking at home more often.",
    savingPotential: 900,
    difficulty: "Medium"
  },
  {
    id: "s2",
    title: "Use public transport",
    description: "Switch to public transport twice a week to save on cab fares.",
    savingPotential: 500,
    difficulty: "Easy"
  },
  {
    id: "s3",
    title: "Cancel unused subscriptions",
    description: "You have 3 entertainment subscriptions. Consider keeping only your favorites.",
    savingPotential: 400,
    difficulty: "Easy"
  }
];

export default function SavingSuggestion() {
  // Take only the first suggestion to display
  const featuredSuggestion = savingsStrategies[0];
  
  return (
    <Card className="overflow-hidden animate-entrance bg-gradient-to-br from-primary/10 to-accent/10" style={{ animationDelay: "300ms" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-primary" />
            Smart Suggestion
          </CardTitle>
          <CardDescription>Save money with this tip</CardDescription>
        </div>
        <div className="p-2 bg-white rounded-full">
          <TrendingDown className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{featuredSuggestion.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{featuredSuggestion.description}</p>
        
        <div className="bg-white rounded-lg p-3 mb-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">Potential Monthly Savings</p>
            <p className="text-xl font-bold text-primary">₹{featuredSuggestion.savingPotential}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <span className={cn(
              "inline-block px-2 py-1 rounded-full text-xs font-medium",
              featuredSuggestion.difficulty === "Easy" ? "bg-green-100 text-green-700" :
              featuredSuggestion.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"
            )}>
              {featuredSuggestion.difficulty}
            </span>
          </div>
        </div>
        
        <Button variant="default" className="w-full" asChild>
          <a href="/suggestions">View All Suggestions</a>
        </Button>
      </CardContent>
    </Card>
  );
}
