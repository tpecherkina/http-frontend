/* eslint-disable linebreak-style */
export default class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.modal = document.createElement('div');
  }

  bindToDOM() {
    this.modal.className = 'modal';
    this.modal.classList.add('hidden');
    this.modal.innerHTML = `
      <form class="modal-form">
        <h2 class="modal-title">Добавить тикет</h2>
        <label>
          <span class="input-title">Краткое описание</span>
          <input class="input-name" type="text" required>
        </label>
        <label>
          <span class="input-title">Подробное описание</span>
          <textarea class="input-description" type="text" required></textarea>
        </label>
        <div class="btn-box">
          <button class="cancel-btn" type="button">Отмена</button>
          <button class="ok-btn" type="submit">Ок</button>
        </div>
      </form>
      `;
    this.parentEl.appendChild(this.modal);
    this.activeModal = document.querySelector('.modal');
    this.form = this.modal.querySelector('.modal-form');
    this.name = this.modal.querySelector('.input-name');
    this.description = this.modal.querySelector('.input-description');
    this.cancelBtn = this.modal.querySelector('.cancel-btn');
    this.okBtn = this.modal.querySelector('.ok-btn');
  }

  openModal(callback) {
    this.activeModal.classList.remove('hidden');
    this.activeModal.style.top = `${(window.innerHeight - this.activeModal.offsetHeight) / 2}px`;
    this.activeModal.style.left = `${(window.innerWidth - this.activeModal.offsetWidth) / 2}px`;
    this.cancelBtn.addEventListener('click', this.closeModal);
    this.form.addEventListener('submit', callback);
  }

  closeModal(event) {
    event.preventDefault();
    this.activeModal.classList.add('hidden');
  }
}