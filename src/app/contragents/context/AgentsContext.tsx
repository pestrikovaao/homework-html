// src/contexts/AgentsContext.tsx
import React, {
  createContext, useState, useEffect, FC, ReactNode
} from 'react';
import { Agent } from '../../App';

interface AgentsContextType {
  agents: Agent[];
  loading: boolean;
  addAgent: (agent: Agent) => Promise<void>;
  updateAgent: (agent: Agent) => Promise<void>;
  deleteAgent: (id: number) => Promise<void>;
  reload: () => Promise<void>;
}

export const AgentsContext = createContext<AgentsContextType>({
  agents: [],
  loading: false,
  addAgent: async () => {},
  updateAgent: async () => {},
  deleteAgent: async () => {},
  reload: async () => {}
});

export const AgentsProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = '/agents'; // прокси в package.json

  const reload = async () => {
    setLoading(true);
    const res = await fetch(apiUrl);
    const data = await res.json();
    setAgents(data);
    setLoading(false);
  };

  const addAgent = async (agent: Agent) => {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent)
    });
    await reload();
  };

  const updateAgent = async (agent: Agent & { id?: number }) => {
    await fetch(`${apiUrl}/${agent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent)
    });
    await reload();
  };

  const deleteAgent = async (id: number) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    await reload();
  };

  useEffect(() => { reload(); }, []);

  return (
    <AgentsContext.Provider
      value={{ agents, loading, addAgent, updateAgent, deleteAgent, reload }}
    >
      {children}
    </AgentsContext.Provider>
  );
};
