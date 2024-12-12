import React, { useEffect, useRef } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { useTaskStore } from '../../store/taskStore';
import { filterTasks } from '../../utils/filterTasks';
import { getTableColumns } from './TabulatorConfig';
import { tabulatorOptions } from './TableOptions';

export const TaskTable = () => {
  const { tasks, updateTask, deleteTask, searchQuery, statusFilter } = useTaskStore();
  const tableRef = useRef<any>(null);

  const filteredTasks = filterTasks(tasks, searchQuery, statusFilter);
  const columns = getTableColumns(deleteTask);

  useEffect(() => {
    if (tableRef.current && tableRef.current.table) {
      tableRef.current.table.setData(filteredTasks);
    }
  }, [filteredTasks]);

  const cellEdited = (cell: any) => {
    const row = cell.getRow();
    const data = row.getData();
    updateTask(data.id, { [cell.getField()]: cell.getValue() });
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-md bg-white">
      <ReactTabulator
        ref={tableRef}
        data={filteredTasks}
        columns={columns}
        options={tabulatorOptions}
        events={{
          cellEdited: cellEdited,
        }}
        className="custom-tabulator"
      />
    </div>
  );
};