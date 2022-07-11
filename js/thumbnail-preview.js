import openModal from './modal.js';

/**
 * Контейнер поноразмерной публикации
 */
const containerElement = document.querySelector('.big-picture');

/**
 * Откроет публикацию в полноразмерном режиме
 * @param {Post} post
 */
function openPreview(post) {
  containerElement.querySelector('.big-picture__img img').src = post.url;
  containerElement.querySelector('.likes-count').textContent = post.likes;
  containerElement.querySelector('.social__caption').textContent = post.description;

  openModal(containerElement);
}

export default openPreview;
