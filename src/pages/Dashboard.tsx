import React from 'react';
import { QuickStats } from '../components/dashboard/QuickStats';
import { DashboardMetrics } from '../components/dashboard/DashboardMetrics';
import { TeamActivity } from '../components/dashboard/TeamActivity';
import { useRoleAccess } from '../hooks/useRoleAccess';
import { useTimeStore } from '../store/timeStore';
import { useAuthStore } from '../store/authStore';

export function Dashboard() {
  const { hasPermission } = useRoleAccess();
  const { timeEntries, projects } = useTimeStore();
  const user = useAuthStore(state => state.user);

  const stats = React.useMemo(() => {
    const totalHours = timeEntries.reduce((acc, entry) => acc + (entry.duration || 0), 0) / 3600;
    const billableAmount = timeEntries.reduce((acc, entry) => {
      if (!entry.billable) return acc;
      const project = projects.find(p => p.id === entry.projectId);
      return acc + ((entry.duration || 0) / 3600) * (project?.hourlyRate || 0);
    }, 0);

    return {
      hoursTracked: Math.round(totalHours),
      earnings: Math.round(billableAmount),
      activeProjects: projects.filter(p => p.status === 'active').length,
      teamMembers: 12 // This should come from team data
    };
  }, [timeEntries, projects]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}</h1>
      </div>

      <QuickStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardMetrics />
        {hasPermission('manage_team') && <TeamActivity />}
      </div>
    </div>
  );
}