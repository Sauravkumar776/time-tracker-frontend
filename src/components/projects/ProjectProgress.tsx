import React from 'react';
import { Project } from '../../types';
import { useProjectProgress } from '../../hooks/useProjectProgress';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ProjectProgressProps {
  project: Project;
}

export function ProjectProgress({ project }: ProjectProgressProps) {
  const { progress, timeSpent, budget, status } = useProjectProgress(project.id);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{project.name}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          status === 'on_track' ? 'bg-green-100 text-green-800' :
          status === 'at_risk' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status === 'on_track' ? 'On Track' : 
           status === 'at_risk' ? 'At Risk' : 
           'Behind'}
        </span>
      </div>

      <div className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 rounded-full h-2" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Time and budget stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Time Spent</p>
              <p className="font-medium">{timeSpent} hours</p>
            </div>
          </div>
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Budget Used</p>
              <p className="font-medium">${budget.used} / ${budget.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}