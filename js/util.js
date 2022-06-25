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
}

//Функция для рандомного элемента в массиве
function getRandomArrayElement(array) {
  const elementRandomIndex = getRandomPositiveInteger(0, array.length - 1);
  return array[elementRandomIndex];
}

export {getRandomPositiveInteger, checkStringLength, getRandomArrayElement};
