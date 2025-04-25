
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
  className,
  iconClassName,
}: StatCardProps) {
  const isPositiveTrend = trend && trend > 0;
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && (
          <div className={cn("p-2 rounded-full", iconClassName || "bg-primary/10")}>
            <Icon className={cn("h-4 w-4", iconClassName ? "text-white" : "text-primary")} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground">
            {trend && (
              <span 
                className={cn(
                  "inline-flex items-center mr-2",
                  isPositiveTrend ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositiveTrend ? "+" : ""}{trend}%
              </span>
            )}
            <span>{description || trendLabel || ""}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
