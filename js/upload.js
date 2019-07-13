// Выполняемые задачи: Открывание закрывание формы редактирования
// Зависимости: constants.js, utils.js, gallery-filter.js

'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ERROR_FILE_TYPE_MESSAGE = 'Неверный тип файла';
  var SEPARATOR = ' ';
  var HASHTAG_BEGINNER = '#';

  var PHOTO_EDIT_FORM = document.querySelector('.img-upload__form');
  var PhotoEdit = {
    CLOSE: PHOTO_EDIT_FORM.querySelector('#upload-cancel'),
    SUBMIT: PHOTO_EDIT_FORM.querySelector('#upload-submit'),
    COMMENT: PHOTO_EDIT_FORM.querySelector('.text__description'),
    HASHTAGS: PHOTO_EDIT_FORM.querySelector('.text__hashtags')
  };

  var uploadFile = document.querySelector('#upload-file');

  var resetPhotoEditForm = function () {
    window.formConstVar.photosize = window.formConstVar.PHOTO_SIZE_MAX;
    window.formConstVar.photoPreview.classList = 'img-upload__preview';
    window.formConstVar.photoPreview.style = '';
    window.utils.hideElement(window.formConstVar.imageUploadEffectsLevel);
    window.formConstVar.photoSizeValue.value = '100%';
    window.formConstVar.photoPreviewImage.style = 'transform: scale(1)';
  };

  var showPhotoEditForm = function (element) {
    window.utils.showElement(element);
    document.addEventListener('keydown', onPhotoEditFormEscPress);
    resetPhotoEditForm();
    window.galleryFilter.hideFilters();
  };

  var hidePhotoEditForm = function (element) {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', onPhotoEditFormEscPress);
      uploadFile.value = '';
      PhotoEdit.COMMENT.value = '';
      PhotoEdit.HASHTAGS.value = '';
      window.galleryFilter.showFilters();
    }
  };

  var onPhotoEditFormEscPress = function (evt) {
    if (evt.keyCode === window.formConstVar.ESC_KEYCODE && evt.target !== PhotoEdit.COMMENT && evt.target !== PhotoEdit.HASHTAGS) {
      hidePhotoEditForm(window.formConstVar.photoPreviewOverlay);
    }
  };

  var removeSetCustomValidity = function (evt) {
    evt.target.setCustomValidity('');
  };

  var validateHashtags = function (string) {
    var hashtags = string.value;
    var array = [];

    var valid = true;
    var lonelyHashtag = false;
    var spaceHashtag = false;
    var tooLongHashtag = false;
    var middleHashtag = false;

    var inputCustomValidation;
    var customValidityMessage;

    function CustomValidation() {}

    hashtags = hashtags.trim();

    if (hashtags.length) {

      CustomValidation.prototype = {
        invalidities: [],

        checkValidity: function (input) {

          if (checkUnique(array)) {
            this.addInvalidity('Не должно быть одинаковых хэштегов');
          }

          if (lonelyHashtag) {
            this.addInvalidity('Не должно быть хэштегов состоящих из одной #');
          }

          if (spaceHashtag) {
            this.addInvalidity('Хэштег должен начинатся с #');
          }

          if (middleHashtag) {
            this.addInvalidity('Хэштеги должны быть разделены пробелами');
          }

          if (input.length > 5) {
            this.addInvalidity('Максимальное количество хэштегов - 5');
          }

          if (tooLongHashtag) {
            this.addInvalidity('Максимальная длина хэштега - 20 символов включая решетку');
          }

        },

        addInvalidity: function (message) {
          this.invalidities.push(message);
        },

        getInvalidities: function () {
          return this.invalidities.join('. \n');
        }
      };

      var checkUnique = function name(elements) {
        if (elements) {
          var sorted = elements.slice().sort();
          for (var i = 1; i < sorted.length; i++) {
            if (sorted[i - 1] === sorted[i]) {
              return true;
            }
          }
        }
        return false;
      };

      array = hashtags.toLowerCase().split(SEPARATOR);

      lonelyHashtag = array.some(function (element) {
        if ((element.charAt(0) === HASHTAG_BEGINNER) && (element.length === 1)) {
          return true;
        }
        return false;
      });

      spaceHashtag = array.some(function (element) {
        if (element.charAt(0) !== HASHTAG_BEGINNER) {
          return true;
        }
        return false;
      });

      middleHashtag = array.some(function (element) {
        var index = element.lastIndexOf(HASHTAG_BEGINNER);
        if (index > 0) {
          return true;
        }
        return false;
      });

      tooLongHashtag = array.some(function (element) {
        return element.length > 19;
      });

      inputCustomValidation = new CustomValidation();
      inputCustomValidation.checkValidity(array);
      customValidityMessage = inputCustomValidation.getInvalidities();

      if (inputCustomValidation.invalidities.length) {
        PhotoEdit.HASHTAGS.setCustomValidity(customValidityMessage);
        PhotoEdit.HASHTAGS.reportValidity();
        PhotoEdit.HASHTAGS.addEventListener('input', removeSetCustomValidity);
        valid = false;
      } else {
        valid = true;
      }

    }

    if (valid) {
      string.setCustomValidity('');
      window.backend.save(window.formConstVar.URL_SEND, new FormData(PHOTO_EDIT_FORM), window.utils.onSuccessMessage, window.utils.onErrorMessage);
      hidePhotoEditForm(window.formConstVar.photoPreviewOverlay);
    }

  };

  var validateLoad = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var filtersPreview = window.formConstVar.imageUploadEffects.getElementsByTagName('span');
        window.formConstVar.photoPreview.getElementsByTagName('img')[0].src = reader.result;
        for (var i = 0; i < filtersPreview.length; i++) {
          filtersPreview[i].style = 'background-image: url("' + reader.result + '")';
        }
      });

      showPhotoEditForm(window.formConstVar.photoPreviewOverlay);
      reader.readAsDataURL(file);
    } else {
      window.utils.onErrorMessage(ERROR_FILE_TYPE_MESSAGE);
    }

  };

  uploadFile.addEventListener('change', function () {
    validateLoad();
  });

  PhotoEdit.CLOSE.addEventListener('click', function (evt) {
    evt.preventDefault();
    hidePhotoEditForm(window.formConstVar.photoPreviewOverlay);
  });

  PhotoEdit.SUBMIT.addEventListener('click', function (evt) {
    evt.preventDefault();
    PhotoEdit.HASHTAGS.removeEventListener('input', removeSetCustomValidity);
    validateHashtags(PhotoEdit.HASHTAGS);
  });

})();
