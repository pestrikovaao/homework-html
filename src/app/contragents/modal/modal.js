export class AgentModal {
  constructor({ onSave }) {
    this.onSave = onSave;
    this.modal = null;
    this.saveBtn = null;
    this._handler = null;
  }

  init() {
    this.modal = document.getElementById('agentModal');
    this.saveBtn = document.getElementById('saveBtn');

    this._bindEvents();
  }

  open(agent = null, index = null) {
    const nameInput = document.getElementById('nameInput');
    const innInput = document.getElementById('innInput');
    const addressInput = document.getElementById('addressInput');
    const kppInput = document.getElementById('kppInput');

    // Заполняем или очищаем
    if (agent) {
      nameInput.value = agent.name;
      innInput.value = agent.inn;
      addressInput.value = agent.address;
      kppInput.value = agent.kpp;
    } else {
      nameInput.value = '';
      innInput.value = '';
      addressInput.value = '';
      kppInput.value = '';
    }

    // Снимаем предыдущий обработчик, если был
    if (this._handler) {
      this.saveBtn.removeEventListener('click', this._handler);
    }

    // Создаем новый
    this._handler = () => {
      const data = {
        name: nameInput.value.trim(),
        inn: innInput.value.trim(),
        address: addressInput.value.trim(),
        kpp: kppInput.value.trim(),
      };

      // Валидация
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

      this.onSave(data, index);
      this.close();
    };

    this.saveBtn.addEventListener('click', this._handler);
    this.modal.classList.remove('hidden');
  }

  close() {
    if (!this.modal || !this.saveBtn) return;
    this.modal.classList.add('hidden');
    if (this._handler) {
      this.saveBtn.removeEventListener('click', this._handler);
      this._handler = null;
    }
  }

  _bindEvents() {
    const addBtn = document.getElementById('addBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    addBtn.addEventListener('click', () => this.open(null, null));
    closeBtn.addEventListener('click', () => this.close());
    cancelBtn.addEventListener('click', () => this.close());
  }
}