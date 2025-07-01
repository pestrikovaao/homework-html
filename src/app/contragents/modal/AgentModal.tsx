import React, { useState, useEffect, FC } from 'react';
import './modal.css';
import closeIcon from '../../../img/close.png';
import { Agent } from '../../App';

interface AgentModalProps {
  isOpen: boolean;
  agent?: Agent | null;
  index: number | null;
  onSave: (agent: Agent, index: number | null) => void;
  onClose: () => void;
}

const AgentModal: FC<AgentModalProps> = ({ isOpen, agent, index, onSave, onClose }) => {
  const [name,    setName]    = useState('');
  const [inn,     setInn]     = useState('');
  const [address, setAddress] = useState('');
  const [kpp,     setKpp]     = useState('');

  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setInn(agent.inn);
      setAddress(agent.address);
      setKpp(agent.kpp);
    } else {
      setName('');
      setInn('');
      setAddress('');
      setKpp('');
    }
  }, [agent]);

  const handleSave = () => {
    if (!name.trim()) {
      alert('Пожалуйста, заполните наименование.');
      return;
    }
    if (!/^\d{11}$/.test(inn.trim())) {
      alert('ИНН должен состоять из 11 цифр.');
      return;
    }
    if (kpp.trim() && !/^\d{9}$/.test(kpp.trim())) {
      alert('КПП должен состоять из 9 цифр.');
      return;
    }
    onSave(
      { name: name.trim(), inn: inn.trim(), address: address.trim(), kpp: kpp.trim() },
      index
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
      <div
        id="agentModal"
        className="fixed inset-x-0 top-20 mx-auto w-full max-w-md z-50"
      >
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b relative">
            <h3 className="text-lg font-semibold">Контрагент</h3>
            <button
              id="closeModalBtn"
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 bg-transparent hover:bg-gray-200 rounded-lg"
            >
              <img src={closeIcon} alt="Close" className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4">
            {[
              { label: '*Наименование',     value: name,    set: setName    },
              { label: '*ИНН',              value: inn,     set: setInn     },
              { label: 'Адрес',             value: address, set: setAddress },
              { label: 'КПП',               value: kpp,     set: setKpp     },
            ].map(({ label, value, set }) => (
              <div className="mb-4" key={label}>
                <label className="block mb-1">{label}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={value}
                  onChange={e => set(e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2 pt-2 border-t">
              <button
                id="cancelBtn"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Отменить
              </button>
              <button
                id="saveBtn"
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentModal;