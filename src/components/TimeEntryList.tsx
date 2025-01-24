import React from "react";
import { Clock } from "lucide-react";
import { useTimeStore } from "../store/timeStore";
import { formatDuration } from "../utils/timeUtils";
import { useProjects } from "../hooks/useProjects";
import { format } from "date-fns";

export function TimeEntryList() {
  const { timeEntries } = useTimeStore();
  const { projects } = useProjects();

  const getProjectName = (projectId: string) => {
    return projects.find((p) => p._id === projectId)?.name || "Unknown Project";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <Clock className="text-gray-500" />
        Time Entries
      </h2>

      <div className="grid gap-4">
        {timeEntries.map((entry) => (
          <div
            key={entry.id}
            className="border rounded p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{entry.description}</h3>
                <p className="text-sm text-gray-600">
                  {getProjectName(entry.projectId)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono">
                  {entry.duration
                    ? formatDuration(entry.duration)
                    : "Running..."}
                </p>
                <p className="text-sm text-gray-600">
                  {format(entry.startTime, "MMM d, yyyy HH:mm")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
