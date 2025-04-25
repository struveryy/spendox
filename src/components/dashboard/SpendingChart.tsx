
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Spending data for the last 3 months
const spendingData = [
  { month: "Mar", week: 1, food: 1200, shopping: 800, transport: 300, entertainment: 500, education: 1000 },
  { month: "Mar", week: 2, food: 1000, shopping: 1200, transport: 400, entertainment: 300, education: 1000 },
  { month: "Mar", week: 3, food: 1500, shopping: 600, transport: 500, entertainment: 400, education: 1000 },
  { month: "Mar", week: 4, food: 1300, shopping: 900, transport: 350, entertainment: 600, education: 1000 },
  { month: "Apr", week: 1, food: 900, shopping: 1100, transport: 450, entertainment: 550, education: 1200 },
  { month: "Apr", week: 2, food: 1100, shopping: 700, transport: 400, entertainment: 300, education: 1200 },
  { month: "Apr", week: 3, food: 1400, shopping: 950, transport: 300, entertainment: 400, education: 1200 },
  { month: "Apr", week: 4, food: 1200, shopping: 850, transport: 350, entertainment: 500, education: 1200 },
  { month: "May", week: 1, food: 850, shopping: 1000, transport: 400, entertainment: 450, education: 1000 },
  { month: "May", week: 2, food: 950, shopping: 750, transport: 350, entertainment: 350, education: 1000 },
  { month: "May", week: 3, food: 1050, shopping: 800, transport: 300, entertainment: 400, education: 1000 },
];

for (const data of spendingData) {
  data.total = data.food + data.shopping + data.transport + data.entertainment + data.education;
}

export default function SpendingChart() {
  const isMobile = useIsMobile();
  
  return (
    <Card className="col-span-full animate-entrance">
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
        <CardDescription>Your weekly spending over the last 3 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
          <AreaChart
            data={spendingData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c1f0c1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#c1f0c1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorShopping" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e0d3f5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#e0d3f5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a2a3a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1a2a3a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey={(v) => `${v.month} W${v.week}`} 
              tick={{ fontSize: 12 }} 
              tickMargin={8}
              interval={isMobile ? 2 : 0}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => `₹${value}`} 
              width={50}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [`₹${value}`, name.charAt(0).toUpperCase() + name.slice(1)]}
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: 'none' 
              }}
              labelFormatter={(label) => `Week: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              name="Total" 
              stroke="#1a2a3a" 
              strokeWidth={2}
              fillOpacity={0.2}
              fill="url(#colorTotal)" 
            />
            <Area 
              type="monotone" 
              dataKey="food" 
              name="Food" 
              stroke="#76bb76" 
              fill="url(#colorFood)" 
              strokeWidth={1.5}
              fillOpacity={1}
            />
            <Area 
              type="monotone" 
              dataKey="shopping" 
              name="Shopping" 
              stroke="#b39ddb" 
              fill="url(#colorShopping)" 
              strokeWidth={1.5}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
