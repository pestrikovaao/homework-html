import React, { FC } from 'react';
import { Form, Field, FieldRenderProps } from 'react-final-form';
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

const validate = (values: Agent) => {
  const errors: Partial<Record<keyof Agent, string>> = {};

  // Наименование обязательно
  if (!values.name || !values.name.trim()) {
    errors.name = 'Пожалуйста, заполните наименование.';
  }

  // ИНН — ровно 11 цифр
  if (!/^\d{11}$/.test(values.inn || '')) {
    errors.inn = 'ИНН должен состоять из 11 цифр.';
  }

  // КПП необязательно, но если заполнен — ровно 9 цифр
  if (values.kpp && !/^\d{9}$/.test(values.kpp)) {
    errors.kpp = 'КПП должен состоять из 9 цифр.';
  }

  return errors;
};

const AgentModal: FC<AgentModalProps> = ({ isOpen, agent, index, onSave, onClose }) => {
  if (!isOpen) return null;

  const fields: { name: keyof Agent; label: string }[] = [
    { name: 'name',    label: '*Наименование' },
    { name: 'inn',     label: '*ИНН'        },
    { name: 'address', label: 'Адрес'       },
    { name: 'kpp',     label: 'КПП'         },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

      <div id="agentModal" className="fixed inset-x-0 top-20 mx-auto w-full max-w-md z-50">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b relative">
            <h3 className="text-lg font-semibold">Контрагент</h3>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 bg-transparent hover:bg-gray-200 rounded-lg"
            >
              <img src={closeIcon} alt="Close" className="w-5 h-5" />
            </button>
          </div>

          <Form<Agent>
            onSubmit={(values) => onSave(values, index)}
            initialValues={agent || { name: '', inn: '', address: '', kpp: '' }}
            validate={validate}
            render={({ handleSubmit, pristine, submitting, form }) => (
              <form onSubmit={handleSubmit} className="p-4">
                {fields.map(({ name, label }) => (
                  <Field<string> name={name} key={name}>
                    {({ input, meta }: FieldRenderProps<string, HTMLInputElement>) => (
                      <div className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <input
                          {...input}
                          type="text"
                          className="w-full px-3 py-2 border rounded"
                        />
                        {meta.touched && meta.error && (
                          <span className="text-sm text-red-600">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                ))}

                <div className="flex justify-end space-x-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => { form.reset(); onClose(); }}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Отменить
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || pristine}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default AgentModal;
