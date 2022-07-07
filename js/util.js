/**
 * Вернет случайное число в диапазоне `min`, `max`
 * @param {number} min
 * @param {number} max
 */
 export function getIntegerInRange(min, max) {
  const value = (max - min) * Math.random() + min;
  return Math.round(value);
}

/**
 * Вернёт случайный элемент массива.
 * @template Item
 * @param {Item[]} items
 */
 export function getRandomArrayItem(items) {
  const lastIndex = Math.max(0, items.length - 1);
  const index = getIntegerInRange(0, lastIndex);
  return items[index];
}
