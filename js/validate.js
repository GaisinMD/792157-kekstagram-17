// Выполняемые задачи: Блок валидации
// Зависимости: constants.js, utils.js

'use strict';

window.validateObject = (function () {
  var Validation = function (input) {
    this.input = input;
    this.invalidities = [];
  };

  Validation.prototype = {

    addInvalidity: function (message) {
      this.invalidities.push(message);
    },

    getInvalidities: function () {
      return this.invalidities.join('. \n');
    },

    getReapitingHashtags: function () {
      if (this.input) {
        var sorted = this.input.slice().sort();
        for (var i = 1; i < sorted.length; i++) {
          if (sorted[i - 1] === sorted[i]) {
            this.addInvalidity('Не должно быть одинаковых хэштегов');
            return true;
          }
        }
      }
      return false;
    },

    getLonelyHashtag: function (beginner) {
      if (this.input.some(function (element) {
        return (element.charAt(0) === beginner) && (element.length === 1);
      })) {
        this.addInvalidity('Не должно быть хэштегов состоящих из одной #');
      }
    },

    getSpaceHashtag: function (beginner) {
      if (this.input.some(function (element) {
        return element.charAt(0) !== beginner;
      })) {
        this.addInvalidity('Хэштег должен начинатся с #');
      }
    },

    getMiddleHashtag: function (beginner) {
      if (this.input.some(function (element) {
        return element.lastIndexOf(beginner) > 0;
      })) {
        this.addInvalidity('Хэштеги должны быть разделены пробелами');
      }
    },

    getTooLongHashtag: function (length) {
      if (this.input.some(function (element) {
        return element.length > length;
      })) {
        this.addInvalidity('Максимальная длина хэштега - 20 символов включая решетку');
      }
    },

    getTooManyHashtag: function (quantity) {
      if (this.input.length > quantity) {
        this.addInvalidity('Максимальное количество хэштегов - 5');
      }
    }

  };

  return {

    Validation: Validation

  };

})();
