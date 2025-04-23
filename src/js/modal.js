/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
import { parseCoordinates } from './utils';

export function showModal(message, callback, content) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__content">
      <div class="modal__text">Что-то пошло не так</div>
      <p class="modal__text">${message}</p>
      <div class="modal__text">Широта и долгота через запятую</div>
      <input type="text" class="manual__coords" placeholder="51.50851, -0.12572">
      <div class="modal__btns">
        <button class="close__modal">Отмена</button>
        <button class="submit__coords">Ок</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.querySelector('.submit__coords').addEventListener('click', () => {
    const coordsInput = document.querySelector('.manual__coords').value.trim();
    try {
      const coords = parseCoordinates(coordsInput);
      callback(content, coords);
      document.body.removeChild(modal);
    } catch (error) {
      alert(error.message);
    }
  });

  document.querySelector('.close__modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}
