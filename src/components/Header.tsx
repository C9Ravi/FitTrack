import { todaySummary } from "../data/fitnessData";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "activity", label: "Activity", icon: "👟" },
  { id: "workouts", label: "Workouts", icon: "🏋️" },
  { id: "exercises", label: "Exercises", icon: "💪" },
  { id: "heart", label: "Heart Rate", icon: "❤️" },
  { id: "progress", label: "Progress", icon: "📈" },
];
export default function Header({ activeTab, onTabChange }: Props) {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-violet-200">
              <span className="text-white text-lg">⚡</span>
            </div>
            <div>
              <p className="font-bold text-slate-800 leading-none text-base">FitTrack</p>
              <p className="text-xs text-slate-400 leading-none mt-0.5">Your fitness companion</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="hidden md:flex items-center gap-5 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-violet-500">👟</span>
              <span className="font-semibold text-slate-700">{todaySummary.steps.toLocaleString()}</span>
              <span className="text-slate-400">steps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400">🔥</span>
              <span className="font-semibold text-slate-700">{todaySummary.calories.toLocaleString()}</span>
              <span className="text-slate-400">kcal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400">❤️</span>
              <span className="font-semibold text-slate-700">{todaySummary.heartRate}</span>
              <span className="text-slate-400">bpm</span>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">Ravi</p>
              <p className="text-xs text-slate-400">Fitness Pro</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
              R
            </div>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="flex gap-1 pb-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
