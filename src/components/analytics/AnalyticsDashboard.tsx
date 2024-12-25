import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { DateRangeSelector } from './DateRangeSelector';
import { ProductivityOverview } from './ProductivityOverview';
import { ProjectBreakdown } from './ProjectBreakdown';
import { TimeDistribution } from './TimeDistribution';
import { ReportActions } from './ReportActions';
import { TeamAnalytics } from './TeamAnalytics';

export function AnalyticsDashboard() {
  const analytics = useAnalytics();

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <DateRangeSelector
          range={analytics.dateRange}
          onRangeChange={analytics.setDateRange}
          onSelectWeek={analytics.setWeeklyRange}
          onSelectMonth={analytics.setMonthlyRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductivityOverview stats={analytics.stats.productivity} />
        <TimeDistribution dailyStats={analytics.stats.daily} />
        <ProjectBreakdown projectStats={analytics.stats.projects} />
      </div>

      <TeamAnalytics />
      
      <ReportActions
        onGeneratePDF={analytics.generatePDFReport}
        onGenerateCSV={analytics.generateCSVReport}
      />
    </div>
  );
}