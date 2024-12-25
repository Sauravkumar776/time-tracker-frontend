import { useState, useEffect } from 'react';
import { ActivityTracker } from '../services/ActivityTracker';
import { useSocket } from './useSocket';

export function useActivityTracking() {
  const [activityData, setActivityData] = useState<Map<string, any>>(new Map());
  const socket = useSocket();
  
  useEffect(() => {
    const tracker = new ActivityTracker();
    
    // Start tracking
    tracker.startTracking();
    
    // Listen for activity updates
    socket?.on('activity:update', (data) => {
      setActivityData(new Map(activityData.set(data.projectId, data)));
    });
    
    return () => {
      tracker.stopTracking();
      socket?.off('activity:update');
    };
  }, []);

  const getProjectActivity = (projectId: string) => {
    return activityData.get(projectId) || {};
  };

  return { getProjectActivity };
}