export class AgentsTable {
  constructor({ onEdit, onDelete }) {
    this.onEdit = onEdit;
    this.onDelete = onDelete;
  }

  async init(data = []) {
    this.render(data);
  }

  render(data) {
    const tbody = document.getElementById('agentsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    data.forEach((agent, idx) => {
      const tr = document.createElement('tr');
          tr.className = 'border-b hover:bg-gray-50 cursor-pointer';
          tr.innerHTML = `
            <td class="px-6 py-4">${agent.name}</td>
            <td class="px-6 py-4">${agent.inn}</td>
            <td class="px-6 py-4">${agent.address}</td>
            <td class="px-6 py-4">${agent.kpp}</td>
            <td class="px-6 py-4">
              <button data-index="${idx}" class="deleteBtn text-sm text-red-600 hover:underline">
                Удалить
              </button>
            </td>`;

          // двойной клик на строку
          tr.addEventListener('dblclick', () => this.onEdit(idx));

          tbody.appendChild(tr);
    });

      tbody.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const idx = Number(btn.dataset.index);
          this.onDelete(idx);
        });
      });
  }
}