import React, { useState, useContext, FC } from 'react';
import AgentsTable from './contragents/table/AgentsTable';
import AgentModal from './contragents/modal/AgentModal';
import { AgentsContext } from '../app/contragents/context/AgentsContext';
import mslogo from '../img/mslogo.png';

export interface Agent {
  id?: number;
  name: string;
  inn: string;
  address: string;
  kpp: string;
}

interface ModalState {
  isOpen: boolean;
  agent: Agent | null;
  index: number | null;
}

const App: FC = () => {
  // Получаем данные и методы из контекста
  const { agents, loading, addAgent, updateAgent, deleteAgent } = useContext(AgentsContext);

  // Состояние модального окна
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    agent: null,
    index: null
  });

  // Открыть модалку для создания или редактирования
  const openModal = (agent: Agent | null = null, index: number | null = null) => {
    setModal({ isOpen: true, agent, index });
  };

  // Закрыть модалку
  const closeModal = () => {
    setModal({ isOpen: false, agent: null, index: null });
  };

  // Сохранить данные при добавлении или обновлении
  const handleSave = async (agentData: Agent, idx: number | null) => {
    try {
      if (idx == null) {
        // Создание нового контрагента
        await addAgent(agentData);
      } else {
        // Редактирование существующего (id берем из списка)
        const existing = agents[idx];
        if (existing.id != null) {
          await updateAgent({ ...agentData, id: existing.id });
        }
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    } finally {
      closeModal();
    }
  };

  // Удалить контрагента
  const handleDelete = async (idx: number) => {
    try {
      const toDelete = agents[idx];
      if (toDelete.id != null) {
        await deleteAgent(toDelete.id);
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  return (
    <div className="w-4/5 mx-auto flex flex-col min-h-screen">
      <header className="bg-white pt-4 pb-8 px-4">
        <div className="w-full flex items-center justify-between">
          <img src={mslogo} alt="logo" className="h-12" />
          <button
            id="addBtn"
            onClick={() => openModal()}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Добавить
          </button>
        </div>
      </header>

      <main className="flex-grow px-4 py-4 bg-white">
        {loading ? (
          <p>Загрузка данных...</p>
        ) : (
          <AgentsTable
            data={agents}
            onEdit={(idx: number) => openModal(agents[idx], idx)}
            onDelete={handleDelete}
          />
        )}

        <AgentModal
          isOpen={modal.isOpen}
          agent={modal.agent}
          index={modal.index}
          onSave={handleSave}
          onClose={closeModal}
        />
      </main>

      <footer className="py-4 px-4 bg-white">
        <p className="text-sm text-gray-500 text-center">
          © 2007-2024 ООО «Логнекс»
        </p>
      </footer>
    </div>
  );
}

export default App;
