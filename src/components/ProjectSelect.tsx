import React from 'react';
import { useTimeStore } from '../store/timeStore';

interface ProjectSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ProjectSelect({ value, onChange, disabled }: ProjectSelectProps) {
  const { projects } = useTimeStore();

  return (
    <select
      className="p-2 border rounded bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Select Project</option>
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>
  );
}