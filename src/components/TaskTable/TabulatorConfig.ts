import { ColumnDefinition } from 'tabulator-tables';
import { Task, TaskStatus } from '../../types/task';
import { getStatusClassName } from './utils';

export const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

export const getTableColumns = (deleteTask: (id: number) => void): ColumnDefinition[] => [
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
      const className = getStatusClassName(value);
      return `<span class="${className}">${value}</span>`;
    }
  },
  {
    title: 'Actions',
    formatter: () => `
      <button class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600 hover:text-red-800">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    `,
    width: 70,
    hozAlign: 'center',
    cellClick: (e: any, cell: any) => {
      if (e.target.closest('.delete-btn')) {
        deleteTask(cell.getRow().getData().id);
      }
    }
  }
];