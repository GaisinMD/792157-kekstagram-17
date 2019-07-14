// Выполняемые задачи: Валидация хэштега
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
      var hashtags = string.value.trim();
      var valid = true;
      var inputCustomValidation;
      var customValidityMessage;

      window.customValidation.HASHTAGS.removeEventListener('input', removeSetCustomValidity);

      if (hashtags.length) {
        var array = hashtags.toLowerCase().split(SEPARATOR);

        inputCustomValidation = new window.validateObject.Validation(array);
        inputCustomValidation.getReapitingHashtags();
        inputCustomValidation.getLonelyHashtag(HASHTAG_BEGINNER);
        inputCustomValidation.getSpaceHashtag(HASHTAG_BEGINNER);
        inputCustomValidation.getMiddleHashtag(HASHTAG_BEGINNER);
        inputCustomValidation.getTooLongHashtag(HASHTAG_LENGTH);
        inputCustomValidation.getTooManyHashtag(MAX_HASHTAGS_QUANTITY);
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
