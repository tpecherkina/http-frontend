/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
export default class Tickets {
  constructor(id, name, status, created) {
    this.ticketsWrapper = document.querySelector('.tickets');
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;

    let checkbox;
    const ticket = document.createElement('div');
    ticket.className = 'ticket';
    ticket.dataset.id = this.id;

    const ticketText = document.createElement('div');
    ticketText.className = 'ticket-content';
    const inputName = document.createElement('div');
    inputName.className = 'ticket-name';
    inputName.textContent = this.name;
    ticketText.append(inputName);

    if (this.status) {
      checkbox = '<input type="checkbox" class="ticket-checkbox" checked>';
    } else {
      checkbox = '<input type="checkbox" class="ticket-checkbox">';
    }

    const dateCreated = `<div class="ticket-created">${this.created}</div>`;

    const controlBox = document.createElement('div');
    controlBox.className = 'ticket-control';
    controlBox.innerHTML = `
      <button type="button" class="edit-btn">&#9998</button>
      <button type="button" class="delete-btn">X</button>
      `;

    ticket.insertAdjacentHTML('beforeend', checkbox);
    ticket.append(ticketText);
    ticket.insertAdjacentHTML('beforeend', dateCreated);
    ticket.append(controlBox);
    return ticket;
  }
}