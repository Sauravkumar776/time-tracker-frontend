import { TimeEntry, Project } from '../../types';
import { TimeAnalyticsService } from './TimeAnalyticsService';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import { formatDuration } from '../../utils/timeUtils';

export class ReportGeneratorService {
  private analytics: TimeAnalyticsService;

  constructor() {
    this.analytics = new TimeAnalyticsService();
  }

  async generatePDFReport(
    entries: TimeEntry[],
    projects: Project[],
    dateRange: { start: Date; end: Date }
  ): Promise<Blob> {
    const doc = new jsPDF();
    const projectStats = this.analytics.calculateProjectStats(entries, projects);
    const productivityStats = this.analytics.calculateProductivityStats(entries);

    // Header
    doc.setFontSize(20);
    doc.text('Time Tracking Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`${format(dateRange.start, 'MMM d, yyyy')} - ${format(dateRange.end, 'MMM d, yyyy')}`, 20, 30);

    // Summary
    doc.setFontSize(16);
    doc.text('Summary', 20, 45);
    doc.setFontSize(12);
    doc.text(`Total Hours: ${formatDuration(productivityStats.totalTime)}`, 20, 55);
    doc.text(`Billable Hours: ${formatDuration(productivityStats.billableTime)}`, 20, 65);
    doc.text(`Billable Percentage: ${productivityStats.billablePercentage.toFixed(1)}%`, 20, 75);

    // Project Breakdown
    doc.setFontSize(16);
    doc.text('Project Breakdown', 20, 95);
    doc.setFontSize(12);

    let y = 105;
    projectStats.forEach(stat => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.text(stat.projectName, 20, y);
      doc.text(`Hours: ${formatDuration(stat.totalTime)}`, 20, y + 7);
      doc.text(`Amount: $${stat.totalBillableAmount.toFixed(2)}`, 20, y + 14);
      y += 25;
    });

    return doc.output('blob');
  }

  generateCSVReport(
    entries: TimeEntry[],
    projects: Project[]
  ): string {
    const headers = [
      'Date',
      'Project',
      'Description',
      'Start Time',
      'End Time',
      'Duration (hours)',
      'Billable',
      'Amount',
    ].join(',');

    const rows = entries.map(entry => {
      const project = projects.find(p => p.id === entry.projectId);
      const amount = entry.billable && project 
        ? ((entry.duration || 0) / 3600) * project.rate 
        : 0;

      return [
        format(entry.startTime, 'yyyy-MM-dd'),
        project?.name || '',
        `"${entry.description}"`,
        format(entry.startTime, 'HH:mm:ss'),
        entry.endTime ? format(entry.endTime, 'HH:mm:ss') : '',
        ((entry.duration || 0) / 3600).toFixed(2),
        entry.billable ? 'Yes' : 'No',
        amount.toFixed(2),
      ].join(',');
    });

    return [headers, ...rows].join('\n');
  }
}