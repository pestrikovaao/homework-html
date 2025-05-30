import html from "./app.html";
import counterpartyTableHtml from "./contragents/table/table.html";
import counterpartyModalHtml from "./contragents/modal/modal.html";

import { AgentsTable } from './contragents/table/table.js';
import { AgentModal } from './contragents/modal/modal';

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

// Set up table
const tableContainer = document.getElementById('table-root');
tableContainer.innerHTML = counterpartyTableHtml;

// Set up modal
const modalContainer = document.getElementById('modal-root');
modalContainer.innerHTML = counterpartyModalHtml;

let counteragents = [];

const modal = new AgentModal({
      onSave: (agent, idx) => {
        if (idx == null) {
          counteragents.push(agent);
        } else {
          counteragents[idx] = agent;
        }
        table.render(counteragents);
      }
});

const table = new AgentsTable({
      onEdit: idx => {
        // при двойном клике зовём открытие модалки с данными
        const agent = counteragents[idx];
        modal.open(agent, idx);
      },
      onDelete: idx => {
        counteragents.splice(idx, 1);
        table.render(counteragents);
      }
});


window.addEventListener('DOMContentLoaded', () => {
  table.init();
  modal.init()
});
