// Выполняемые задачи: Открывание закрывание формы редактирования
// Зависимости: constants.js, utils.js, gallery-filter.js

'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ERROR_FILE_TYPE_MESSAGE = 'Неверный тип файла';

  var PHOTO_EDIT_FORM = document.querySelector('.img-upload__form');
  var PHOTO_EDIT_FORM_CLOSE = PHOTO_EDIT_FORM.querySelector('#upload-cancel');
  var PHOTO_EDIT_FORM_SUBMIT = PHOTO_EDIT_FORM.querySelector('#upload-submit');
  var PHOTO_EDIT_FORM_COMMENT = PHOTO_EDIT_FORM.querySelector('.text__description');

  var UPLOAD_FILE = document.querySelector('#upload-file');

  var resetPhotoEditForm = function () {
    window.constants.photosize = window.constants.PHOTO_SIZE_MAX;
    window.constants.photoPreview.classList = 'img-upload__preview';
    window.constants.photoPreview.style = '';
    window.utils.hideElement(window.constants.imageUploadEffectsLevel);
    window.constants.photoSizeValue.value = '100%';
    window.constants.photoPreviewImage.style = 'transform: scale(1)';
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
      UPLOAD_FILE.value = '';
      PHOTO_EDIT_FORM_COMMENT.value = '';
      window.customValidation.HASHTAGS.value = '';
      window.galleryFilter.showFilters();
    }
  };

  var onPhotoEditFormEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE && evt.target !== PHOTO_EDIT_FORM_COMMENT && evt.target !== window.customValidation.HASHTAGS) {
      hidePhotoEditForm(window.constants.photoPreviewOverlay);
    }
  };


  var validateLoad = function () {
    UPLOAD_FILE.blur();

    var file = UPLOAD_FILE.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var filtersPreview = window.constants.imageUploadEffects.getElementsByTagName('span');
          window.constants.photoPreview.getElementsByTagName('img')[0].src = reader.result;
          for (var i = 0; i < filtersPreview.length; i++) {
            filtersPreview[i].style = 'background-image: url("' + reader.result + '")';
          }
        });

        showPhotoEditForm(window.constants.photoPreviewOverlay);
        reader.readAsDataURL(file);
      } else {
        window.utils.onErrorMessage(ERROR_FILE_TYPE_MESSAGE);
      }
    }

  };

  UPLOAD_FILE.addEventListener('change', function () {
    validateLoad();
  });

  PHOTO_EDIT_FORM_CLOSE.addEventListener('click', function (evt) {
    evt.preventDefault();
    hidePhotoEditForm(window.constants.photoPreviewOverlay);
  });

  PHOTO_EDIT_FORM_SUBMIT.addEventListener('click', function (evt) {
    evt.preventDefault();
    var getValidation = window.customValidation.validateHashtags(window.customValidation.HASHTAGS);

    if (getValidation) {
      window.customValidation.HASHTAGS.setCustomValidity('');
      window.backend.save(window.constants.URL_SEND, new FormData(PHOTO_EDIT_FORM), window.utils.onSuccessMessage, window.utils.onErrorMessage);
      hidePhotoEditForm(window.constants.photoPreviewOverlay);
    } else {
      window.customValidation.HASHTAGS.style = 'border-color: red; background-color: pink';
    }

  });

})();
