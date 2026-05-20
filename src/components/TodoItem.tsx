import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityDot: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleEditCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') handleEditCancel();
  }

  return (
    <li
      className={clsx(
        'group flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border shadow-sm transition-all',
        todo.completed ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-indigo-200 hover:shadow-md'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-gray-300 hover:border-indigo-400'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Priority dot */}
      <span
        className={clsx('w-2 h-2 rounded-full flex-shrink-0', priorityDot[todo.priority])}
        title={`${todo.priority} priority`}
      />

      {/* Text or Edit Input */}
      {editing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm text-gray-800 bg-gray-50 border border-indigo-300 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-100"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm',
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              onClick={handleEditSave}
              className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors"
              aria-label="Save edit"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleEditCancel}
              className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center transition-colors"
              aria-label="Cancel edit"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setEditing(true); setEditText(todo.text); }}
              className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-indigo-50 text-gray-400 hover:text-indigo-500 flex items-center justify-center transition-colors"
              aria-label="Edit todo"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-500 flex items-center justify-center transition-colors"
              aria-label="Delete todo"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
