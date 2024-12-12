import React, { useEffect, useRef } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { Task, TaskStatus } from '../types/task';
import { CheckCircle2, Circle, Timer, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { filterTasks } from '../utils/filterTasks';

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

export const TaskTable = () => {
  const { tasks, updateTask, deleteTask, searchQuery, statusFilter } = useTaskStore();
  const tableRef = useRef<any>(null);

  const filteredTasks = filterTasks(tasks, searchQuery, statusFilter);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'To Do':
        return Circle;
      case 'In Progress':
        return Timer;
      case 'Done':
        return CheckCircle2;
      default:
        return Circle;
    }
  };

  const columns = [
    { 
      title: 'ID', 
      field: 'id', 
      width: 70,
      headerSort: true 
    },
    { 
      title: 'Title', 
      field: 'title', 
      editor: 'input',
      headerSort: true,
      editorParams: {
        elementAttributes: {
          maxlength: '50',
        }
      },
      validator: ['required', 'string']
    },
    { 
      title: 'Description', 
      field: 'description',
      editor: 'input',
      headerSort: true,
      editorParams: {
        elementAttributes: {
          maxlength: '200',
        }
      }
    },
    { 
      title: 'Status', 
      field: 'status',
      editor: 'select',
      headerSort: true,
      editorParams: {
        values: statusOptions
      },
      formatter: (cell: any) => {
        const value = cell.getValue() as TaskStatus;
        const StatusIcon = getStatusIcon(value);
        let className = 'task-status ';
        
        switch (value) {
          case 'To Do':
            className += 'task-status-todo';
            break;
          case 'In Progress':
            className += 'task-status-progress';
            break;
          case 'Done':
            className += 'task-status-done';
            break;
        }
        
        return `<div class="${className}">
          ${StatusIcon({
            className: 'w-4 h-4',
            strokeWidth: 2.5
          }).outerHTML}
          ${value}
        </div>`;
      }
    },
    {
      title: 'Actions',
      formatter: () => `<button class="delete-btn">
        ${Trash2({
          className: 'w-5 h-5 text-red-500',
          strokeWidth: 2
        }).outerHTML}
      </button>`,
      width: 70,
      hozAlign: 'center',
      cellClick: (e: any, cell: any) => {
        if (e.target.closest('.delete-btn')) {
          deleteTask(cell.getRow().getData().id);
        }
      }
    }
  ];

  const options = {
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
    height: 500,
    pagination: 'local',
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 20, 50],
    movableColumns: true,
    placeholder: 'No Tasks Found'
  };

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.table.setData(filteredTasks);
    }
  }, [filteredTasks]);

  const cellEdited = (cell: any) => {
    const row = cell.getRow();
    const data = row.getData();
    updateTask(data.id, { [cell.getField()]: cell.getValue() });
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
      <ReactTabulator
        ref={tableRef}
        data={filteredTasks}
        columns={columns}
        options={options}
        events={{
          cellEdited: cellEdited,
        }}
        className="custom-tabulator"
      />
    </div>
  );
};