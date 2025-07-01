import React, {FC} from 'react';
import './table.css';
import { Agent } from '../../App';

interface AgentsTableProps {
  data: Agent[];
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
}

const AgentsTable: FC<AgentsTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto w-full bg-white rounded shadow">
      <table className="w-full text-left text-gray-700">
        <thead className="text-gray-500 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Наименование</th>
            <th className="px-6 py-3">ИНН</th>
            <th className="px-6 py-3">Адрес</th>
            <th className="px-6 py-3">КПП</th>
            <th className="px-6 py-3">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((agent, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onDoubleClick={() => onEdit(idx)}
            >
              <td className="px-6 py-4">{agent.name}</td>
              <td className="px-6 py-4">{agent.inn}</td>
              <td className="px-6 py-4">{agent.address}</td>
              <td className="px-6 py-4">{agent.kpp}</td>
              <td className="px-6 py-4">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(idx);
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default AgentsTable;