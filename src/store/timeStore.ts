import { create } from 'zustand';
import { Project, TimeEntry } from '../types';

interface TimeStore {
  projects: Project[];
  timeEntries: TimeEntry[];
  activeEntry: TimeEntry | null;
  addProject: (project: Project) => void;
  startTimer: (entry: Omit<TimeEntry, 'id' | 'endTime' | 'duration'>) => void;
  stopTimer: () => void;
  addTimeEntry: (entry: TimeEntry) => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  projects: [],
  timeEntries: [],
  activeEntry: null,

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  startTimer: (entry) =>
    set({
      activeEntry: {
        ...entry,
        id: crypto.randomUUID(),
        startTime: new Date(),
      },
    }),

  stopTimer: () =>
    set((state) => {
      if (!state.activeEntry) return state;

      const endTime = new Date();
      const duration =
        (endTime.getTime() - state.activeEntry.startTime.getTime()) / 1000;

      const completedEntry = {
        ...state.activeEntry,
        endTime,
        duration,
      };

      return {
        activeEntry: null,
        timeEntries: [...state.timeEntries, completedEntry],
      };
    }),

  addTimeEntry: (entry) =>
    set((state) => ({
      timeEntries: [...state.timeEntries, entry],
    })),
}));