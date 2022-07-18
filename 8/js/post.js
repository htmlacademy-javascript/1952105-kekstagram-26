/**
 * Публикация.
 * @typedef Post
 * @prop {number} id Индентификатор публикации
 * @prop {string} url
 * @prop {string} description
 * @prop {number} likes
 * @prop {PostComment[]} comments
 */

/**
 * Комментарии к публикации
 * @typedef PostComment
 * @prop {number} id
 * @prop {string} avatar
 * @prop {string} message
 * @prop {string} name
 */
