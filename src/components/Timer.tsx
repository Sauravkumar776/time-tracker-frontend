import React from 'react';
import { Play, Square, Timer as TimerIcon } from 'lucide-react';
import { useTimeStore } from '../store/timeStore';
import { formatDuration } from '../utils/timeUtils';
import { ProjectSelect } from './ProjectSelect';

export function Timer() {
  const { activeEntry, projects, startTimer, stopTimer } = useTimeStore();
  const [description, setDescription] = React.useState('');
  const [selectedProjectId, setSelectedProjectId] = React.useState('');
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    if (!activeEntry) {
      setElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsed(
        (new Date().getTime() - activeEntry.startTime.getTime()) / 1000
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry]);

  const handleStart = () => {
    if (!selectedProjectId || !description) return;

    startTimer({
      projectId: selectedProjectId,
      description,
      billable: true,
      startTime: new Date(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-4">
        <TimerIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="What are you working on?"
          className="flex-1 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!!activeEntry}
        />
        <ProjectSelect
          value={selectedProjectId}
          onChange={setSelectedProjectId}
          disabled={!!activeEntry}
        />
        <div className="text-xl font-mono">
          {formatDuration(Math.floor(elapsed))}
        </div>
        {activeEntry ? (
          <button
            onClick={stopTimer}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Square size={20} />
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={!selectedProjectId || !description}
          >
            <Play size={20} />
          </button>
        )}
      </div>
    </div>
  );
}