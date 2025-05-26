export function initModal({ onSave }) {
  const root = document.getElementById('modal-root');
  fetch('./contragents/modal/modal.html')
    .then(res => {
      if (!res.ok) throw new Error(`Не удалось загрузить modal.html (${res.status})`);
      return res.text();
    })
    .then(html => {
      root.innerHTML = html;
      bindEvents(onSave);
    })
    .catch(err => console.error('modal load error:', err));
}

function bindEvents(onSave) {
  const addBtn        = document.getElementById('addBtn');
  const modal         = document.getElementById('agentModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn     = document.getElementById('cancelBtn');
  const saveBtn       = document.getElementById('saveBtn');

  let editingIndex = null;

  // Открытие модалки по кнопке "Добавить"
  addBtn.addEventListener('click', () => openModal());

  // Кнопки закрытия
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  //Двойной клик по строке
  window.__openAgentModal = (agent = null, index = null) => openModal(agent, index);

  function openModal(agent = null, index = null) {
    editingIndex = index;

    // Находим поля
    const nameInput    = document.getElementById('nameInput');
    const innInput     = document.getElementById('innInput');
    const addressInput = document.getElementById('addressInput');
    const kppInput     = document.getElementById('kppInput');

    // Заполняем или очищаем
    if (agent) {
      nameInput.value    = agent.name;
      innInput.value     = agent.inn;
      addressInput.value = agent.address;
      kppInput.value     = agent.kpp;
    } else {
      nameInput.value    = '';
      innInput.value     = '';
      addressInput.value = '';
      kppInput.value     = '';
    }

    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    editingIndex = null;
  }

  saveBtn.addEventListener('click', () => {
    const nameInput    = document.getElementById('nameInput');
    const innInput     = document.getElementById('innInput');
    const addressInput = document.getElementById('addressInput');
    const kppInput     = document.getElementById('kppInput');

    const data = {
      name:    nameInput.value.trim(),
      inn:     innInput.value.trim(),
      address: addressInput.value.trim(),
      kpp:     kppInput.value.trim(),
    };

    // Валидация полей
    if (!data.name) {
      alert('Пожалуйста, заполните наименование.');
      return;
    }
    if (!/^\d{11}$/.test(data.inn)) {
      alert('ИНН должен состоять из 11 цифр.');
      return;
    }
    if (data.kpp !== '' && !/^\d{9}$/.test(data.kpp)) {
      alert('КПП должен состоять из 9 цифр.');
      return;
    }

    onSave(data, editingIndex);
    closeModal();
  });
}
