import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { useProjects } from '../../../hooks/useProjects';
import { ProjectCard } from '../ProjectCard';
import { NewProjectForm } from '../NewProjectForm';

export function PersonalProjectView() {
  const { projects, isLoading } = useProjects();
  const [showNewProject, setShowNewProject] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="text-blue-500" />
          Personal Projects
        </h2>
        <button
          onClick={() => setShowNewProject(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {showNewProject && (
        <NewProjectForm
          onClose={() => setShowNewProject(false)}
          organizationType="personal"
        />
      )}
    </div>
  );
}