import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { formatDuration } from '../../utils/timeUtils';

interface ProjectBreakdownProps {
  projectStats: Array<{
    projectId: string;
    projectName: string;
    totalTime: number;
    totalBillableAmount: number;
    entryCount: number;
  }>;
}

export function ProjectBreakdown({ projectStats }: ProjectBreakdownProps) {
  const chartData = {
    labels: projectStats.map(stat => stat.projectName),
    datasets: [
      {
        data: projectStats.map(stat => stat.totalTime / 3600),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(139, 92, 246, 0.5)',
          'rgba(251, 146, 60, 0.5)',
          'rgba(236, 72, 153, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Project Time Distribution',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Doughnut data={chartData} options={options} />
      
      <div className="mt-6 space-y-4">
        {projectStats.map(stat => (
          <div key={stat.projectId} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{stat.projectName}</div>
              <div className="text-sm text-gray-500">
                {stat.entryCount} entries
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">
                {formatDuration(stat.totalTime)}
              </div>
              <div className="text-sm text-gray-500">
                ${stat.totalBillableAmount.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}