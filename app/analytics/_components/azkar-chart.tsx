'use client';

import { Speech } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceArea, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
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
import type { AnalyticsT, AnalyticsTypeT } from '@/lib/types/analytics';
import {
  getDayName,
  getLast7Days,
  getLast7Months,
  getLast7Weeks,
  getMonthName,
  getOrdinalSuffix,
} from '@/lib/utils/analytics';

export const description = 'A monotone area chart';

const last7Days = getLast7Days();
const last7Weeks = getLast7Weeks();
const last7Months = getLast7Months();
const chartConfig = {
  azkar: {
    label: 'Azkar',
    icon: Speech,
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function AzkarChart({ analytics }: { analytics: AnalyticsT }) {
  const [type, setType] = useState<AnalyticsTypeT>('day');

  const dayChartData = last7Days.map((day) => ({
    day: getDayName(new Date(day).getDay().toString()),
    azkar: analytics.find((a) => a.date === day)?.finishedAzkar || 0,
  }));

  const weekChartData = last7Weeks.map((w, idx) => {
    const today = new Date();
    const startDate = new Date(last7Weeks[idx]);
    const isThisWeek = idx + 1 === last7Weeks.length;
    const endDate = !isThisWeek ? new Date(last7Weeks[idx + 1]) : today;

    return {
      week: getOrdinalSuffix(+w.slice(-2)),
      azkar: analytics
        .filter((item) => {
          const itemDate = new Date(item.date);
          if (isThisWeek) {
            return itemDate >= startDate && itemDate <= endDate;
          }
          return itemDate >= startDate && itemDate < endDate;
        })
        .reduce((acc, cur) => acc + (cur.finishedAzkar || 0), 0),
    };
  });

  const monthChartData = last7Months.map((month) => {
    const azkar = analytics
      .filter((a) => a.date.slice(5, 7) === month)
      .reduce((acc, cur) => acc + (cur.finishedAzkar || 0), 0);

    return {
      month: getMonthName(month),
      azkar,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <h2>Recent Azkar</h2>
          <Select value={type} onValueChange={(value) => setType(value as AnalyticsTypeT)}>
            <SelectTrigger className="h-min w-min rounded-full py-2 pr-2 pl-3 text-xs">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="text-sm!">
              <SelectGroup>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
        <CardDescription>Azkar completed in the last 7 {type}s</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={type === 'day' ? dayChartData : type === 'week' ? weekChartData : monthChartData}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={type}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              minTickGap={16}
            />
            <YAxis />
            <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="azkar"
              type="monotone"
              fill="var(--color-azkar)"
              fillOpacity={0.4}
              stroke="var(--color-azkar)"
            />

            <ReferenceArea x1={150} x2={180} y1={200} y2={300} stroke="red" strokeOpacity={0.3} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
