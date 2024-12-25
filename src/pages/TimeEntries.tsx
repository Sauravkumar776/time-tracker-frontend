import React from 'react';
import { Clock } from 'lucide-react';
import { Timer } from '../components/Timer';
import { TimeEntryList } from '../components/TimeEntryList';

export function TimeEntries() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Clock className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold text-gray-900">Time Entries</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Timer />
        <TimeEntryList />
      </main>
    </div>
  );
}