import React from 'react';
import { Task } from '../../../types';
import { Clock, User, Calendar } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  index: number;
  onUpdate: (updates: Partial<Task>) => void;
}

export function TaskCard({ task, index, onUpdate }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <User className="w-4 h-4" />
              <span>{task.assigneeId}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedHours}h</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}