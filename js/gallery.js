import createThumbnailsFragment from './thumbnail.js';
import initTabs from './gallery-filter-tabs.js';
import {debounce} from './utilities.js';

/**
 * Лимит случайных публикаций
 */
const RANDOM_POSTS_LIMIT = 10;

/**
 * Инициализирует галерею публикаций
 * @param {Post[]} posts
 */
function initGallery(posts) {
  /**
   * Форма фильтров
   * @type {HTMLFormElement}
   */
  const formElement = initTabs(
    document.querySelector('.img-filters__form')
  );

  /**
   * Контейнер публикаций
   * @type {HTMLElement}
   */
  const galleryElement = document.querySelector('.pictures');

  /**
   * Покажет публикации соответствующие выбранному фильтру
   * @param {CustomEvent} event
   */
  function handleFormChange(event) {
    const {id} = event.target;

    const copiedPosts = [...posts];
    // Случайные
    if (id === 'filter-random') {
      copiedPosts.sort(() => Math.random() - .5).splice(RANDOM_POSTS_LIMIT);

    // Популярные
    } else if (id === 'filter-discussed') {
      copiedPosts.sort((left, right) => right.comments.length - left.comments.length);
    }

    galleryElement.querySelectorAll('.picture').forEach((element) => element.remove());
    galleryElement.append(createThumbnailsFragment(copiedPosts));
  }

  // Реакция на переключение фильтров
formElement.addEventListener('change', debounce(handleFormChange));

  // Триггер фильтра "По умолчанию"
  formElement['filter-default'].click();

  // Показ блока фильтров
  formElement.closest('.img-filters').classList.remove('img-filters--inactive');
}

export default initGallery;
