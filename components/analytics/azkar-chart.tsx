'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnalyticsT, AnalyticsTypeT } from '@/lib/types/analytics';
import { useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

export const description = 'A line chart';

const chartConfig = {
  desktop: {
    label: 'Azkar',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function AzkarChart({ analytics }: { analytics: AnalyticsT }) {
  const [type, setType] = useState<AnalyticsTypeT>('day');

  const chartData = Object.keys(analytics)
    .filter((key) => key.slice(-5, -3) === '08')
    .map((key) => {
      return {
        day: key.slice(-2),
        azkar: analytics[key].finishedAzkar,
      };
    })
    .sort((a, b) => +a.day - +b.day);

  console.log(chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-base">
          <span>Recent Read Azkar</span>
          <Select value={type} onValueChange={(value) => setType(value as AnalyticsTypeT)}>
            <SelectTrigger className="h-min w-min rounded-full px-2 py-1 text-xs">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="!text-sm">
              <SelectGroup>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
        <CardDescription className="sr-only">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value}
              minTickGap={32}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="azkar"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
