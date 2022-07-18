import createThumbnailsFragment from './thumbnail.js';

/**
 * Инициализирует галерею публикаций
 * @param {Post[]} posts
 */
function initGallery(posts) {
  /**
   * Контейнер публикаций
   * @type {HTMLElement}
   */
  const gallaryElement = document.querySelector('.pictures');


  gallaryElement.append(createThumbnailsFragment(posts));
}

export default initGallery;
