import React from 'react';
import { Briefcase, Plus } from 'lucide-react';
import { useTimeStore } from '../store/timeStore';
import { Project } from '../types';

export function ProjectList() {
  const { projects, addProject } = useTimeStore();
  const [isAdding, setIsAdding] = React.useState(false);
  const [newProject, setNewProject] = React.useState({
    name: '',
    client: '',
    rate: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      ...newProject,
      id: crypto.randomUUID(),
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    });
    setIsAdding(false);
    setNewProject({ name: '', client: '', rate: 0 });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Briefcase className="text-gray-500" />
          Projects
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Project Name"
              className="p-2 border rounded"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Client Name"
              className="p-2 border rounded"
              value={newProject.client}
              onChange={(e) =>
                setNewProject({ ...newProject, client: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Hourly Rate"
              className="p-2 border rounded"
              value={newProject.rate || ''}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  rate: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Project
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: project.color }}
        />
        <h3 className="font-semibold">{project.name}</h3>
      </div>
      <div className="text-sm text-gray-600">
        <p>Client: {project.client}</p>
        <p>Rate: ${project.rate}/hour</p>
      </div>
    </div>
  );
}