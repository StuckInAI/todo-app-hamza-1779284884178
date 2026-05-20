import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg">
            <CheckSquare className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">My Todos</h1>
            <p className="text-sm text-gray-500">Stay organised, stay focused</p>
          </div>
        </div>

        {/* Stats */}
        <TodoStats activeCount={activeCount} completedCount={completedCount} />

        {/* Input */}
        <div className="mt-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filters */}
        <div className="mt-6">
          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* List */}
        <div className="mt-4">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </div>
    </div>
  );
}
