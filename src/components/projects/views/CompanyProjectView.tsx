import React from 'react';
import { Building2, Plus, Search, Users } from 'lucide-react';
import { useProjects } from '../../../hooks/useProjects';
import { ProjectCard } from '../ProjectCard';
import { NewProjectForm } from '../NewProjectForm';
import {useTeam}

export function CompanyProjectView() {
  const { projects, isLoading } = useProjects();
  const { teamMembers } = useTeam();
  const [showNewProject, setShowNewProject] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterByMember, setFilterByMember] = React.useState('');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMember = !filterByMember || project.members.includes(filterByMember);
    return matchesSearch && matchesMember;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="text-blue-500" />
          Company Projects
        </h2>
        <button
          onClick={() => setShowNewProject(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-64">
          <select
            className="w-full p-2 border rounded-lg"
            value={filterByMember}
            onChange={(e) => setFilterByMember(e.target.value)}
          >
            <option value="">All Team Members</option>
            {teamMembers.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {showNewProject && (
        <NewProjectForm
          onClose={() => setShowNewProject(false)}
          organizationType="company"
        />
      )}
    </div>
  );
}