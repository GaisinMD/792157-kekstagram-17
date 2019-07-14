// Выполняемые задачи: Валидация
// Зависимости: constants.js, utils.js

'use strict';

window.customValidation = (function () {

  var SEPARATOR = ' ';
  var HASHTAG_BEGINNER = '#';
  var HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_QUANTITY = 5;

  var removeSetCustomValidity = function (evt) {
    evt.target.setCustomValidity('');
  };

  return {

    HASHTAGS: document.querySelector('.text__hashtags'),

    validateHashtags: function (string) {
      var hashtags = string.value;
      var array = [];
      var valid = true;
      var inputCustomValidation;
      var customValidityMessage;

      function CustomValidation() {}

      CustomValidation.prototype = {
        invalidities: [],

        checkValidity: function (input) {
          if (this.checkUnique(input)) {
            this.addInvalidity('Не должно быть одинаковых хэштегов');
          }
          if (this.lonelyHashtag(input)) {
            this.addInvalidity('Не должно быть хэштегов состоящих из одной #');
          }
          if (this.spaceHashtag(input)) {
            this.addInvalidity('Хэштег должен начинатся с #');
          }
          if (this.middleHashtag(input)) {
            this.addInvalidity('Хэштеги должны быть разделены пробелами');
          }
          if (this.tooLongHashtag(input)) {
            this.addInvalidity('Максимальная длина хэштега - 20 символов включая решетку');
          }
          if (input.length > MAX_HASHTAGS_QUANTITY) {
            this.addInvalidity('Максимальное количество хэштегов - 5');
          }
        },

        addInvalidity: function (message) {
          this.invalidities.push(message);
        },

        getInvalidities: function () {
          return this.invalidities.join('. \n');
        },

        checkUnique: function (elements) {
          if (elements) {
            var sorted = elements.slice().sort();
            for (var i = 1; i < sorted.length; i++) {
              if (sorted[i - 1] === sorted[i]) {
                return true;
              }
            }
          }
          return false;
        },

        lonelyHashtag: function (elements) {
          return elements.some(function (element) {
            return (element.charAt(0) === HASHTAG_BEGINNER) && (element.length === 1);
          });
        },

        spaceHashtag: function (elements) {
          return elements.some(function (element) {
            return element.charAt(0) !== HASHTAG_BEGINNER;
          });
        },

        middleHashtag: function (elements) {
          return elements.some(function (element) {
            return element.lastIndexOf(HASHTAG_BEGINNER) > 0;
          });
        },

        tooLongHashtag: function (elements) {
          return elements.some(function (element) {
            return element.length > HASHTAG_LENGTH;
          });
        }

      };

      window.customValidation.HASHTAGS.removeEventListener('input', removeSetCustomValidity);

      hashtags = hashtags.trim();

      if (hashtags.length) {
        array = hashtags.toLowerCase().split(SEPARATOR);

        inputCustomValidation = new CustomValidation();
        inputCustomValidation.checkValidity(array);
        customValidityMessage = inputCustomValidation.getInvalidities();

        if (inputCustomValidation.invalidities.length) {
          window.customValidation.HASHTAGS.setCustomValidity(customValidityMessage);
          window.customValidation.HASHTAGS.reportValidity();
          window.customValidation.HASHTAGS.addEventListener('input', removeSetCustomValidity);
          valid = false;
        } else {
          valid = true;
        }
      }

      return valid;

    }

  };

})();
