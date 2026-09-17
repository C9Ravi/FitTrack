export type WorkoutType = "Running" | "Cycling" | "Swimming" | "Yoga" | "Strength" | "HIIT" | "Walking";

export interface DailyStep {
  day: string;
  steps: number;
  goal: number;
}

export interface HourlyStep {
  hour: string;
  steps: number;
}

export interface CalorieData {
  day: string;
  active: number;
  resting: number;
}

export interface WorkoutEntry {
  id: number;
  type: WorkoutType;
  date: string;
  duration: number; // minutes
  calories: number;
  distance?: number; // km
  avgHR: number;
  maxHR: number;
  notes: string;
}

export interface HeartRateZone {
  zone: string;
  label: string;
  min: number;
  max: number;
  color: string;
  bgColor: string;
  minutes: number;
  percentage: number;
}

export interface WeeklyProgress {
  week: string;
  steps: number;
  calories: number;
  workouts: number;
  activeMinutes: number;
}

// --- Weekly Steps (last 7 days) ---
export const weeklySteps: DailyStep[] = [
  { day: "Mon", steps: 7420, goal: 10000 },
  { day: "Tue", steps: 11350, goal: 10000 },
  { day: "Wed", steps: 8900, goal: 10000 },
  { day: "Thu", steps: 13200, goal: 10000 },
  { day: "Fri", steps: 9650, goal: 10000 },
  { day: "Sat", steps: 15480, goal: 10000 },
  { day: "Sun", steps: 6100, goal: 10000 },
];

// --- Today's Hourly Steps ---
export const hourlySteps: HourlyStep[] = [
  { hour: "6am", steps: 320 },
  { hour: "7am", steps: 1450 },
  { hour: "8am", steps: 680 },
  { hour: "9am", steps: 420 },
  { hour: "10am", steps: 310 },
  { hour: "11am", steps: 890 },
  { hour: "12pm", steps: 1240 },
  { hour: "1pm", steps: 560 },
  { hour: "2pm", steps: 380 },
  { hour: "3pm", steps: 720 },
  { hour: "4pm", steps: 1100 },
  { hour: "5pm", steps: 2350 },
  { hour: "6pm", steps: 1480 },
  { hour: "7pm", steps: 900 },
  { hour: "8pm", steps: 310 },
];

// --- Calories Burned (last 7 days) ---
export const caloriesData: CalorieData[] = [
  { day: "Mon", active: 380, resting: 1820 },
  { day: "Tue", active: 620, resting: 1820 },
  { day: "Wed", active: 450, resting: 1820 },
  { day: "Thu", active: 780, resting: 1820 },
  { day: "Fri", active: 510, resting: 1820 },
  { day: "Sat", active: 920, resting: 1820 },
  { day: "Sun", active: 290, resting: 1820 },
];

// --- Workout History ---
export const workoutHistory: WorkoutEntry[] = [
  {
    id: 1,
    type: "Running",
    date: "2025-01-19",
    duration: 45,
    calories: 520,
    distance: 6.8,
    avgHR: 158,
    maxHR: 178,
    notes: "Morning run in the park, felt strong throughout.",
  },
  {
    id: 2,
    type: "Strength",
    date: "2025-01-18",
    duration: 60,
    calories: 410,
    avgHR: 132,
    maxHR: 155,
    notes: "Upper body day — bench, rows, and shoulder press.",
  },
  {
    id: 3,
    type: "Cycling",
    date: "2025-01-17",
    duration: 75,
    calories: 680,
    distance: 28.4,
    avgHR: 145,
    maxHR: 168,
    notes: "Outdoor trail ride. Hilly terrain, great endurance workout.",
  },
  {
    id: 4,
    type: "HIIT",
    date: "2025-01-16",
    duration: 30,
    calories: 480,
    avgHR: 172,
    maxHR: 192,
    notes: "Tabata intervals — 8 rounds, max effort.",
  },
  {
    id: 5,
    type: "Yoga",
    date: "2025-01-15",
    duration: 50,
    calories: 185,
    avgHR: 95,
    maxHR: 118,
    notes: "Yin yoga session. Deep stretches, very relaxing.",
  },
  {
    id: 6,
    type: "Swimming",
    date: "2025-01-14",
    duration: 40,
    calories: 390,
    distance: 1.6,
    avgHR: 138,
    maxHR: 162,
    notes: "Freestyle laps at the local pool.",
  },
  {
    id: 7,
    type: "Walking",
    date: "2025-01-13",
    duration: 60,
    calories: 220,
    distance: 5.2,
    avgHR: 105,
    maxHR: 128,
    notes: "Evening walk with the dog.",
  },
  {
    id: 8,
    type: "Running",
    date: "2025-01-12",
    duration: 55,
    calories: 610,
    distance: 8.1,
    avgHR: 162,
    maxHR: 182,
    notes: "Long run — tempo pace for the last 3 km.",
  },
  {
    id: 9,
    type: "Strength",
    date: "2025-01-11",
    duration: 65,
    calories: 440,
    avgHR: 128,
    maxHR: 152,
    notes: "Leg day — squats, deadlifts, lunges.",
  },
  {
    id: 10,
    type: "Cycling",
    date: "2025-01-10",
    duration: 45,
    calories: 420,
    distance: 18.2,
    avgHR: 140,
    maxHR: 165,
    notes: "Spin class at the gym. High cadence intervals.",
  },
];

// --- Heart Rate Zones (Today's Workout) ---
export const heartRateZones: HeartRateZone[] = [
  {
    zone: "Z1",
    label: "Rest",
    min: 50,
    max: 99,
    color: "#94a3b8",
    bgColor: "#f1f5f9",
    minutes: 8,
    percentage: 11,
  },
  {
    zone: "Z2",
    label: "Fat Burn",
    min: 100,
    max: 129,
    color: "#22c55e",
    bgColor: "#f0fdf4",
    minutes: 12,
    percentage: 16,
  },
  {
    zone: "Z3",
    label: "Aerobic",
    min: 130,
    max: 149,
    color: "#3b82f6",
    bgColor: "#eff6ff",
    minutes: 15,
    percentage: 21,
  },
  {
    zone: "Z4",
    label: "Threshold",
    min: 150,
    max: 169,
    color: "#f97316",
    bgColor: "#fff7ed",
    minutes: 28,
    percentage: 38,
  },
  {
    zone: "Z5",
    label: "Peak",
    min: 170,
    max: 195,
    color: "#ef4444",
    bgColor: "#fef2f2",
    minutes: 10,
    percentage: 14,
  },
];

// --- Weekly Progress (last 6 weeks) ---
export const weeklyProgress: WeeklyProgress[] = [
  { week: "Dec 9", steps: 52400, calories: 13200, workouts: 4, activeMinutes: 195 },
  { week: "Dec 16", steps: 61800, calories: 15400, workouts: 5, activeMinutes: 240 },
  { week: "Dec 23", steps: 44200, calories: 11800, workouts: 3, activeMinutes: 165 },
  { week: "Dec 30", steps: 58900, calories: 14600, workouts: 4, activeMinutes: 210 },
  { week: "Jan 6", steps: 67500, calories: 16800, workouts: 5, activeMinutes: 275 },
  { week: "Jan 13", steps: 72100, calories: 18200, workouts: 6, activeMinutes: 325 },
];

// --- Today's Summary ---

export const todaySummary = {
  steps: 8240,
  stepGoal: 10000,
  calories: 2140,
  calorieGoal: 2500,
  activeMinutes: 64,
  activeMinuteGoal: 90,
  heartRate: 68,
  distance: 6.1,
  workoutsThisWeek: 5,
};

export const workoutIcons: Record<WorkoutType, string> = {
  Running: "🏃",
  Cycling: "🚴",
  Swimming: "🏊",
  Yoga: "🧘",
  Strength: "🏋️",
  HIIT: "⚡",
  Walking: "🚶",
};

export const workoutColors: Record<WorkoutType, string> = {
  Running: "#f97316",
  Cycling: "#3b82f6",
  Swimming: "#06b6d4",
  Yoga: "#a855f7",
  Strength: "#ef4444",
  HIIT: "#eab308",
  Walking: "#22c55e",
};
