import {getRandomPositiveInteger, getRandomArrayElement} from './util.js';

//Диапазон рандома при генерации id пользователя в комментариях
const COMMENTATORS_SPAN_ID = {
  'min': 1,
  'max': 6,
};

//Диапазон рандома при генерации аватарки в комментариях
const COMMENTATORS_AVATAR_SAPAN_ID = {
  'min': 1,
  'max': 6,
};

const USERS_SPAN_ID = {
  'min': 1,
  'max': 25
};

//id
const USERS_ID = getRandomPositiveInteger(USERS_SPAN_ID['min'], USERS_SPAN_ID['max']);

//Имя пользователя
const USERS_NAME = [
  'Николай',
  'Андрей',
  'Саша',
  'Котенок1234',
  'Настюфка',
  'Славик',
  'Покимон777',
  'Димон'
];

//url
const PHOTO_URL = `photos/${getRandomPositiveInteger(1, 25)}.jpg`;

//Описание
const PHOTO_DESCRIPTION = [
  'Самый лучший день!',
  'Красивые горы!',
  'Кто со мной?',
  'Ужасная погода...',
  'ОТкрылась новая пекарня, кто со мной?',
  '*здесь могла быть ваша реклама*',
];


//Лайки
const PHOTO_LIKE = getRandomPositiveInteger(15, 200);

//Комментарии
const MESSAGE_PHOTO = [
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'В целом всё неплохо. Но не всё.'
];

//Количество объектов
const QUANTITY_OBJECT = 25;  //quantityObject

//Функция собирающая комментарий
function generateComment() {
  return {
    id: getRandomPositiveInteger(COMMENTATORS_SPAN_ID['min'], COMMENTATORS_SPAN_ID['max']),
    avatar: `img/avatar-${getRandomPositiveInteger(COMMENTATORS_AVATAR_SAPAN_ID['min'], COMMENTATORS_AVATAR_SAPAN_ID['max'])}.svg`,
    message: getRandomArrayElement(MESSAGE_PHOTO),
    name: getRandomArrayElement(USERS_NAME),
  };
}

//Функция собирающая массив поста
function createPost() {
  return {
    id: USERS_ID,
    url: PHOTO_URL,
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: PHOTO_LIKE,
    comments: generateComment(),
  };
}

//Сборка 25 массивов
const arrayPost = Array.from({length: QUANTITY_OBJECT}, createPost);

arrayPost();

