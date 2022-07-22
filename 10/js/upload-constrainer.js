import '../pristine/pristine.min.js';

/**
 * Вернет методы установки ограничений для формы публикации
 * @param {HTMLFormElement} formElement
 * @param {Object} options
 */
function createConstrainer(formElement, options) {
  const pristine = new Pristine(formElement, options);

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      const [invalid] = pristine.getErrors();
      invalid.input.focus();

    } else {
      // Триггер события 'formdata'
      new FormData(formElement);
    }
  });

  formElement.addEventListener('reset', () => {
    pristine.reset();
  });

  return {
    /**
     * Вернет список хештегов
     * @type {string[]}
     */
    get hashtags() {
      const value = formElement.hashtags.value.trim();

      if (value.length) {
        return value.split(/\s+/);
      }
      return [];
    },

    /**
     * Установит синтаксис для хештегов
     */
    setHashtagsSyntax() {
      const message = 'Хештег начинается с символа # и состоит из букв/цифр';
      const pattern = /^#[a-zа-яё0-9]+$/i;
      const isValid = () => this.hashtags.every((hashtag) => pattern.test(hashtag));

      pristine.addValidator(formElement.hashtags, isValid, message, 1, true);

      return this;
    },

    /**
     * Установит ограничение максимальной длины хештега
     * @param {number} maxLength
     */
    setHashtagsMaxItemLength(maxLength) {
      const message = `Максимальная длина хештега ${maxLength} символов`;
      const isValid = () => this.hashtags.every((hashtag) => hashtag.length <= maxLength);

      pristine.addValidator(formElement.hashtags, isValid, message, 1, true);

      return this;
    },

    /**
     * Установит ограничение количества хештегов
     * @param {number} maxLength
     */
    setHashtagsMaxItems(maxLength) {
      const message = `Максимальное количество хештегов ${maxLength}`;
      const isValid = () => this.hashtags.length <= maxLength;

      pristine.addValidator(formElement.hashtags, isValid, message, 1, true);

      return this;
    },

    /**
     * Установит ограничение повторов хештегов
     */
    setHashtagsRepetitionConstraint() {
      const message = 'Хештеги не должны повторяться';
      const isValid = () => {
        const hashtags = this.hashtags.map((hashtag) => hashtag.toLowerCase());

        return hashtags.length === new Set(hashtags).size;
      };

      pristine.addValidator(formElement.hashtags, isValid, message, 1, true);

      return this;
    },

    /**
     * Установит ограничение максимальной длины описания
     * @param {number} maxLength
     */
    setDescriptionMaxLength(maxLength) {
      const message = `Не более ${maxLength} символов`;
      const isValid = (value) => value.length <= maxLength;

      pristine.addValidator(formElement.description, isValid, message, 1, true);

      return this;
    }
  };
}

export default createConstrainer;
