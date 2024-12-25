import React from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  range: { start: Date; end: Date };
  onRangeChange: (range: { start: Date; end: Date }) => void;
  onSelectWeek: () => void;
  onSelectMonth: () => void;
}

export function DateRangeSelector({
  range,
  onRangeChange,
  onSelectWeek,
  onSelectMonth,
}: DateRangeSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow p-2">
        <Calendar className="text-gray-500" size={20} />
        <input
          type="date"
          value={format(range.start, 'yyyy-MM-dd')}
          onChange={(e) =>
            onRangeChange({
              ...range,
              start: new Date(e.target.value),
            })
          }
          className="border-none focus:ring-0"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={format(range.end, 'yyyy-MM-dd')}
          onChange={(e) =>
            onRangeChange({
              ...range,
              end: new Date(e.target.value),
            })
          }
          className="border-none focus:ring-0"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSelectWeek}
          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
        >
          This Week
        </button>
        <button
          onClick={onSelectMonth}
          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
        >
          This Month
        </button>
      </div>
    </div>
  );
}