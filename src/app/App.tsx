import React, { useState, FC } from 'react';
import AgentsTable from './contragents/table/AgentsTable';
import AgentModal  from './contragents/modal/AgentModal';

import mslogo from '../img/mslogo.png';

export interface Agent {
  name: string;
  inn: string;
  address: string;
  kpp: string;
}

interface ModalState{
  isOpen: boolean;
  agent: Agent | null;
  index: number | null;
}

const App: FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [modal, setModal] = useState<ModalState>({ isOpen: false, agent: null, index: null });

  const openModal = (agent: Agent | null = null, index: number | null = null): void =>
    setModal({ isOpen: true, agent, index });
  const closeModal = (): void =>
    setModal({ isOpen: false, agent: null, index: null });

  const handleSave = (agentData: Agent, idx: number | null): void => {
    setAgents(prev =>
      idx == null
        ? [...prev, agentData]
        : prev.map((a, i) => (i === idx ? agentData : a))
    );
    closeModal();
  };

  const handleDelete = (idx: number): void =>
    setAgents(prev => prev.filter((_, i) => i !== idx));

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
        <AgentsTable
          data={agents}
          onEdit={(idx: number) => openModal(agents[idx], idx)}
          onDelete={handleDelete}
        />

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

