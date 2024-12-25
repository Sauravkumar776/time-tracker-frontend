import React from 'react';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';
import { formatDuration } from '../../utils/timeUtils';

interface ProductivityOverviewProps {
  stats: {
    totalTime: number;
    billableTime: number;
    billablePercentage: number;
    averageDailyHours: number;
  };
}

export function ProductivityOverview({ stats }: ProductivityOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Productivity Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Clock size={20} />
            <span className="font-medium">Total Time</span>
          </div>
          <div className="text-2xl font-bold">{formatDuration(stats.totalTime)}</div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <DollarSign size={20} />
            <span className="font-medium">Billable Time</span>
          </div>
          <div className="text-2xl font-bold">{formatDuration(stats.billableTime)}</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <TrendingUp size={20} />
            <span className="font-medium">Billable %</span>
          </div>
          <div className="text-2xl font-bold">{stats.billablePercentage.toFixed(1)}%</div>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Clock size={20} />
            <span className="font-medium">Daily Avg</span>
          </div>
          <div className="text-2xl font-bold">{stats.averageDailyHours.toFixed(1)}h</div>
        </div>
      </div>
    </div>
  );
}