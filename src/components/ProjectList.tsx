import React from "react";
import { Briefcase, Plus } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { Project } from "../types";

export function ProjectList() {
  const { projects, createProject, isLoading, error } = useProjects();
  const [isAdding, setIsAdding] = React.useState(false);
  const [newProject, setNewProject] = React.useState({
    name: "",
    client: "",
    hourlyRate: 0,
    budget: 0,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({
        ...newProject,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        status: "active",
        startDate: new Date(),
      });
      setIsAdding(false);
      setNewProject({
        name: "",
        client: "",
        hourlyRate: 0,
        budget: 0,
        description: "",
      });
    } catch {
      console.log("Error in creating project");
    }
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

      {isLoading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!isLoading && projects.length === 0 && (
        <p>No projects found. Add one to get started!</p>
      )}

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
              type="text"
              placeholder="Description"
              className="p-2 border rounded"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Budget"
              className="p-2 border rounded"
              value={newProject.budget || ""}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  budget: parseFloat(e.target.value) || 0,
                })
              }
            />
            <input
              type="number"
              placeholder="Hourly hourlyRate"
              className="p-2 border rounded"
              value={newProject.hourlyRate || ""}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  hourlyRate: parseFloat(e.target.value) || 0,
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
<div className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow">
  <div className="flex justify-between mb-4">
    <div className="flex items-center gap-3">
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: project.color }}
      />
      <h3 style={{
        color: project.color
      }} className={`text-2xl font-semibold`}>{project.name} {project.color}</h3>
    </div>
    <div className={`text-lg ${project.status === 'completed' ? 'text-green-500' : project.status === 'active' ? 'text-blue-500' : 'text-gray-500'}`}>
      <p>{project.status}</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-x-8 mb-4">
    <div>
      <p className="font-bold text-gray-700">Client:</p>
      <p className="text-gray-600">{project.client}</p>
    </div>
    <div>
      <p className="font-bold text-gray-700">Hourly Rate:</p>
      <p className="text-gray-600">${project.hourlyRate.toFixed(2)}/hour</p>
    </div>
    <div>
      <p className="font-bold text-gray-700">Budget:</p>
      <p className="text-gray-600">${project.budget || 'Not Set'}</p>
    </div>
    <div>
      <p className="font-bold text-gray-700">Start Date:</p>
      <p className="text-gray-600">{new Date(project.startDate).toLocaleDateString()}</p>
    </div>
  </div>

  <hr/>

  <div>
    <p className="font-bold text-gray-700">Description:</p>
    <p className="text-gray-600">{project.description}</p>
  </div>
</div>

  );
}
