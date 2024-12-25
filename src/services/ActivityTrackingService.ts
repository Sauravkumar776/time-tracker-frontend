import { ActivityData } from '../types';

class ActivityTracker {
  private activities: ActivityData[] = [];
  private syncInterval: NodeJS.Timeout | null = null;

  constructor(private readonly syncIntervalMs: number = 60000) {
    this.startSync();
  }

  trackActivity(data: ActivityData): void {
    this.activities.push({
      ...data,
      category: this.categorizeActivity(data),
    });
  }

  private categorizeActivity(data: ActivityData): 'productive' | 'neutral' | 'unproductive' {
    // Implement categorization logic based on URLs and applications
    const productivePatterns = [
      /github\.com/,
      /gitlab\.com/,
      /jira\./,
      /docs\.google\.com/,
    ];

    const unproductivePatterns = [
      /facebook\.com/,
      /twitter\.com/,
      /instagram\.com/,
      /reddit\.com/,
    ];

    if (productivePatterns.some(pattern => pattern.test(data.url))) {
      return 'productive';
    }

    if (unproductivePatterns.some(pattern => pattern.test(data.url))) {
      return 'unproductive';
    }

    return 'neutral';
  }

  private startSync(): void {
    this.syncInterval = setInterval(() => {
      this.syncActivities();
    }, this.syncIntervalMs);
  }

  private async syncActivities(): Promise<void> {
    if (this.activities.length === 0) return;

    try {
      const activitiesToSync = [...this.activities];
      this.activities = [];

      await this.uploadActivities(activitiesToSync);
    } catch (error) {
      console.error('Failed to sync activities:', error);
      // Restore activities to retry later
      this.activities.unshift(...this.activities);
    }
  }

  private async uploadActivities(activities: ActivityData[]): Promise<void> {
    // Implement API call to upload activities
    // This would typically be an API endpoint that stores the data
    // in your backend database
  }

  stop(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
}

export const activityTracker = new ActivityTracker();

export function trackActivity(data: ActivityData): void {
  activityTracker.trackActivity(data);
}