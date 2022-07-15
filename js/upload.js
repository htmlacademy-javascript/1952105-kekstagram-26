import initScaleControl from './upload-scale-control.js';
import createConstraint from './upload-constraints.js';
import openModal from './modal.js';

/**
 * Форма загрузки изображения
 * @type {HTMLFormElement}
 */
const formElement = document.querySelector('.img-upload__form');

/**
 * Окно редактирования
 * @type {HTMLDivElement}
 */
const modalElement = formElement.querySelector('.img-upload__overlay');

/**
 * Редактируемое изображение
 * @type {HTMLImageElement}
 */
const imageElement = modalElement.querySelector('.img-upload__preview img');

/**
 * Управление масштабом
 * @type {HTMLFieldSetElement}
 */
const scaleControlElement = initScaleControl(
  modalElement.querySelector('.img-upload__scale')
);

/**
 * Методы установки ограничений для хештегов и описаний
 */
const constraint = createConstraint(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

/**
 * Меняет масштаб изображения
 * @param {CustomEvent} event
 */
function handleScaleControlUpdate(event) {
  imageElement.style.transform = `scale(${event.detail.percent / 100})`;
}

/**
 * Откроет окно редактирования
 * @param {Event} event
 */
function handleFileNameChange(event) {
  openModal(modalElement);
}

// Открытие окна редактирования
formElement.filename.addEventListener('change', handleFileNameChange);

// Масштабирование изображения
scaleControlElement.addEventListener('update', handleScaleControlUpdate)

// Ограничения хештегов и описания
constraint
  .setHashtagsSyntax()
  .setHashtagsMaxItemLength(2)
  .setHashtagsMaxItems(2)
  .setHashtagsRepetitionConstraint()
  .setDescriptionMaxLength(3);

  openModal(modalElement);

