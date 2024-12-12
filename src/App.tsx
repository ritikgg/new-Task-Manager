import React, { useEffect } from 'react';
import { TaskTable } from './components/TaskTable/TaskTable';
import { TaskFilters } from './components/TaskFilters';
import { AddTaskForm } from './components/AddTaskForm';
import { useTaskStore } from './store/taskStore';
import { Toaster } from 'react-hot-toast';
import { ClipboardList } from 'lucide-react';

function App() {
  const { setTasks, setLoading } = useTaskStore();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        
        const mappedTasks = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: `Task ${task.id} description`,
          status: task.completed ? 'Done' : 'To Do'
        }));
        
        setTasks(mappedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, setLoading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: '!bg-white !shadow-lg !rounded-lg !px-4 !py-3',
          success: {
            icon: '✓',
            className: '!bg-green-50 !text-green-800 !border !border-green-200',
          },
          error: {
            icon: '✕',
            className: '!bg-red-50 !text-red-800 !border !border-red-200',
          },
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-lg">
            <ClipboardList className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <p className="text-gray-500 mt-1">Manage and track your tasks efficiently</p>
          </div>
        </div>
        <AddTaskForm />
        <TaskFilters />
        <TaskTable />
      </div>
    </div>
  );
}

export default App;