import React from 'react';
import { TaskList } from '../components/projects/tasks/TaskList';
import { Briefcase } from 'lucide-react';

export function Tasks() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Briefcase className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold text-gray-900">Projects</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
      <TaskList tasks={[]} onTaskUpdate={() => {}} />
      </main>
    </div>
  );
}