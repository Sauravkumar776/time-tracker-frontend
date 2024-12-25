import { useState, useMemo } from 'react';
import { TimeAnalyticsService } from '../services/analytics/TimeAnalyticsService';
import { ReportGeneratorService } from '../services/analytics/ReportGeneratorService';
import { useTimeStore } from '../store/timeStore';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export function useAnalytics() {
  const { timeEntries, projects } = useTimeStore();
  const [dateRange, setDateRange] = useState(() => ({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  }));

  const analyticsService = useMemo(() => new TimeAnalyticsService(), []);
  const reportService = useMemo(() => new ReportGeneratorService(), []);

  const filteredEntries = useMemo(() => 
    timeEntries.filter(entry => 
      entry.startTime >= dateRange.start && 
      entry.startTime <= dateRange.end
    ),
    [timeEntries, dateRange]
  );

  const stats = useMemo(() => ({
    daily: analyticsService.calculateDailyStats(filteredEntries),
    projects: analyticsService.calculateProjectStats(filteredEntries, projects),
    productivity: analyticsService.calculateProductivityStats(filteredEntries),
  }), [filteredEntries, projects, analyticsService]);

  const generatePDFReport = async () => {
    return reportService.generatePDFReport(filteredEntries, projects, dateRange);
  };

  const generateCSVReport = () => {
    return reportService.generateCSVReport(filteredEntries, projects);
  };

  const setWeeklyRange = () => {
    setDateRange({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    });
  };

  const setMonthlyRange = () => {
    setDateRange({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
    });
  };

  return {
    stats,
    dateRange,
    setDateRange,
    setWeeklyRange,
    setMonthlyRange,
    generatePDFReport,
    generateCSVReport,
  };
}