import React from 'react';
import { Bar } from 'react-chartjs-2';
import { format, eachDayOfInterval } from 'date-fns';

interface TimeDistributionProps {
  dailyStats: { [date: string]: number };
}

export function TimeDistribution({ dailyStats }: TimeDistributionProps) {
  const chartData = {
    labels: Object.keys(dailyStats).map(date => 
      format(new Date(date), 'MMM d')
    ),
    datasets: [
      {
        label: 'Hours Worked',
        data: Object.values(dailyStats).map(seconds => seconds / 3600),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Time Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Bar data={chartData} options={options} />
    </div>
  );
}