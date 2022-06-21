//Функция рандомного числа
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Функция для проверки максимальной длины строки
function checkStringLength (string, length) {
  return string.length <= length;
};

//id
const ID_USER = getRandomPositiveInteger(1, 25);

//Имя пользователя
const NAME_USERS = [
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
const URL_PHOTO = `photos/${getRandomPositiveInteger(1, 25)}.jpg`;

//Описание
const  DESCRIPTIONS_PHOTO = [
  'Самый лучший день!',
  'Красивые горы!',
  'Кто со мной?',
  'Ужасная погода...',
  'ОТкрылась новая пекарня, кто со мной?',
  '*здесь могла быть ваша реклама*',
];

//Лайки
const LIKE_PHOTO = getRandomPositiveInteger(15, 200);

//Комментарии
const MASSAGE_PHOTO = [
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'В целом всё неплохо. Но не всё.'
];

//Функция собирающая комментарий
function createNewComment() {
  const randomId = getRandomPositiveInteger(1, 6);
  const randomAvatar = `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`;
  const randomMassage = getRandomPositiveInteger(0, MASSAGE_PHOTO.length - 1);
  const randomName = getRandomPositiveInteger(0, NAME_USERS.length - 1);
  return {
    id: randomId,
    avatar: randomAvatar,
    massage: MASSAGE_PHOTO[randomMassage],
    name: NAME_USERS[randomName],
  }
}

//Количество объектов
const quantityObject = 25;

function createObjectTopiс (){
  const randomTextDescription = getRandomPositiveInteger(0, DESCRIPTIONS_PHOTO.length - 1);
  return {
    id: ID_USER,
    url: URL_PHOTO,
    description: DESCRIPTIONS_PHOTO[randomTextDescription],
    likes: LIKE_PHOTO,
    comments: createNewComment(),
  };
}

const arrayPost = Array.from({length: quantityObject}, createObjectTopiс);

console.log(arrayPost[3]);
