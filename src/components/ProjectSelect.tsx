import React from 'react';
import { useTimeStore } from '../store/timeStore';
import { useProjects } from '../hooks/useProjects';

interface ProjectSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ProjectSelect({ value, onChange, disabled }: ProjectSelectProps) {
  const { projects } = useProjects();

  return (
    <select
      className="p-2 border rounded bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Select Project</option>
      {projects.map((project) => (
        <option key={project._id} value={project._id}>
          {project.name}
        </option>
      ))}
    </select>
  );
}