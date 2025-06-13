import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, eachDayOfInterval, parseISO } from "date-fns";

const data = [
  { date: "Jun 5", value: 0 },
  { date: "Jun 6", value: 0 },
  { date: "Jun 7", value: 0 },
  { date: "Jun 11", value: 0 },
  { date: "Jun 12", value: 1 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyAreaChart({ visits }: any) {
  const formatData = () => {
    if (visits.length === 0) return [];

    const counts: Record<string, number> = {};

    visits.forEach((visit: any) => {
      const dateStr = format(visit.createdAt, "yyyy-MM-dd");
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    });

    const allDates = eachDayOfInterval({
      start: parseISO("2025-06-05"), // or new Date() - range
      end: new Date(), // or specific end date
    });

    // Step 3: Build full chart data with formatted date string
    const chartData = allDates.map((date) => {
      const isoDate = format(date, "yyyy-MM-dd");
      const label = format(date, "MMM d"); // Jun 5, etc.
      return {
        date: label,
        visits: counts[isoDate] || 0,
      };
    });
    return chartData;
  };

  const chartData = formatData();

  console.log(chartData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#007bff" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={(value) => (Number.isInteger(value) ? value : "")}
        />
        <Tooltip />
        <Area
          type="linear"
          dataKey="visits"
          stroke="#007bff"
          fillOpacity={1}
          fill="url(#colorFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
