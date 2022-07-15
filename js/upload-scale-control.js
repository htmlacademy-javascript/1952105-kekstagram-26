/**
 * Минимальный масштаб
 */
const MIN = 25;

/**
 * Максимальный масштаб
 */
const MAX = 200;

/**
 * Шаг масштабирования
 */
const STEP = 25;

/**
 * Обновит значения масштаба при нажатии на соответствующую кнопку
 * @param {MouseEvent} event
 */
function handleScaleControlClick(event) {
  const outputElement = event.currentTarget.querySelector('.scale__control--value');
  let value = Number.parseFloat(outputElement.value);

  if (event.target.closest('.scale__control--smaller')) {
    value = Math.max(value - STEP, MIN);

  } else if (event.target.closest('.scale__control--bigger')) {
    value = Math.min(value + STEP, MAX);
  }
  outputElement.value = `${value}%`;

  event.currentTarget.dispatchEvent(
    new CustomEvent('update', {detail: {percent: value}})
  );
}

/**
 * Инициализирует элемент управления масштабирования
 * @param {HTMLElement} element
 */
function initScaleControl(element) {
  element.addEventListener('click', handleScaleControlClick);

  return element;
}

export default initScaleControl;

