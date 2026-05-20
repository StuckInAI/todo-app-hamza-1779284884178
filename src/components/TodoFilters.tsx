import clsx from 'clsx';
import type { FilterType } from '@/types';

type TodoFiltersProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  completedCount: number;
  onClearCompleted: () => void;
};

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilters({ filter, onFilterChange, completedCount, onClearCompleted }: TodoFiltersProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              filter === f.value
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-gray-400 hover:text-rose-500 transition-colors font-medium"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
