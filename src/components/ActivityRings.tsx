import { todaySummary } from "../data/fitnessData";

interface RingProps {
  radius: number;
  strokeWidth: number;
  progress: number; // 0-100
  color: string;
  bgColor: string;
  label: string;
  value: string;
  unit: string;
}

function Ring({ radius, strokeWidth, progress, color, bgColor, label, value, unit }: RingProps) {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const dash = (Math.min(progress, 100) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        <svg
          width={radius * 2}
          height={radius * 2}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ transform: "none" }}
        >
          <span className="text-lg font-bold text-slate-800 leading-none">{value}</span>
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function ActivityRings() {
  const { steps, stepGoal, calories, calorieGoal, activeMinutes, activeMinuteGoal } = todaySummary;

  const stepsProgress = Math.round((steps / stepGoal) * 100);
  const calProgress = Math.round((calories / calorieGoal) * 100);
  const activeProgress = Math.round((activeMinutes / activeMinuteGoal) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Today's Goals</h2>
          <p className="text-sm text-slate-400">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          🔥 Great day!
        </div>
      </div>

      <div className="flex justify-around items-center py-2">
        <Ring
          radius={52}
          strokeWidth={10}
          progress={stepsProgress}
          color="#7c3aed"
          bgColor="#ede9fe"
          label="Steps"
          value={`${Math.round(steps / 1000 * 10) / 10}k`}
          unit={`/ ${stepGoal / 1000}k`}
        />
        <Ring
          radius={52}
          strokeWidth={10}
          progress={calProgress}
          color="#fb923c"
          bgColor="#ffedd5"
          label="Calories"
          value={calories.toLocaleString()}
          unit={`/ ${calorieGoal}`}
        />
        <Ring
          radius={52}
          strokeWidth={10}
          progress={activeProgress}
          color="#22c55e"
          bgColor="#dcfce7"
          label="Active Min"
          value={String(activeMinutes)}
          unit={`/ ${activeMinuteGoal}`}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-sm font-bold text-violet-600">{stepsProgress}%</p>
          <p className="text-xs text-slate-400">Steps goal</p>
        </div>
        <div className="border-x border-slate-100">
          <p className="text-sm font-bold text-orange-500">{calProgress}%</p>
          <p className="text-xs text-slate-400">Calorie goal</p>
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-500">{activeProgress}%</p>
          <p className="text-xs text-slate-400">Active goal</p>
        </div>
      </div>
    </div>
  );
}
