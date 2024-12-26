import React from 'react';
import { Task, User } from '../../../types';
import { Calendar, Clock } from 'lucide-react';

interface NewTaskFormProps {
  projectId: string;
  members: User[];
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

export function NewTaskForm({ projectId, members, onSubmit, onCancel }: NewTaskFormProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    assigneeId: '',
    estimatedHours: 0,
    dueDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignee = members.find(m => m.id === formData.assigneeId);
    
    onSubmit({
      id: crypto.randomUUID(),
      projectId,
      title: formData.title,
      description: formData.description,
      assigneeId: formData.assigneeId,
    //   assigneeName: assignee?.firstName || '',
      status: 'todo',
      estimatedHours: formData.estimatedHours,
      dueDate: new Date(formData.dueDate),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={3}
              className="w-full p-2 border rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <select
              required
              className="w-full p-2 border rounded-lg"
              value={formData.assigneeId}
              onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
            >
              <option value="">Select team member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="inline-block w-4 h-4 mr-1" />
                Estimated Hours
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.5"
                className="w-full p-2 border rounded-lg"
                value={formData.estimatedHours}
                onChange={(e) => setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Due Date
              </label>
              <input
                type="date"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}