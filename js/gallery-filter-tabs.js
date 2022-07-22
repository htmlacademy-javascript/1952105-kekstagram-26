/**
 * CSS-класс вкладки
 */
const TAB = 'img-filters__button';

/**
 * CSS-класс активной вкладки
 */
const ACTIVE_TAB = 'img-filters__button--active';

/**
 * Активирует вкладку при нажатии
 * @param {MouseEvent} event
 */
function handleTabsClick(event) {
  // Неактивная вкладка
  const element = event.target.closest(`.${TAB}:not(.${ACTIVE_TAB})`);

  if (!element) {
    return;
  }

  // Активная вкладка
  const activeElement = event.currentTarget.querySelector(`.${ACTIVE_TAB}`);

  if (activeElement) {
    activeElement.classList.remove(ACTIVE_TAB);
  }

  element.classList.add(ACTIVE_TAB);

  element.dispatchEvent(
    new CustomEvent('change', {bubbles: true})
  );
}

/**
 * Инициализирует вкладки
 * @param {HTMLElement} element
 */
function initTabs(element) {
  element.addEventListener('click', handleTabsClick);

  return element;
}

export default initTabs;
