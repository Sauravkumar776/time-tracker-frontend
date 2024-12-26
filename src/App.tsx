import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { AuthPage } from './pages/auth/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { TimeEntries } from './pages/TimeEntries';
import { Reports } from './pages/Reports';
import { Invoices } from './pages/Invoices';
import { Settings } from './pages/Settings';
import { Tasks } from './pages/Task';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route element={<AuthLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/time" element={<TimeEntries />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
