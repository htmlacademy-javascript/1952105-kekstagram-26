/**
 * Минимальный масштаб
 */
const MIN = 25;

/**
 * Максимальный масштаб
 */
const MAX = 100;

/**
 * Шаг масштабирования
 */
const STEP = 25;

/**
 * Обновит значения масштаба при нажатии на соответствующую кнопку
 * @param {MouseEvent} event
 */
function handleScaleControlClick(event) {
  const group = event.currentTarget.elements;
  let value = Number.parseFloat(group.scale.value);

  if (event.target === group['scale-down']) {
    value = Math.max(value - STEP, MIN);

  } else if (event.target === group['scale-up']) {
    value = Math.min(value + STEP, MAX);
  }

  group.scale.value = `${value}%`;

  event.currentTarget.dispatchEvent(
    new CustomEvent('update', {detail: {percent: value}})
  );
}

/**
 * Инициализирует элемент управления масштабированием
 * @param {HTMLFieldSetElement} element
 */
function initScaleControl(element) {
  element.addEventListener('click', handleScaleControlClick);

  return element;
}

export default initScaleControl;

