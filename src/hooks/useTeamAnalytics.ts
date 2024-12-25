import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';
import * as teamApi from '../lib/api/team';

interface TeamMember {
  id: string;
  name: string;
  currentTask?: string;
  weeklyHours: number;
}

interface TeamStats {
  utilizationRate: number;
  topPerformer: {
    name: string;
    hours: number;
  };
  goalsAchieved: number;
  totalGoals: number;
  members: TeamMember[];
}

export function useTeamAnalytics() {
  const [teamStats, setTeamStats] = useState<TeamStats>({
    utilizationRate: 0,
    topPerformer: { name: '', hours: 0 },
    goalsAchieved: 0,
    totalGoals: 0,
    members: [],
  });
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    loadTeamStats();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('team:stats_updated', (stats) => {
      setTeamStats(stats);
    });

    return () => {
      socket.off('team:stats_updated');
    };
  }, [socket]);

  const loadTeamStats = async () => {
    try {
      setLoading(true);
      const stats = await teamApi.getTeamStats();
      setTeamStats(stats);
    } catch (error) {
      console.error('Failed to load team stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return { teamStats, loading, refresh: loadTeamStats };
}