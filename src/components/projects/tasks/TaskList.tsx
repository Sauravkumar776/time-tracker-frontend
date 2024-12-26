import React from 'react';
import { Task } from '../../../types';
import { TaskCard } from './TaskCard';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    completed: tasks.filter(task => task.status === 'completed'),
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    onTaskUpdate(taskId, { status: newStatus });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-50 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {status.replace('_', ' ')}
                </h3>
                <div className="space-y-4">
                  {statusTasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      index={index}
                      onUpdate={(updates) => onTaskUpdate(task.id, updates)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}