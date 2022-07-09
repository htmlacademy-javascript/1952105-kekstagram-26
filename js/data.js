import './post.js';
import {getIntegerInRange, getRandomArrayItem} from './util.js';

/**
 * Диапазон нумерации аватарок
 */
const AVATARS_RANGE = [1, 6];

/**
 * Вварианты имен
 */
const NAMES = [
  'Николай',
  'Андрей',
  'Саша',
  'Котенок1234',
  'Настюфка',
  'Славик',
  'Покимон777',
  'Димон'
];

/**
 * Варианты описаний
 */
const DESCRIPTIONS = [
  'Самый лучший день!',
  'Красивые горы!',
  'Кто со мной?',
  'Ужасная погода...',
  'ОТкрылась новая пекарня, кто со мной?',
  '*здесь могла быть ваша реклама*',
];

/**
 * Диапазон количества лайков
 */
const LIKES_RANGE = [15, 200];

/**
 * Варианты комментариев
 */
const COMMENTS = [
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'В целом всё неплохо. Но не всё.'
];

/**
 * Диапазон количества комментариев
 */
const COMMENTS_RANGE = [0, 15];

/**
 * Сгенерирует комментарий
 * @param {number} id
 * @returns {PostComment}
 */
function generateComment(id) {
  return {
    id,
    avatar: `img/avatar-${getIntegerInRange(...AVATARS_RANGE)}.svg`,
    message: getRandomArrayItem(COMMENTS),
    name: getRandomArrayItem(NAMES),
  };
}

/**
 * Сгенрирует список комментариев
 * @param {number} length Длина списка
 */
function generateComments(length) {
  return Array.from({length}, (item, index) => generateComment(index + 1));
}

/**
 * Сгенерирует публикацию
 * @param {number} id
 * @returns {Post}
 */
function generatePost(id) {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayItem(DESCRIPTIONS),
    likes: getIntegerInRange(...LIKES_RANGE),
    comments: generateComments(getIntegerInRange(...COMMENTS_RANGE)),
  };
}

/**
 * Сгенрирует список публикаций
 * @param {number} length Длина списка
 */
function generatePosts(length = 25) {
  return Array.from({length}, (item, index) => generatePost(index + 1));
}

export default generatePosts;

