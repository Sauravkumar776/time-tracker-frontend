import React from "react";
import { Project } from "../../types";
import { NotebookPen, UserRound, FolderOpenDot } from "lucide-react";

export function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [status, setStatus] = React.useState<string>(project.status || "Not Started");
  const [members, setMembers] = React.useState<string[]>(project.members || []);
  const [tasks, setTasks] = React.useState<{ name: string; status: string }[]>(
    project.tasks || [{ name: "App Integration", status: "In Progress" }, { name: "Esp Integration", status: "In Progress" }]
  );
  const [newMember, setNewMember] = React.useState("");
  const [newTask, setNewTask] = React.useState("");

  const addMember = () => {
    if (newMember.trim()) {
      setMembers((prev) => [...prev, newMember]);
      setNewMember("");
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks((prev) => [...prev, { name: newTask, status: "Pending" }]);
      setNewTask("");
    }
  };

  const updateTaskStatus = (index: number, status: string) => {
    setTasks((prev) =>
      prev.map((task, idx) => (idx === index ? { ...task, status } : task))
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl w-full space-y-6">
        {/* Close Button */}
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <header className="text-center border-b pb-6">
  <div className="flex justify-center items-center mb-4 space-x-3">
    <FolderOpenDot className="text-blue-500 w-8 h-8" />
    <h2 className="text-4xl font-extrabold text-gray-800">{project.name}</h2>
  </div>
  <p className="text-gray-600 text-lg mb-6">{project.description}</p>
  <div className="flex flex-col items-center mt-4">
    <label className="block text-black font-medium text-base mb-2">
      Project Status
    </label>
    <select
      className="p-3 border rounded-lg w-64 focus:ring-1 focus:ring-blue-400 text-gray-700"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
</header>


        {/* Content */}
        <div className="space-y-8">
          {/* Team Members */}
          <section className="bg-gray-50 p-5 rounded-lg shadow-sm space-y-4">
            <div className="text-xl flex font-semibold text-gray-700"> <UserRound/> <div className="mx-2">Team Members</div></div>
            <div className="space-y-2">
              {members.length > 0 ? (
                members.map((member, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                      {member.charAt(0)}
                    </div>
                    <span className="text-gray-700 text-lg">{member}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No team members yet.</p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <input
                type="text"
                placeholder="Add member"
                className="p-3 border rounded-lg flex-1 focus:ring-2 focus:ring-blue-400"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <button
                className="px-5 py-3 flex bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                onClick={addMember}
              >
                <UserRound />
                <div className="mx-2">Add</div>
              </button>
            </div>
          </section>

          {/* Tasks */}
          <section className="bg-gray-50 p-5 rounded-lg shadow-sm space-y-4">
            <div className="text-xl flex font-semibold text-gray-700"> <NotebookPen className=""/> <div className="mx-1">Tasks</div></div>
            <div className="space-y-3">
              {tasks.length > 0 ? (
                tasks.map((task, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <p className="text-gray-700 text-lg">{task.name}</p>
                      <p className="text-gray-500 text-sm">{`Status: ${task.status}`}</p>
                    </div>
                    <select
                      className="p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                      value={task.status}
                      onChange={(e) => updateTaskStatus(idx, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No tasks yet.</p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <input
                type="text"
                placeholder="Add task"
                className="p-3 border rounded-lg flex-1 focus:ring-2 focus:ring-green-400"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                className="px-5 flex py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                onClick={addTask}
              >
                <NotebookPen />
               <div className="mx-2"> Add</div>
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-6 flex justify-end">
          <button
            className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
