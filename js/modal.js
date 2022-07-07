/**
 * Закроет модальное окно при нажатии `Escape`
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (event.key === 'Escape') {
    document.querySelector('.overlay:not(.hidden) .cancel').click();
  }
}

/**
 * Закроет модальное окно при клике по кнопке события
 * @param {MouseEvent} event
 */
function handleCancelButtonClick(event) {
  event.target.closest('.overlay').classList.add('hidden');

  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydown);
}

/**
 * Откроет модальное окно
 * @param {HTMLElement} element
 */
function openModal(element) {
  element.classList.remove('hidden');
  element.querySelector('.cancel').addEventListener('click', handleCancelButtonClick);

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydown);
}

export default openModal;
