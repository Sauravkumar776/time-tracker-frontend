import { captureScreenshot } from './ScreenshotService';
import { trackActivity } from './ActivityTrackingService';
import { TimeEntry, ActivityData } from '../types';

export class TimeTrackingService {
  private timer: NodeJS.Timeout | null = null;
  private lastActiveTime: number = Date.now();
  private isTracking: boolean = false;

  constructor(
    private readonly idleThreshold: number = 300000, // 5 minutes
    private readonly screenshotInterval: number = 600000 // 10 minutes
  ) {}

  startTracking(entry: TimeEntry): void {
    this.isTracking = true;
    this.lastActiveTime = Date.now();
    
    // Start activity monitoring
    this.startActivityMonitoring();
    
    // Start screenshot capture
    this.startScreenshotCapture();
  }

  private startActivityMonitoring(): void {
    if (this.timer) return;

    this.timer = setInterval(() => {
      const currentTime = Date.now();
      const idleTime = currentTime - this.lastActiveTime;

      if (idleTime >= this.idleThreshold) {
        this.handleIdle();
      }

      // Track current activity
      const activityData = this.getCurrentActivity();
      trackActivity(activityData);
    }, 1000);
  }

  private startScreenshotCapture(): void {
    setInterval(async () => {
      if (!this.isTracking) return;
      
      try {
        const screenshot = await captureScreenshot();
        await this.processScreenshot(screenshot);
      } catch (error) {
        console.error('Screenshot capture failed:', error);
      }
    }, this.screenshotInterval);
  }

  private async processScreenshot(screenshot: Blob): Promise<void> {
    // Apply privacy blur
    const blurredScreenshot = await this.applyPrivacyBlur(screenshot);
    
    // Upload to cloud storage
    await this.uploadScreenshot(blurredScreenshot);
  }

  private getCurrentActivity(): ActivityData {
    // Implementation will vary based on platform (web/desktop)
    return {
      timestamp: new Date(),
      activeWindow: document.title,
      url: window.location.href,
      isActive: document.hasFocus(),
    };
  }

  private handleIdle(): void {
    if (!this.isTracking) return;

    // Emit idle event
    this.emit('idle', {
      lastActiveTime: this.lastActiveTime,
      idleTime: Date.now() - this.lastActiveTime,
    });
  }

  stopTracking(): void {
    this.isTracking = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  // Event handling
  private listeners: { [key: string]: Function[] } = {};

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  private emit(event: string, data: any): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}