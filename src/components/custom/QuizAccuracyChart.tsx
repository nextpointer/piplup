"use client";

import {
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { PartcipationDetails } from "@/lib/types";
import { ParticipationData } from "@/app/store/atom";
import { getParticipationData } from "@/app/db/queries/select";

const QuizAccuracyChart = () => {
  const [PtData, setPtData] = useAtom<PartcipationDetails[] | undefined>(
    ParticipationData,
  );
  useEffect(() => {
    (async () => {
      try {
        const data = await getParticipationData();
        setPtData(data.data);
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    })();
  }, [setPtData]);

  const last10Attempts = PtData?.slice(-10);

  const chartConfig = {
    accuracy: {
      label: "Accuracy (%)",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  const formatDate = (date: Date | string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (PtData?.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No participation yet
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={last10Attempts}
            margin={{ top: 16, left: 16, right: 16, bottom: 16 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="hsl(var(--muted))"
              strokeDasharray="3 3"
            />
            <YAxis
              hide
              domain={[0, 100]}
              tickCount={6}
              tickFormatter={(value) => `${value}%`}
              width={40}
            />
            <ChartTooltip
              cursor={{
                stroke: "hsl(var(--secondary))",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border border-border rounded-lg shadow-sm p-3 space-y-1">
                      <p className="font-semibold text-primary">
                        {formatDate(payload[0].payload.created_At)}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <p className="text-sm">
                          Accuracy:{" "}
                          <span className="font-medium">
                            {payload[0].value}%
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              key="accuracy-line"
              dataKey="accuracy"
              type="monotone"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              activeDot={{
                r: 6,
                fill: "hsl(var(--accent))",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
              dot={({ payload, cx, cy }) => (
                <Dot
                  key={`dot-${payload.created_At}`}
                  r={4}
                  cx={cx}
                  cy={cy}
                  fill="hsl(var(--foreground))"
                  stroke="hsl(var(--background))"
                  strokeWidth={1.5}
                />
              )}
            />
          </LineChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
};

export default QuizAccuracyChart;
