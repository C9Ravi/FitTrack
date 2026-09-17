import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { weeklySteps, hourlySteps } from "../data/fitnessData";

type ViewMode = "weekly" | "hourly";

interface Props {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const CustomTooltipWeekly = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const steps = payload[0]?.value ?? 0;
    const goal = 10000;
    const pct = Math.round((steps / goal) * 100);
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        <p className="text-slate-600">
          <span className="font-bold text-violet-600">{steps.toLocaleString()}</span> steps
        </p>
        <p className="text-slate-400">{pct}% of goal</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipHourly = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        <p className="text-slate-600">
          <span className="font-bold text-violet-600">{payload[0]?.value?.toLocaleString()}</span> steps
        </p>
      </div>
    );
  }
  return null;
};

export default function StepChart({ view, onViewChange }: Props) {
  const totalToday = hourlySteps.reduce((sum, h) => sum + h.steps, 0);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Step Count</h2>
          <p className="text-sm text-slate-400">
            {view === "weekly" ? "Last 7 days" : `Today · ${totalToday.toLocaleString()} steps`}
          </p>
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {(["weekly", "hourly"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === v
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {v === "weekly" ? "Weekly" : "Today"}
            </button>
          ))}
        </div>
      </div>

      {view === "weekly" ? (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklySteps} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              domain={[0, 18000]}
            />
            <Tooltip content={<CustomTooltipWeekly />} cursor={{ fill: "#f8f7ff" }} />
            <ReferenceLine
              y={10000}
              stroke="#a78bfa"
              strokeDasharray="6 3"
              label={{ value: "Goal", position: "right", fontSize: 11, fill: "#a78bfa" }}
            />
            <Bar dataKey="steps" radius={[6, 6, 0, 0]}>
              {weeklySteps.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.steps >= entry.goal ? "#7c3aed" : "#c4b5fd"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={hourlySteps}>
            <defs>
              <linearGradient id="stepGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltipHourly />} />
            <Area
              type="monotone"
              dataKey="steps"
              stroke="#7c3aed"
              strokeWidth={2.5}
              fill="url(#stepGrad)"
              dot={{ fill: "#7c3aed", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#7c3aed" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {view === "weekly" && (
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-violet-700 inline-block" /> Goal reached
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-violet-300 inline-block" /> Below goal
          </span>
        </div>
      )}
    </div>
  );
}
