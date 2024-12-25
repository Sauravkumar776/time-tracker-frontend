export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: 'admin' | 'manager' | 'employee';
  hourlyRate?: number;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  managerId: string;
  members: string[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  rate: number;
  color: string;
  teamId: string;
  status: 'active' | 'completed' | 'archived';
  startDate: Date;
  endDate?: Date;
  budget?: number;
}

export interface Task {
  id: string;
  projectId: string;
  assigneeId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: Date;
  estimatedHours: number;
}

export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  taskId?: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  billable: boolean;
  approved: boolean;
}

export interface Invoice {
  id: string;
  projectId: string;
  clientId: string;
  entries: TimeEntry[];
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid';
  date: Date;
  dueDate: Date;
  paymentUrl?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  billingAddress: string;
  paymentTerms: number;
}