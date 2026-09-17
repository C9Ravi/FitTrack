import { useState } from "react";
import { workoutHistory, workoutIcons, workoutColors, WorkoutType } from "../data/fitnessData";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

const allTypes: WorkoutType[] = ["Running", "Cycling", "Swimming", "Yoga", "Strength", "HIIT", "Walking"];

export default function WorkoutHistory() {
  const [filter, setFilter] = useState<WorkoutType | "All">("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = filter === "All"
    ? workoutHistory
    : workoutHistory.filter((w) => w.type === filter);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Workout History</h2>
          <p className="text-sm text-slate-400">{workoutHistory.length} sessions logged</p>
        </div>
        <span className="text-xs bg-violet-50 text-violet-600 font-semibold px-2.5 py-1 rounded-full">
          This Month
        </span>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setFilter("All")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            filter === "All"
              ? "bg-slate-800 text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          All
        </button>
        {allTypes.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filter === t ? "text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
            style={filter === t ? { backgroundColor: workoutColors[t] } : {}}
          >
            {workoutIcons[t]} {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <p className="text-center text-slate-400 py-8 text-sm">No workouts found.</p>
        )}
        {filtered.map((workout) => (
          <div
            key={workout.id}
            className="border border-slate-100 rounded-xl overflow-hidden hover:border-slate-200 transition-all"
          >
            <button
              className="w-full text-left p-3.5 flex items-center gap-3"
              onClick={() => setExpanded(expanded === workout.id ? null : workout.id)}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ backgroundColor: workoutColors[workout.type] + "20" }}
              >
                {workoutIcons[workout.type]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 text-sm">{workout.type}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      backgroundColor: workoutColors[workout.type] + "20",
                      color: workoutColors[workout.type],
                    }}
                  >
                    {workout.duration} min
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{formatDate(workout.date)}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-right flex-shrink-0">
                <div>
                  <p className="text-sm font-bold text-slate-700">{workout.calories}</p>
                  <p className="text-xs text-slate-400">kcal</p>
                </div>
                {workout.distance && (
                  <div>
                    <p className="text-sm font-bold text-slate-700">{workout.distance}</p>
                    <p className="text-xs text-slate-400">km</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-slate-700">{workout.avgHR}</p>
                  <p className="text-xs text-slate-400">avg HR</p>
                </div>
                <span className="text-slate-300 text-lg ml-1">
                  {expanded === workout.id ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {/* Expanded details */}
            {expanded === workout.id && (
              <div className="px-4 pb-4 border-t border-slate-50 pt-3 bg-slate-50/50">
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="text-sm font-bold text-slate-700">{workout.duration} min</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Calories</p>
                    <p className="text-sm font-bold text-orange-500">{workout.calories} kcal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Avg HR</p>
                    <p className="text-sm font-bold text-red-500">{workout.avgHR} bpm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Max HR</p>
                    <p className="text-sm font-bold text-red-600">{workout.maxHR} bpm</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">"{workout.notes}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
