import React from 'react';
import { Clock, DollarSign, Briefcase, Users } from 'lucide-react';

interface QuickStatsProps {
  stats: {
    hoursTracked: number;
    earnings: number;
    activeProjects: number;
    teamMembers: number;
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Hours Tracked</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.hoursTracked}h
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Earnings</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${stats.earnings}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-50 rounded">
            <Briefcase className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Active Projects</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.activeProjects}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-orange-50 rounded">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Team Members</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.teamMembers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}