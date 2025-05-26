let agentsData = [];          // текущее состояние
let editHandler = () => {};   // колбеки, которые проставим в initTable
let deleteHandler = () => {};

export function initTable({ onEdit, onDelete }) {
  editHandler   = onEdit;
  deleteHandler = onDelete;

  const container = document.getElementById('table-root');
  fetch('./contragents/table/table.html')
    .then(res => {
      if (!res.ok) throw new Error(`Не удалось загрузить table.html (${res.status})`);
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;
      render([]);
    })
    .catch(err => console.error(err));
}

/**
 * Обновляет тело таблицы.
 * @param {Array<{name:string,inn:string,address:string,kpp:string}>} data
 */
export function render(data) {
  agentsData = data;
  const tbody = document.getElementById('agentsTableBody');
  if (!tbody) {
    console.error('#agentsTableBody не найден!');
    return;
  }
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
    tr.addEventListener('dblclick', () => editHandler(idx));

    tbody.appendChild(tr);
  });

  // вешаем кнопки "Удалить"
  tbody.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = Number(btn.dataset.index);
      deleteHandler(idx);
    });
  });
}
