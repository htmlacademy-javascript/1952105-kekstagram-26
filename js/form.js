/**
 * Форма загрузки изображения
 */
const formElement = document.querySelector('.img-upload__form');

/**
 * Подключение библиотеки `Pristine`
 */
const pristine = new Pristine(formElement);

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Отправить форму');
  } else {
    console.log('Не отправлять форму');
  }
});
