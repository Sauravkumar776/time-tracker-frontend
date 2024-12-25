import { TimeEntry, Project } from '../../types';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';

export class TimeAnalyticsService {
  calculateDailyStats(entries: TimeEntry[]): { [date: string]: number } {
    const stats: { [date: string]: number } = {};
    
    entries.forEach(entry => {
      const date = format(entry.startTime, 'yyyy-MM-dd');
      stats[date] = (stats[date] || 0) + (entry.duration || 0);
    });
    
    return stats;
  }

  calculateProjectStats(entries: TimeEntry[], projects: Project[]): ProjectStats[] {
    const stats = new Map<string, ProjectStats>();
    
    projects.forEach(project => {
      stats.set(project.id, {
        projectId: project.id,
        projectName: project.name,
        totalTime: 0,
        totalBillableAmount: 0,
        entryCount: 0,
      });
    });

    entries.forEach(entry => {
      const projectStats = stats.get(entry.projectId);
      if (!projectStats) return;

      const project = projects.find(p => p.id === entry.projectId);
      if (!project) return;

      projectStats.totalTime += entry.duration || 0;
      projectStats.entryCount += 1;
      if (entry.billable) {
        projectStats.totalBillableAmount += 
          ((entry.duration || 0) / 3600) * project.rate;
      }
    });

    return Array.from(stats.values());
  }

  calculateProductivityStats(entries: TimeEntry[]): ProductivityStats {
    const totalTime = entries.reduce((acc, entry) => acc + (entry.duration || 0), 0);
    const billableTime = entries
      .filter(entry => entry.billable)
      .reduce((acc, entry) => acc + (entry.duration || 0), 0);

    return {
      totalTime,
      billableTime,
      billablePercentage: totalTime > 0 ? (billableTime / totalTime) * 100 : 0,
      averageDailyHours: this.calculateAverageDailyHours(entries),
    };
  }

  private calculateAverageDailyHours(entries: TimeEntry[]): number {
    if (entries.length === 0) return 0;

    const dates = new Set(entries.map(entry => 
      format(entry.startTime, 'yyyy-MM-dd')
    ));

    const totalHours = entries.reduce((acc, entry) => 
      acc + ((entry.duration || 0) / 3600), 0
    );

    return totalHours / dates.size;
  }
}

interface ProjectStats {
  projectId: string;
  projectName: string;
  totalTime: number;
  totalBillableAmount: number;
  entryCount: number;
}

interface ProductivityStats {
  totalTime: number;
  billableTime: number;
  billablePercentage: number;
  averageDailyHours: number;
}