import initScaleControl from './upload-scale-control.js';
import renderEffectSlider from './upload-effect-slider.js';
import createConstrainer from './upload-constrainer.js';
import openModal from './modal.js';
import {uploadPost} from './api.js';
import showMessage from './message.js';

/**
 * Форма публикации
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
 * Методы установки ограничений для хештегов и описания
 */
const constrainer = createConstrainer(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

/**
 * Применит масштаб изображения
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
function handleFileNameChange(event) {
  const fileUrl = URL.createObjectURL(...event.target.files);

  imageElement.src = fileUrl;

  formElement.querySelectorAll('.effects__preview').forEach((element) => {
    element.style.backgroundImage = `url(${fileUrl})`;
  });

  openModal(modalElement);
}

/**
 * Отправит данные публикации на сервер
 * @param {FormDataEvent} event
 */
async function handleFormData(event) {
  formElement['upload-submit'].disabled = true;

  try {
    await uploadPost(event.formData);

    formElement['upload-cancel'].click();
    showMessage('success');

  } catch (exception) {
    showMessage('error');
  }

  formElement['upload-submit'].disabled = false;
}

// Реакция на выбор файла
formElement.filename.addEventListener('change', handleFileNameChange);

// Реакция на изменение масштаба
scaleControlElement.addEventListener('update', handleScaleControlUpdate);

// Реакция на изменение насыщенности эффекта
effectSlider.on('update', handleEffectSliderUpdate);

// Реакция на выбор эффекта
effectTabsElement.addEventListener('change', handleEffectTabsChange);

// Ограничения хештегов и описания
constrainer
  .setHashtagsSyntax()
  .setHashtagsRepetitionConstraint()
  .setHashtagsMaxItemLength(20)
  .setHashtagsMaxItems(5)
  .setDescriptionMaxLength(140);

// Реакция на отправку валидной формы
formElement.addEventListener('formdata', handleFormData);

//  * @type {HTMLFieldSetElement}
