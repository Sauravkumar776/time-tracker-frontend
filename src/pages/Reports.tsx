import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTimeStore } from '../store/timeStore';
import { format, startOfWeek, endOfWeek } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Reports() {
  const { timeEntries, projects } = useTimeStore();
  const [dateRange, setDateRange] = React.useState({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });

  const chartData = {
    labels: projects.map((p) => p.name),
    datasets: [
      {
        label: 'Hours Worked',
        data: projects.map((project) => {
          const projectEntries = timeEntries.filter(
            (entry) =>
              entry.projectId === project.id &&
              entry.duration &&
              new Date(entry.startTime) >= dateRange.start &&
              new Date(entry.startTime) <= dateRange.end
          );
          return projectEntries.reduce((acc, entry) => acc + (entry.duration || 0), 0) / 3600;
        }),
        backgroundColor: projects.map((p) => p.color),
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Time Reports</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Project Overview</h2>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'Hours Worked by Project',
              },
            },
          }}
        />
      </div>
    </div>
  );
}