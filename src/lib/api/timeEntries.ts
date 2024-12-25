import api from './client';
import { TimeEntry } from '../../types';

export async function getTimeEntries(): Promise<TimeEntry[]> {
  const response = await api.get<TimeEntry[]>('/time-entries');
  return response.data;
}

export async function createTimeEntry(entry: Omit<TimeEntry, 'id'>): Promise<TimeEntry> {
  const response = await api.post<TimeEntry>('/time-entries', entry);
  return response.data;
}

export async function updateTimeEntry(id: string, entry: Partial<TimeEntry>): Promise<TimeEntry> {
  const response = await api.put<TimeEntry>(`/time-entries/${id}`, entry);
  return response.data;
}

export async function deleteTimeEntry(id: string): Promise<void> {
  await api.delete(`/time-entries/${id}`);
}