import { captureScreenshot } from './ScreenshotService';

export class ActivityTracker {
  private tracking: boolean = false;
  private activityInterval: NodeJS.Timeout | null = null;
  private screenshotInterval: NodeJS.Timeout | null = null;

  startTracking() {
    this.tracking = true;
    this.startActivityMonitoring();
    this.startScreenshotCapture();
  }

  private startActivityMonitoring() {
    if (this.activityInterval) return;

    this.activityInterval = setInterval(() => {
      if (!this.tracking) return;

      const activity = {
        timestamp: new Date(),
        activeWindow: document.title,
        url: window.location.href,
        idle: !document.hasFocus(),
      };

      this.processActivity(activity);
    }, 30000); // Every 30 seconds
  }

  private startScreenshotCapture() {
    if (this.screenshotInterval) return;

    this.screenshotInterval = setInterval(async () => {
      if (!this.tracking) return;

      try {
        const screenshot = await captureScreenshot();
        await this.processScreenshot(screenshot);
      } catch (error) {
        console.error('Screenshot capture failed:', error);
      }
    }, 300000); // Every 5 minutes
  }

  private async processActivity(activity: any) {
    try {
      // Send activity data to server
      await fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });
    } catch (error) {
      console.error('Failed to process activity:', error);
    }
  }

  private async processScreenshot(screenshot: Blob) {
    try {
      const formData = new FormData();
      formData.append('screenshot', screenshot);

      await fetch('/api/screenshots', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Failed to process screenshot:', error);
    }
  }

  stopTracking() {
    this.tracking = false;
    
    if (this.activityInterval) {
      clearInterval(this.activityInterval);
      this.activityInterval = null;
    }
    
    if (this.screenshotInterval) {
      clearInterval(this.screenshotInterval);
      this.screenshotInterval = null;
    }
  }
}