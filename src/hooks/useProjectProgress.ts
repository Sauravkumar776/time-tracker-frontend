import { useState, useEffect } from 'react';
import { useTimeStore } from '../store/timeStore';
import { useActivityTracking } from './useActivityTracking';

interface ProjectProgress {
  progress: number;
  timeSpent: number;
  budget: {
    used: number;
    total: number;
  };
  status: 'on_track' | 'at_risk' | 'behind';
}

export function useProjectProgress(projectId: string) {
  const [progress, setProgress] = useState<ProjectProgress>({
    progress: 0,
    timeSpent: 0,
    budget: { used: 0, total: 0 },
    status: 'on_track'
  });

  const { timeEntries } = useTimeStore();
  const { getProjectActivity } = useActivityTracking();

  useEffect(() => {
    // Calculate project metrics
    const projectEntries = timeEntries.filter(entry => entry.projectId === projectId);
    const totalTime = projectEntries.reduce((acc, entry) => acc + (entry.duration || 0), 0) / 3600;
    const totalBudget = 10000; // This should come from project settings
    const budgetUsed = totalTime * 50; // Assuming $50/hour rate

    // Calculate progress based on activity and time
    const activity = getProjectActivity(projectId);
    const progressPercent = Math.min((budgetUsed / totalBudget) * 100, 100);

    // Determine project status
    let status: 'on_track' | 'at_risk' | 'behind' = 'on_track';
    if (budgetUsed > totalBudget * 0.9) {
      status = 'behind';
    } else if (budgetUsed > totalBudget * 0.7) {
      status = 'at_risk';
    }

    setProgress({
      progress: Math.round(progressPercent),
      timeSpent: Math.round(totalTime),
      budget: {
        used: Math.round(budgetUsed),
        total: totalBudget
      },
      status
    });
  }, [projectId, timeEntries]);

  return progress;
}