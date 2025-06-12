import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Jun 5", value: 0 },
  { date: "Jun 6", value: 0 },
  { date: "Jun 7", value: 0 },
  { date: "Jun 11", value: 0 },
  { date: "Jun 12", value: 1 },
];

export default function MyAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
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
          dataKey="value"
          stroke="#007bff"
          fillOpacity={1}
          fill="url(#colorFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
