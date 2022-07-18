import './post.js';

/**
 * Базовый адрес для отправки запросов
 */
const BASE_URL = 'https://26.javascript.pages.academy/kekstagram';

/**
 * Отправит запрос на сервер
 * @param {string} path
 * @param {Object} options
 */
function request(path, options) {
  return fetch(BASE_URL + path, options).then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  });
}

/**
 * Получит список публикаций
 * @returns {Promise<Post[]>}
 */
export function getPosts() {
  return request('/data', {
    method: 'get',
    cache: 'force-cache'
  });
}

/**
 * Отправит данные публикации
 * @param {FormData} data
 */
export function uploadPost(data) {
  return request('/', {
    method: 'post',
    body: data
  });
}
