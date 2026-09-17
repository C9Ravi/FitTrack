import { useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import StepChart from "./components/StepChart";
import CaloriesChart from "./components/CaloriesChart";
import WorkoutHistory from "./components/WorkoutHistory";
import HeartRateZones from "./components/HeartRateZones";
import WeeklyProgressChart from "./components/WeeklyProgress";
import ActivityRings from "./components/ActivityRings";
import { todaySummary } from "./data/fitnessData";

type StepView = "weekly" | "hourly";
type ProgressMetric = "steps" | "calories" | "workouts" | "activeMinutes";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
const [steps, setSteps] = useState(todaySummary.steps);
const [calories, setCalories] = useState(todaySummary.calories);
const [activeMinutes, setActiveMinutes] = useState(todaySummary.activeMinutes);
const [heartRate, setHeartRate] = useState(todaySummary.heartRate);
  const [stepView, setStepView] = useState<StepView>("weekly");
  const [progressMetric, setProgressMetric] = useState<ProgressMetric>("steps");
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const stepsProgress = Math.round((todaySummary.steps / todaySummary.stepGoal) * 100);
  const calProgress = Math.round((todaySummary.calories / todaySummary.calorieGoal) * 100);
  const activeProgress = Math.round((todaySummary.activeMinutes / todaySummary.activeMinuteGoal) * 100);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <>
            {/* Hero banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-lg shadow-violet-200">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-violet-200 text-sm font-medium">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <h1 className="text-3xl font-bold mt-1">Good morning, Ravi! 👋</h1>
                  <p className="text-violet-200 mt-1.5 text-sm max-w-md">
                    You're <span className="text-white font-bold">{stepsProgress}%</span> toward your step goal today.{" "}
                    {stepsProgress >= 80 ? "You're crushing it! Keep going 🚀" : "Let's get moving! 💪"}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { label: "Steps", value: todaySummary.steps.toLocaleString(), icon: "👟" },
                    { label: "Calories", value: `${todaySummary.calories}`, icon: "🔥" },
                    { label: "Distance", value: `${todaySummary.distance} km`, icon: "📍" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center bg-white/10 rounded-xl px-3 py-2.5 backdrop-blur-sm">
                      <p className="text-xl">{stat.icon}</p>
                      <p className="text-lg font-bold leading-none mt-1">{stat.value}</p>
                      <p className="text-violet-200 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Daily Steps"
                value={todaySummary.steps.toLocaleString()}
                subtitle={`Goal: ${todaySummary.stepGoal.toLocaleString()}`}
                icon={<span className="text-xl">👟</span>}
                color="#7c3aed"
                bgColor="#ede9fe"
                progress={stepsProgress}
                progressColor="#7c3aed"
                trend={{ value: "12%", positive: true }}
              />
              <StatCard
                title="Calories Burned"
                value={`${todaySummary.calories} kcal`}
                subtitle={`Goal: ${todaySummary.calorieGoal} kcal`}
                icon={<span className="text-xl">🔥</span>}
                color="#fb923c"
                bgColor="#ffedd5"
                progress={calProgress}
                progressColor="#fb923c"
                trend={{ value: "5%", positive: true }}
              />
              <StatCard
                title="Active Minutes"
                value={`${todaySummary.activeMinutes} min`}
                subtitle={`Goal: ${todaySummary.activeMinuteGoal} min`}
                icon={<span className="text-xl">⏱️</span>}
                color="#22c55e"
                bgColor="#dcfce7"
                progress={activeProgress}
                progressColor="#22c55e"
                trend={{ value: "8%", positive: true }}
              />
              <StatCard
                title="Heart Rate"
                value={`${todaySummary.heartRate} bpm`}
                subtitle="Resting · Healthy"
                icon={<span className="text-xl">❤️</span>}
                color="#ef4444"
                bgColor="#fee2e2"
                trend={{ value: "3%", positive: false }}
              />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <StepChart view={stepView} onViewChange={setStepView} />
              <ActivityRings />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CaloriesChart />
              <HeartRateZones />
            </div>
  {/* Today's Focus */}
<div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
  <h3 className="text-lg font-bold text-slate-800">
    Today's Focus
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

    {/* Steps */}
    <div className="bg-violet-50 rounded-xl p-4">
      <p className="text-sm text-slate-500">Steps</p>

      <p className="text-xl font-bold text-slate-800 mt-1">
        {steps.toLocaleString()}
      </p>

      <p className="text-xs text-violet-600 mt-1">
        Goal: {todaySummary.stepGoal.toLocaleString()}
      </p>
    </div>

    {/* Calories */}
    <div className="bg-orange-50 rounded-xl p-4">
      <p className="text-sm text-slate-500">Calories</p>

      <p className="text-xl font-bold text-slate-800 mt-1">
        {calories}
      </p>

      <p className="text-xs text-orange-600 mt-1">
        Goal: {todaySummary.calorieGoal}
      </p>
    </div>

    {/* Active Minutes */}
    <div className="bg-blue-50 rounded-xl p-4">
      <p className="text-sm text-slate-500">Active Minutes</p>

      <p className="text-xl font-bold text-slate-800 mt-1">
        {activeMinutes} min
      </p>

      <p className="text-xs text-blue-600 mt-1">
        Goal: {todaySummary.activeMinuteGoal} min
      </p>
    </div>

    {/* Workouts */}
    <div className="bg-green-50 rounded-xl p-4">
      <p className="text-sm text-slate-500">Workouts</p>

      <p className="text-xl font-bold text-slate-800 mt-1">
        {todaySummary.workoutsThisWeek}
      </p>

      <p className="text-xs text-green-600 mt-1">
        This week
      </p>
    </div>

{/* Update Activity */}
<div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mt-6">
  <h3 className="text-lg font-bold text-slate-800">
    Update Today's Activity
  </h3>

  <p className="text-sm text-slate-500 mt-1">
    Update your fitness stats and track your daily progress.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

    {/* Steps */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Steps
      </label>

      <input
        type="number"
        value={steps}
        onChange={(e) => setSteps(Number(e.target.value))}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>

    {/* Calories */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Calories
      </label>

      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>

    {/* Active Minutes */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Active Minutes
      </label>

      <input
        type="number"
        value={activeMinutes}
        onChange={(e) => setActiveMinutes(Number(e.target.value))}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>

    {/* Heart Rate */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Heart Rate
      </label>

      <input
        type="number"
        value={heartRate}
        onChange={(e) => setHeartRate(Number(e.target.value))}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>

  </div>
</div>

  </div>

  {/* Daily Step Goal */}
  <div className="mt-5">
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm font-medium text-slate-700">
        Daily Step Goal
      </p>

      <p className="text-sm font-bold text-violet-600">
        {Math.round(
          (steps / todaySummary.stepGoal) * 100
        )}%
      </p>
    </div>

    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-violet-600 rounded-full transition-all"
        style={{
          width: `${Math.min(
            (steps / todaySummary.stepGoal) * 100,
            100
          )}%`,
        }}
      />
    </div>
  </div>
</div>
          </>
          
        )}

        {/* ── ACTIVITY TAB ── */}
        {activeTab === "activity" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Daily Steps"
                value={todaySummary.steps.toLocaleString()}
                subtitle={`Goal: ${todaySummary.stepGoal.toLocaleString()}`}
                icon={<span className="text-xl">👟</span>}
                color="#7c3aed"
                bgColor="#ede9fe"
                progress={stepsProgress}
                progressColor="#7c3aed"
              />
              <StatCard
                title="Distance"
                value={`${todaySummary.distance} km`}
                subtitle="Today's total"
                icon={<span className="text-xl">📍</span>}
                color="#3b82f6"
                bgColor="#eff6ff"
              />
              <StatCard
                title="Active Minutes"
                value={`${todaySummary.activeMinutes} min`}
                subtitle={`Goal: ${todaySummary.activeMinuteGoal} min`}
                icon={<span className="text-xl">⏱️</span>}
                color="#22c55e"
                bgColor="#dcfce7"
                progress={activeProgress}
                progressColor="#22c55e"
              />
              <StatCard
                title="Workouts"
                value={`${todaySummary.workoutsThisWeek}`}
                subtitle="This week"
                icon={<span className="text-xl">🏋️</span>}
                color="#f97316"
                bgColor="#fff7ed"
              />
            </div>
            <StepChart view={stepView} onViewChange={setStepView} />
            <CaloriesChart />
            <ActivityRings />
          </div>
        )}

{/* ── EXERCISES TAB ── */}
{activeTab === "exercises" && (
  <div className="space-y-6">

    {/* Page Header */}
    <div>
      <h2 className="text-2xl font-bold text-slate-800">
        Exercise Library
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Explore exercises and build better workouts.
      </p>

      <input
        type="text"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 w-full max-w-md px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>

    {/* Exercise Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {[
        {
          name: "Bench Press",
          muscle: "Chest",
          difficulty: "Intermediate",
          icon: "🏋️",
        },
        {
          name: "Squats",
          muscle: "Legs",
          difficulty: "Intermediate",
          icon: "🦵",
        },
        {
          name: "Pull Ups",
          muscle: "Back",
          difficulty: "Advanced",
          icon: "💪",
        },
        {
          name: "Shoulder Press",
          muscle: "Shoulders",
          difficulty: "Intermediate",
          icon: "🏋️",
        },
        {
          name: "Bicep Curls",
          muscle: "Biceps",
          difficulty: "Beginner",
          icon: "💪",
        },
        {
          name: "Deadlift",
          muscle: "Full Body",
          difficulty: "Advanced",
          icon: "🔥",
        },
      ]
        .filter((exercise) =>
          exercise.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((exercise) => (
          <div
            key={exercise.name}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-4">
              {exercise.icon}
            </div>

            <h3 className="font-bold text-slate-800">
              {exercise.name}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {exercise.muscle}
            </p>

            <div className="mt-4 inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-medium">
              {exercise.difficulty}
            </div>
 <button
onClick={() => {
  setSelectedExercises((prev) =>
    prev.includes(exercise.name)
      ? prev
      : [...prev, exercise.name]
  );
}}
  className="mt-4 w-full py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition"
>
  + Add to Workout
</button>
          </div>
        ))}
    </div>
        {selectedExercises.length > 0 && (
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
<div className="flex items-center justify-between">
  <div>
    <h3 className="font-bold text-slate-800">
      My Workout
    </h3>
    <p className="text-sm text-slate-500 mt-1">
      {selectedExercises.length} exercise
      {selectedExercises.length !== 1 ? "s" : ""} added
    </p>
  </div>
</div>

        <div className="mt-3 space-y-2">
          {selectedExercises.map((exercise, index) => (
            <div
              key={`${exercise}-${index}`}
              className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl"
            >
              <span className="text-sm font-medium text-slate-700">
                {exercise}
              </span>

<button
  onClick={() => {
    setSelectedExercises((prev) =>
      prev.filter((item) => item !== exercise)
    );
  }}
  className="text-xs text-red-500 font-medium hover:text-red-700"
>
  Remove
</button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}        {/* ── WORKOUTS TAB ── */}
        {activeTab === "workouts" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Workouts"
                value="10"
                subtitle="This month"
                icon={<span className="text-xl">🏋️</span>}
                color="#7c3aed"
                bgColor="#ede9fe"
                trend={{ value: "25%", positive: true }}
              />
              <StatCard
                title="Avg Duration"
                value="52 min"
                subtitle="Per session"
                icon={<span className="text-xl">⏱️</span>}
                color="#3b82f6"
                bgColor="#eff6ff"
              />
              <StatCard
                title="Total Calories"
                value="4,455"
                subtitle="Burned in workouts"
                icon={<span className="text-xl">🔥</span>}
                color="#fb923c"
                bgColor="#ffedd5"
                trend={{ value: "18%", positive: true }}
              />
              <StatCard
                title="Total Distance"
                value="68.3 km"
                subtitle="Running, Cycling, Swimming"
                icon={<span className="text-xl">📍</span>}
                color="#22c55e"
                bgColor="#dcfce7"
              />
            </div>
            <WorkoutHistory />
          </div>
        )}

        {/* ── HEART RATE TAB ── */}
        {activeTab === "heart" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Resting HR"
                value="72 bpm"
                subtitle="Healthy range"
                icon={<span className="text-xl">❤️</span>}
                color="#ef4444"
                bgColor="#fee2e2"
                trend={{ value: "3 bpm", positive: false }}
              />
              <StatCard
                title="Avg Workout HR"
                value="145 bpm"
                subtitle="Zone 3–4 range"
                icon={<span className="text-xl">💓</span>}
                color="#f97316"
                bgColor="#fff7ed"
              />
              <StatCard
                title="Max HR Today"
                value="192 bpm"
                subtitle="Peak performance"
                icon={<span className="text-xl">🚨</span>}
                color="#dc2626"
                bgColor="#fef2f2"
              />
              <StatCard
                title="HRV Score"
                value="48 ms"
                subtitle="Good recovery"
                icon={<span className="text-xl">📊</span>}
                color="#8b5cf6"
                bgColor="#ede9fe"
                trend={{ value: "6%", positive: true }}
              />
            </div>
            <HeartRateZones />
          </div>
        )}

        {/* ── PROGRESS TAB ── */}
        {activeTab === "progress" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Weekly Steps"
                value="72,100"
                subtitle="Best week ever!"
                icon={<span className="text-xl">👟</span>}
                color="#7c3aed"
                bgColor="#ede9fe"
                trend={{ value: "6.8%", positive: true }}
              />
              <StatCard
                title="Weekly Calories"
                value="18,200"
                subtitle="Active + Resting"
                icon={<span className="text-xl">🔥</span>}
                color="#fb923c"
                bgColor="#ffedd5"
                trend={{ value: "8.3%", positive: true }}
              />
              <StatCard
                title="Weekly Workouts"
                value="6 sessions"
                subtitle="Most this month!"
                icon={<span className="text-xl">🏋️</span>}
                color="#22c55e"
                bgColor="#dcfce7"
                trend={{ value: "20%", positive: true }}
              />
              <StatCard
                title="Active Minutes"
                value="325 min"
                subtitle="WHO recommends 150+"
                icon={<span className="text-xl">⏱️</span>}
                color="#3b82f6"
                bgColor="#eff6ff"
                trend={{ value: "18%", positive: true }}
              />
            </div>
            <WeeklyProgressChart metric={progressMetric} onMetricChange={setProgressMetric} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <StepChart view="weekly" onViewChange={() => {}} />
              <CaloriesChart />
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-8 pb-6 text-center text-xs text-slate-400">
        <p>FitTrack · Powered by your dedication 💪 · Sample data for demonstration</p>
      </footer>
    </div>
  );
}
