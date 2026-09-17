import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { caloriesData } from "../data/fitnessData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const active_ = payload.find((p: any) => p.dataKey === "active")?.value ?? 0;
    const resting = payload.find((p: any) => p.dataKey === "resting")?.value ?? 0;
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-700 mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />
            <span className="text-slate-500">Active:</span>
            <span className="font-bold text-orange-500">{active_.toLocaleString()} kcal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
            <span className="text-slate-500">Resting:</span>
            <span className="font-bold text-slate-600">{resting.toLocaleString()} kcal</span>
          </div>
          <div className="border-t border-slate-100 pt-1 mt-1">
            <span className="text-slate-500">Total:</span>
            <span className="font-bold text-slate-700 ml-1">{(active_ + resting).toLocaleString()} kcal</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CaloriesChart() {
  const totalActive = caloriesData.reduce((s, d) => s + d.active, 0);
  const avgActive = Math.round(totalActive / caloriesData.length);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Calories Burned</h2>
          <p className="text-sm text-slate-400">Avg. active: {avgActive} kcal/day</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-orange-500">{totalActive.toLocaleString()}</p>
          <p className="text-xs text-slate-400">active kcal this week</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={caloriesData} barCategoryGap="30%" stackOffset="none">
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
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            domain={[0, 3000]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fff7ed" }} />
          <Bar dataKey="resting" stackId="a" fill="#e2e8f0" name="Resting" radius={[0, 0, 0, 0]} />
          <Bar dataKey="active" stackId="a" fill="#fb923c" name="Active" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-orange-400 inline-block" /> Active calories
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" /> Resting metabolism
        </span>
      </div>
    </div>
  );
}
