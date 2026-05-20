import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'high', label: 'High', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
        />
        <button
          type="submit"
          className="w-11 h-11 rounded-xl bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white shadow transition-colors flex-shrink-0"
          aria-label="Add todo"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <span className="text-xs text-gray-400 self-center mr-1">Priority:</span>
        {priorities.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium border transition-all',
              p.color,
              priority === p.value ? 'ring-2 ring-offset-1 ring-indigo-400 scale-105' : 'opacity-60 hover:opacity-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
