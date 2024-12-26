import React from "react";
import { Briefcase, Plus, Search } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { ProjectFilters } from "./ProjectFilters";
import { NewProjectForm } from "./NewProjectForm";
import { Project } from "../../types";

export function ProjectList() {
  const { projects, createProject, isLoading, error } = useProjects();
  const [isAdding, setIsAdding] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const filteredProjects = React.useMemo(() => {
    return projects
      .filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(project => filter === "all" ? true : project.status === filter);
  }, [projects, searchTerm, filter]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="text-blue-500" />
          Projects
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ProjectFilters currentFilter={filter} onFilterChange={setFilter} />
      </div>

      {/* Project Grid */}
      {isLoading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No projects found. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {isAdding && (
        <NewProjectForm
          onSubmit={createProject}
          onClose={() => setIsAdding(false)}
        />
      )}

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}