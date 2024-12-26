import React from "react";

interface ProjectFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectFilters({ currentFilter, onFilterChange }: ProjectFiltersProps) {
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "archived", label: "Archived" },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${currentFilter === filter.id
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}