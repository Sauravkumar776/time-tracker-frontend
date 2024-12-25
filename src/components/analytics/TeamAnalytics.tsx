import React from 'react';
import { useTeamAnalytics } from '../../hooks/useTeamAnalytics';
import { Users, Award, Target } from 'lucide-react';

export function TeamAnalytics() {
  const { teamStats, loading } = useTeamAnalytics();

  if (loading) {
    return <div>Loading team analytics...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Team Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Users size={20} />
            <span className="font-medium">Team Utilization</span>
          </div>
          <div className="text-2xl font-bold">
            {teamStats.utilizationRate.toFixed(1)}%
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Award size={20} />
            <span className="font-medium">Top Performer</span>
          </div>
          <div className="text-lg font-bold">{teamStats.topPerformer.name}</div>
          <div className="text-sm text-gray-600">
            {teamStats.topPerformer.hours.toFixed(1)} hours
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Target size={20} />
            <span className="font-medium">Team Goals</span>
          </div>
          <div className="text-lg font-bold">
            {teamStats.goalsAchieved} / {teamStats.totalGoals}
          </div>
          <div className="text-sm text-gray-600">goals achieved</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-4">Team Members Activity</h3>
        <div className="space-y-4">
          {teamStats.members.map(member => (
            <div key={member.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-gray-500">
                  {member.currentTask || 'No active task'}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {member.weeklyHours.toFixed(1)}h
                </div>
                <div className="text-sm text-gray-500">this week</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}