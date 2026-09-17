import { heartRateZones } from "../data/fitnessData";

export default function HeartRateZones() {
  const totalMinutes = heartRateZones.reduce((s, z) => s + z.minutes, 0);
  const dominantZone = heartRateZones.reduce((max, z) => z.minutes > max.minutes ? z : max);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Heart Rate Zones</h2>
          <p className="text-sm text-slate-400">Today's workout · {totalMinutes} min total</p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 text-red-500 px-3 py-1.5 rounded-full">
          <span className="text-base">❤️</span>
          <span className="font-bold text-sm">72 bpm</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Bar visualization */}
        <div className="flex-1 space-y-2.5">
          {heartRateZones.map((zone) => (
            <div key={zone.zone} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="font-bold text-xs px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: zone.bgColor, color: zone.color }}
                  >
                    {zone.zone}
                  </span>
                  <span className="text-slate-600 font-medium">{zone.label}</span>
                  <span className="text-slate-400">{zone.min}–{zone.max} bpm</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-700">{zone.minutes}m</span>
                  <span className="text-slate-400 ml-1">({zone.percentage}%)</span>
                </div>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${zone.percentage}%`, backgroundColor: zone.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary pills */}
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-xl font-bold text-slate-800">{totalMinutes}</p>
          <p className="text-xs text-slate-400">Total min</p>
        </div>
        <div className="text-center border-x border-slate-100">
          <p className="text-xl font-bold" style={{ color: dominantZone.color }}>
            {dominantZone.label}
          </p>
          <p className="text-xs text-slate-400">Dominant zone</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-slate-800">192</p>
          <p className="text-xs text-slate-400">Max HR (bpm)</p>
        </div>
      </div>
    </div>
  );
}
