import initScaleControl from './upload-scale-control.js';
import renderEffectSlider from './upload-effect-slider.js';
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
 * Управление насыщенностью эффекта
 */
const effectSlider = renderEffectSlider(
  modalElement.querySelector('.effect-level__slider')
);

/**
 * Выбор эффекта
 * @type {HTMLFieldSetElement}
 */
const effectTabsElement = modalElement.querySelector('.img-upload__effects');

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
 * Применит насыщенность эффекта
 * @param {string[]} values
 */
function handleEffectSliderUpdate([value]) {
  imageElement.style.filter = value;
  formElement['effect-level'].value = effectSlider.get(true);
}

/**
 * Применит эффект
 * @param {Event} event
 */
function handleEffectTabsChange() {
  const effect = formElement.effect.value;
  const isHidden = effectSlider.defaultEffect === effect;

  imageElement.className = `effects__preview--${effect}`;

  effectSlider.updateRangeOptions(effect);
  effectSlider.target.closest('.effect-level').classList.toggle('hidden', isHidden);
}

/**
 * Откроет окно редактирования
 * @param {Event} event
 */
function handleFileNameChange() {
  openModal(modalElement);
}

// Открытие окна редактирования
formElement.filename.addEventListener('change', handleFileNameChange);

// Масштабирование изображения
scaleControlElement.addEventListener('update', handleScaleControlUpdate);

// Насыщенность эффекта
effectSlider.on('update', handleEffectSliderUpdate);

// Выбор эффекта
effectTabsElement.addEventListener('change', handleEffectTabsChange);

// Ограничения хештегов и описания
constraint
  .setHashtagsSyntax()
  .setHashtagsMaxItemLength(2)
  .setHashtagsMaxItems(2)
  .setHashtagsRepetitionConstraint()
  .setDescriptionMaxLength(3);

openModal(modalElement);

