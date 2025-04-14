"use client";

import { CartesianGrid, Dot, Line, LineChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

type QuizData = {
  date: string;
  accuracy: number;
};

const QuizAccuracyChart = ({ quizData }: { quizData: QuizData[] }) => {
  const last10Attempts = quizData.slice(-10);

  const chartConfig = {
    accuracy: {
      label: "Accuracy",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  if (quizData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No participation yet
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={last10Attempts}
            margin={{ top: 24, left: 24, right: 24 }}
          >
            <CartesianGrid 
              vertical={false} 
              stroke="hsl(var(--muted))" 
              strokeDasharray="3 3"
            />
            <ChartTooltip
              cursor={{ 
                stroke: "hsl(var(--secondary))", 
                strokeWidth: 1,
                strokeDasharray: "4 4"
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border border-border rounded-lg shadow-sm p-3 space-y-1">
                      <p className="font-semibold text-primary">
                        {payload[0].payload.date}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <p className="text-sm">
                          Accuracy: <span className="font-medium">{payload[0].value}%</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              dataKey="accuracy"
              type="monotone"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              activeDot={{
                r: 6,
                fill: "hsl(var(--accent))",
                stroke: "hsl(var(--background))",
                strokeWidth: 2
              }}
              dot={({ payload, ...props }) => (
                <Dot
                  key={payload.date}
                  r={4}
                  cx={props.cx}
                  cy={props.cy}
                  fill="hsl(var(--foreground))"
                  stroke="hsl(var(--background))"
                  strokeWidth={1.5}
                />
              )}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default QuizAccuracyChart;