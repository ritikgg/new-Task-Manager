import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';
import toast from 'react-hot-toast';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  statusFilter: TaskStatus | 'All';
  searchQuery: string;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  setStatusFilter: (status: TaskStatus | 'All') => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,
  statusFilter: 'All',
  searchQuery: '',
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Math.max(0, ...state.tasks.map(t => t.id)) + 1 }]
    }));
    toast.success('Task added successfully');
  },
  
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    }));
    toast.success('Task updated successfully');
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }));
    toast.success('Task deleted successfully');
  },
  
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ isLoading: loading }),
}));