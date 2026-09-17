import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  progress?: number; // 0-100
  progressColor?: string;
  trend?: { value: string; positive: boolean };
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  bgColor,
  progress,
  progressColor,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend.positive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {trend.positive ? "▲" : "▼"} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {progress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Progress</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: progressColor || color,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
