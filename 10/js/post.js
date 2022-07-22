/**
 * Публикация.
 * @typedef Post
 * @prop {number} id Идентификатор публикации
 * @prop {string} url Адрес изображения
 * @prop {string} description Описание изображения
 * @prop {number} likes Количество лайков
 * @prop {PostComment[]} comments
 */

/**
 * Комментарии к публикации
 * @typedef PostComment
 * @prop {number} id Идентификатор комментария
 * @prop {string} avatar Адрес аватара
 * @prop {string} message Текст комментария
 * @prop {string} name Имя автора
 */
