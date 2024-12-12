import React from 'react';
import { TaskStatus } from '../types/task';
import { useTaskStore } from '../store/taskStore';
import { Search, Filter } from 'lucide-react';

export const TaskFilters = () => {
  const { statusFilter, setStatusFilter, searchQuery, setSearchQuery, tasks } = useTaskStore();

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            className="pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'All')}
          >
            <option value="All">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <span className="text-sm font-medium text-gray-600">Total Tasks: </span>
          <span className="text-sm font-bold text-gray-900">{tasks.length}</span>
        </div>
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-gray-600">{status}: </span>
            <span className="text-sm font-bold text-gray-900">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};