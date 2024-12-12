import { Task, TaskStatus } from '../types/task';

export const filterTasks = (
  tasks: Task[],
  searchQuery: string,
  statusFilter: TaskStatus | 'All'
): Task[] => {
  return tasks.filter((task) => {
    const matchesSearch = !searchQuery || (
      (task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       task.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
};