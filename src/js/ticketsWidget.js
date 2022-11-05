/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import Tickets from './Tickets';
import Request from './request';
import Modal from './Modal';
import DeleteModal from './DeleteModal';

export default class TicketsWidget {
  constructor() {
    this.ticketsWrapper = document.querySelector('.tickets');
    this.modal = new Modal(document.body);
    this.deleteModal = new DeleteModal();
    this.id = null;
    this.ticketIndex = null;

    this.addBtn = document.querySelector('.add-btn');
    this.request = new Request();
    this.addTicket = this.addTicket.bind(this);
    this.editTicket = this.editTicket.bind(this);
    this.ticketActions = this.ticketActions.bind(this);
    this.tickets = [];
  }

  init() {
    this.modal.bindToDOM();
    this.modalTitle = document.querySelector('.modal-title');
    this.deleteModal.init();
    this.cancelBtn = document.querySelector('.cancel-btn');
    this.delCancelBtn = document.querySelector('.del-cancel-btn');
    this.okBtn = document.querySelector('.ok-btn');
    this.addBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.modal.openModal(this.addTicket);
    });
    this.renderAllTickets();

    this.cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.modal.closeModal(event);
    });

    this.delCancelBtn.addEventListener('click', (event) => {
      this.deleteModal.closeDeleteModal(event);
    });
  }

  renderAllTickets() {
    const request = this.request.allTickets();
    request.then((resolve) => {
      this.tickets = [];
      this.ticketsWrapper.innerHTML = '';
      resolve.forEach((item) => {
        const ticket = new Tickets(item.id, item.name, item.status, item.created);
        this.tickets.push(ticket);
      });
      for (const el of this.tickets) {
        this.ticketsWrapper.appendChild(el);
      }
    });
    this.ticketsWrapper.addEventListener('click', this.ticketActions);
  }

  addTicket() {
    const request = this.request.createTicket(this.modal.name.value, this.modal.description.value);
    request.then(() => {
      this.renderAllTickets();
    });
  }

  deleteTicket(id) {
    this.deleteModal.closeDeleteModal();
    const request = this.request.removeById(id);
    request.then(() => {
      this.renderAllTickets();
    });
  }

  editTicket(id) {
    const request = this.request.editTicket(id, this.modal.name.value, this.modal.description.value);
    console.log(id, this.modal.name.value, this.modal.description.value);
    request.then(() => {
      this.renderAllTickets();
    });
  }

  getDescription(id, ticket) {
    if (!ticket.description) {
      const request = this.request.ticketById(id);
      request.then((resolve) => {
        const description = document.createElement('div');
        description.className = 'ticket-description';
        description.innerText = resolve.description;
        ticket.querySelector('.ticket-content').append(description);
      });
    // eslint-disable-next-line no-empty
    } else {}
  }

  ticketActions(event) {
    // event.preventDefault();
    const curTicket = event.target.closest('.ticket');
    console.log(curTicket);
    const ticket = this.tickets.find((item) => item.id === curTicket.id);
    this.id = curTicket.dataset.id;
    console.log(curTicket.dataset.id);

    if (event.target.classList.contains('delete-btn')) {
      this.deleteModal.openDeleteModal(() => this.deleteTicket(this.id));
    }

    if (event.target.classList.contains('edit-btn')) {
      this.modalTitle.innerText = 'Изменить тикет';
      this.modal.openModal(() => this.editTicket(this.id));
    }

    if (event.target.classList.contains('ticket-name') || event.target.classList.contains('ticket-description')) {
      ticket.style.cursor = 'pointer';
      const ticketDes = curTicket.querySelector('.ticket-description');
      if (ticketDes) {
        ticketDes.classList.toggle('hidden');
      } else {
        this.getDescription(this.id, curTicket);
        ticketDes.classList.toggle('hidden');
      }
    }

    if (event.target.classList.contains('ticket-checkbox')) {
      ticket.status = event.target.checked;
      console.log(ticket.status);
    }
  }
}