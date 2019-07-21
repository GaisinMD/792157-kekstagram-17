// Выполняемые задачи: Открывание закрывание формы редактирования
// Зависимости: constants.js, utils.js, gallery-filter.js

'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ERROR_FILE_TYPE_MESSAGE = 'Неверный тип файла';

  var PHOTO_EDIT_FORM = document.querySelector('.img-upload__form');
  var PhotoEdit = {
    CLOSE: PHOTO_EDIT_FORM.querySelector('#upload-cancel'),
    SUBMIT: PHOTO_EDIT_FORM.querySelector('#upload-submit'),
    COMMENT: PHOTO_EDIT_FORM.querySelector('.text__description'),
  };

  var uploadFile = document.querySelector('#upload-file');

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
      uploadFile.value = '';
      PhotoEdit.COMMENT.value = '';
      window.customValidation.HASHTAGS.value = '';
      window.galleryFilter.showFilters();
    }
  };

  var onPhotoEditFormEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE && evt.target !== PhotoEdit.COMMENT && evt.target !== window.customValidation.HASHTAGS) {
      hidePhotoEditForm(window.constants.photoPreviewOverlay);
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

  };

  uploadFile.addEventListener('change', function () {
    validateLoad();
  });

  PhotoEdit.CLOSE.addEventListener('click', function (evt) {
    evt.preventDefault();
    hidePhotoEditForm(window.constants.photoPreviewOverlay);
  });

  PhotoEdit.SUBMIT.addEventListener('click', function (evt) {
    evt.preventDefault();
    var getValidation = window.customValidation.validateHashtags(window.customValidation.HASHTAGS);

    if (getValidation) {
      window.customValidation.HASHTAGS.setCustomValidity('');
      window.backend.save(window.constants.URL_SEND, new FormData(PHOTO_EDIT_FORM), window.utils.onSuccessMessage, window.utils.onErrorMessage);
      hidePhotoEditForm(window.constants.photoPreviewOverlay);
    }
  });

})();
