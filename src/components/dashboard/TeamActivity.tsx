import React from 'react';
import { useTeamAnalytics } from '../../hooks/useTeamAnalytics';
import { Clock, User } from 'lucide-react';

export function TeamActivity() {
  const { teamStats } = useTeamAnalytics();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Team Activity</h2>
      <div className="space-y-4">
        {teamStats.members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.currentTask || 'No active task'}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{member.weeklyHours.toFixed(1)}h this week</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}