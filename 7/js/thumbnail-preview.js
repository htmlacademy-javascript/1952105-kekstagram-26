import openModal from './modal.js';
import './post.js';

/**
 * Контейнер полноразмерной публикации
 * @type {HTMLDivElement}
 */
const modalElement = document.querySelector('.big-picture');

/**
 * Шаблон комментария публикации
 * @type {HTMLLIElement}
 */
const commentTemplateElement = modalElement.querySelector('.social__comment');

/**
 * Кнопка показа новой порции комментариев
 * @type {HTMLButtonElement}
 */
const moreButtonElement = modalElement.querySelector('.social__comments-loader');

/**
 * Очередь комментариев для показа
 * @type {PostComment[]}
 */
let enqueuedComments = [];

/**
 * Число комментариев для показа за раз
 */
const COMMENTS_PER_PAGE = 5;

/**
 * Создаст DOM-элемент комментария публикации
 * @param {PostComment} comment
 */
function createCommentElement(comment) {
  const element = commentTemplateElement.cloneNode(true);

  element.querySelector('.social__picture').src = comment.avatar;
  element.querySelector('.social__picture').alt = comment.name;
  element.querySelector('.social__text').textContent = comment.message;

  return element;
}

/**
 * Покажет новую порцию комментариев
 * @param {MouseEvent} event
 */
function handleMoreButtonClick(event) {
  let method = 'append';

  if (!event.isTrusted) {
    method = 'replaceChildren';

    // Общее число комментариев
    modalElement.querySelector('.comments-count')
      .textContent = enqueuedComments.length;
  }

  // Новая порция комментариев
  modalElement.querySelector('.social__comments')[method](
    ...enqueuedComments.splice(0, COMMENTS_PER_PAGE).map(createCommentElement)
  );

  // Число показанных комментариев
  modalElement.querySelector('.shown-comments-count')
    .textContent = modalElement.querySelectorAll('.social__comment').length;

  moreButtonElement.classList.toggle('hidden', !enqueuedComments.length);

}

/**
 * Откроет публикацию в полноразмерном режиме
 * @param {Post} post
 */
function openPreview(post) {
  modalElement.querySelector('.big-picture__img img').src = post.url;
  modalElement.querySelector('.likes-count').textContent = post.likes;
  modalElement.querySelector('.social__caption').textContent = post.description;

  enqueuedComments = post.comments.slice();
  moreButtonElement.addEventListener('click', handleMoreButtonClick);
  moreButtonElement.click();

  openModal(modalElement);
}

export default openPreview;
