import { useState, useEffect, useRef } from 'react';
import { TimeTrackingService } from '../services/TimeTrackingService';
import { useSocket } from './useSocket';
import { useTimeStore } from '../store/timeStore';
import * as timeEntriesApi from '../lib/api/timeEntries';
import { TimeEntry } from '../types';

export function useTimeTracking() {
  const socket = useSocket();
  const { activeEntry, startTimer, stopTimer } = useTimeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeTrackingService = useRef<TimeTrackingService | null>(null);

  useEffect(() => {
    timeTrackingService.current = new TimeTrackingService();

    // Handle idle detection
    timeTrackingService.current.on('idle', async (data) => {
      if (activeEntry) {
        await pauseTimer();
        // Show idle notification
        showIdleNotification(data.idleTime);
      }
    });

    return () => {
      if (timeTrackingService.current) {
        timeTrackingService.current.stopTracking();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('timer:started', (data) => {
      startTimer(data);
    });

    socket.on('timer:stopped', () => {
      stopTimer();
    });

    socket.on('timer:paused', (data) => {
      handleTimerPaused(data);
    });

    return () => {
      socket.off('timer:started');
      socket.off('timer:stopped');
      socket.off('timer:paused');
    };
  }, [socket, startTimer, stopTimer]);

  const start = async (data: { projectId: string; description: string }): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const entry = await timeEntriesApi.createTimeEntry({
        ...data,
        startTime: new Date(),
        billable: true,
      });

      startTimer(entry);
      timeTrackingService.current?.startTracking(entry);
      socket?.emit('timer:start', entry);
    } catch (err) {
      setError('Failed to start timer');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const stop = async (): Promise<void> => {
    if (!activeEntry) return;

    try {
      setIsLoading(true);
      setError(null);

      const endTime = new Date();
      const duration = (endTime.getTime() - activeEntry.startTime.getTime()) / 1000;

      await timeEntriesApi.updateTimeEntry(activeEntry.id, {
        endTime,
        duration,
      });

      stopTimer();
      timeTrackingService.current?.stopTracking();
      socket?.emit('timer:stop', activeEntry.id);
    } catch (err) {
      setError('Failed to stop timer');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const pause = async (): Promise<void> => {
    if (!activeEntry) return;

    try {
      setIsLoading(true);
      setError(null);

      const pauseTime = new Date();
      await timeEntriesApi.updateTimeEntry(activeEntry.id, {
        pauseTime,
      });

      socket?.emit('timer:pause', activeEntry.id);
      timeTrackingService.current?.stopTracking();
    } catch (err) {
      setError('Failed to pause timer');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resume = async (): Promise<void> => {
    if (!activeEntry) return;

    try {
      setIsLoading(true);
      setError(null);

      const resumeTime = new Date();
      await timeEntriesApi.updateTimeEntry(activeEntry.id, {
        resumeTime,
      });

      socket?.emit('timer:resume', activeEntry.id);
      timeTrackingService.current?.startTracking(activeEntry);
    } catch (err) {
      setError('Failed to resume timer');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    start,
    stop,
    pause,
    resume,
  };
}