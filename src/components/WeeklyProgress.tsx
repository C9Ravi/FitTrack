import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { weeklyProgress } from "../data/fitnessData";

type Metric = "steps" | "calories" | "workouts" | "activeMinutes";

interface Props {
  metric: Metric;
  onMetricChange: (m: Metric) => void;
}

const metricConfig: Record<Metric, { label: string; color: string; unit: string; format: (v: number) => string }> = {
  steps: { label: "Steps", color: "#7c3aed", unit: "steps", format: (v) => v.toLocaleString() },
  calories: { label: "Calories", color: "#fb923c", unit: "kcal", format: (v) => v.toLocaleString() },
  workouts: { label: "Workouts", color: "#22c55e", unit: "sessions", format: (v) => String(v) },
  activeMinutes: { label: "Active Min", color: "#3b82f6", unit: "min", format: (v) => String(v) },
};

const CustomTooltip = ({ active, payload, label, metric }: any) => {
  if (active && payload && payload.length) {
    const cfg = metricConfig[metric as Metric];
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-700 mb-1">Week of {label}</p>
        <p style={{ color: cfg.color }}>
          <span className="font-bold">{cfg.format(payload[0]?.value)}</span> {cfg.unit}
        </p>
      </div>
    );
  }
  return null;
};

export default function WeeklyProgressChart({ metric, onMetricChange }: Props) {
  const cfg = metricConfig[metric];
  const latest = weeklyProgress[weeklyProgress.length - 1];
  const prev = weeklyProgress[weeklyProgress.length - 2];
  const change = (((latest[metric] - prev[metric]) / prev[metric]) * 100).toFixed(1);
  const positive = latest[metric] >= prev[metric];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Weekly Progress</h2>
          <p className="text-sm text-slate-400">6-week trend</p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
          }`}
        >
          {positive ? "▲" : "▼"} {Math.abs(Number(change))}% vs prev week
        </span>
      </div>

      {/* Metric selector */}
      <div className="flex gap-2 flex-wrap mb-4">
        {(Object.keys(metricConfig) as Metric[]).map((m) => (
          <button
            key={m}
            onClick={() => onMetricChange(m)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border"
            style={
              metric === m
                ? { backgroundColor: metricConfig[m].color, color: "#fff", borderColor: metricConfig[m].color }
                : { backgroundColor: "#f8fafc", color: "#64748b", borderColor: "#e2e8f0" }
            }
          >
            {metricConfig[m].label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={weeklyProgress}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => metric === "steps" || metric === "calories" ? `${(v / 1000).toFixed(0)}k` : String(v)}
          />
          <Tooltip content={<CustomTooltip metric={metric} />} />
          <Line
            type="monotone"
            dataKey={metric}
            stroke={cfg.color}
            strokeWidth={2.5}
            dot={{ fill: cfg.color, r: 4, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: cfg.color, stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Week summaries */}
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-lg font-bold text-slate-800">{cfg.format(latest[metric])}</p>
          <p className="text-xs text-slate-400">This week</p>
        </div>
        <div className="border-x border-slate-100">
          <p className="text-lg font-bold text-slate-800">
            {cfg.format(Math.round(weeklyProgress.reduce((s, w) => s + w[metric], 0) / weeklyProgress.length))}
          </p>
          <p className="text-xs text-slate-400">6-wk average</p>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-800">
            {cfg.format(Math.max(...weeklyProgress.map((w) => w[metric])))}
          </p>
          <p className="text-xs text-slate-400">Best week</p>
        </div>
      </div>
    </div>
  );
}
