type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ activeCount, completedCount }: TodoStatsProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
            <p className="text-xs text-gray-400 mt-0.5">Remaining</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-2xl font-bold text-indigo-500">{completedCount}</p>
            <p className="text-xs text-gray-400 mt-0.5">Completed</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-2xl font-bold text-gray-600">{total}</p>
            <p className="text-xs text-gray-400 mt-0.5">Total</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{percent}%</p>
          <p className="text-xs text-gray-400 mt-0.5">Done</p>
        </div>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
