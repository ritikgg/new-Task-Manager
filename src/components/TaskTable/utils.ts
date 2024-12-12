import { TaskStatus } from '../../types/task';

export const getStatusClassName = (status: TaskStatus): string => {
  const baseClasses = 'px-2 py-1 rounded text-sm font-medium ';
  
  switch (status) {
    case 'To Do':
      return baseClasses + 'bg-yellow-100 text-yellow-800';
    case 'In Progress':
      return baseClasses + 'bg-blue-100 text-blue-800';
    case 'Done':
      return baseClasses + 'bg-green-100 text-green-800';
    default:
      return baseClasses + 'bg-gray-100 text-gray-800';
  }
};