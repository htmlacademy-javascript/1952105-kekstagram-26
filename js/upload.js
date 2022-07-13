import createConstraints from './upload-constraints.js';
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
const overlayElement = formElement.querySelector('.img-upload__overlay');

createConstraints(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
})
  .setHashtagsSyntax()
  .setHashtagsMaxItemLength(2)
  .setHashtagsMaxItems(2)
  .setHashtagsRepetitionConstraint()
  .setDescriptionMaxLength(3);

formElement.filename.addEventListener('change', () => {
  openModal(overlayElement);
});

openModal(overlayElement);
