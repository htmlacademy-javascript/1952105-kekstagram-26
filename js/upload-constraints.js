 import '../pristine/pristine.min.js';

 /**
  * Вернет методы установки ограничений для формы публикации
  * @param {HTMLFormElement} formElement
  * @param {Object} options
  */
 function createConstraints(formElement, options) {
  /**
   * Подключение библиотеки `Pristine`
   */
  const pristine = new Pristine(formElement, options);

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      const [inValid] = pristine.getErrors();
      inValid.input.focus();
    }

  })
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
     *
     */
    setHashtagsSyntax() {
      const messege = 'Хештег начинается с символа # и состоит из букв/цифр';
      const pattern = /^#[a-zа-яё0-9]+$/i;

      pristine.addValidator(
        formElement.hashtags,
        (value) => this.hashtags.every((hashtag) => pattern.test(hashtag)),
        messege
      );
      return this;
    },

    /**
     * Установит ограничение максимальной длины хештега
     * @param {number} maxLength
     */
    setHashtagsMaxItemLength(maxLength) {
      const messege = `Максимальная длина хештега ${maxLength} символов`;

      pristine.addValidator(
        formElement.hashtags,
        () => this.hashtags.every((hashtag) => hashtag.length <= maxLength),
        messege
      );

      return this;
    },

    /**
     * Установит ограничение количество хештегов
     * @param {number} maxLength
     */
    setHashtagsMaxItems(maxLength) {
      const messege = `Максимальное количество хештегов ${maxLength}`;

      pristine.addValidator(
        formElement.hashtags,
        () => this.hashtags.length <= maxLength,
        messege
      );

      return this;
    },

    /**
     * Установит ограничение повторов хештегов
     */
    setHashtagsRepititionConstraint() {
      const messege = 'Хештеги не должны повторяться';

      pristine.addValidator(formElement.hashtags, () => {
        const hashtags = this.hashtags.map((hashtag) => hashtag.toLowerCase());

        return hashtags.length === new Set(hashtags).size;
      }, messege);

      return this;
    },

    /**
     * Установит ограничение максимальной длины описания
     * @param {number} maxLength
     */
    setDescriptionMaxLength(maxLength) {
      const messege = `Не более ${maxLength} символов`;

      pristine.addValidator(
        formElement.description,
        (value) => value.length <= maxLength,
        messege
      );

      return this;
    }
  };
}

export default createConstraints;
