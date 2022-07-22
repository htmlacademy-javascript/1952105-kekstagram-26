/**
 * Спрячет сообщение при нажатии `Escape` на клавиатуре
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
    document.querySelector('.message').click();
  }
}

/**
 * Спрячет сообщение при нажатии в любой его области
 * @param {MouseEvent} event
 */
function handleMessageClick(event) {
  event.currentTarget.remove();
  document.removeEventListener('keydown', handleKeyDown, true);
}

/**
 * Покажет сообщение
 * @param {string} type один из: `success`, `error`
 * @param {string} message
 */
function showMessage(type, message = '') {
  const {content} = document.querySelector(`#${type}`);
  const element = content.querySelector('.message').cloneNode(true);

  if (message) {
    element.querySelector('h2').textContent = message;
    element.querySelector('button').remove();
  }

  element.addEventListener('click', handleMessageClick);
  document.addEventListener('keydown', handleKeyDown, true);

  document.body.append(element);
}

export default showMessage;
