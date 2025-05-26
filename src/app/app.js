
import { initTable, render } from './contragents/table/table.js';
import { initModal } from './contragents/modal/modal.js';

let counteragents = [];

window.addEventListener('DOMContentLoaded', () => {
  initTable({
    onEdit: idx => {
      // при двойном клике зовём открытие модалки с данными
      const agent = counteragents[idx];
      window.__openAgentModal(agent, idx);
    },
    onDelete: idx => {
      counteragents.splice(idx, 1);
      render(counteragents);
    }
  });

  initModal({
    onSave: (agent, idx) => {
      if (idx == null) {
        counteragents.push(agent);
      } else {
        counteragents[idx] = agent;
      }
      render(counteragents);
    }
  });
});
