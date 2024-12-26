import React from "react";
import { Calendar, DollarSign, Users, CheckCircle, Clock } from "lucide-react";
import { Project } from "../../types";
import { ProjectProgress } from "./ProjectProgress";

export function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow 
                 cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
          </div>
          <span className={`px-2 py-1 rounded-full text-sm font-medium
            ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
              project.status === 'active' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'}`}>
            {project.status}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        <ProjectProgress project={project} />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{project.members?.length || 0} members</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>${project.hourlyRate}/hr</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{project.tasks?.length || 0} tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
}