// Выполняемые задачи: Открывание закрывание формы редактирования
// Зависимости: constants.js, utils.js, gallery-filter.js

'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ERROR_FILE_TYPE_MESSAGE = 'Неверный тип файла';
  var SEPARATOR = ' #';

  var PHOTO_EDIT_FORM = document.querySelector('.img-upload__form');
  var PhotoEdit = {
    OVERLAY: PHOTO_EDIT_FORM.querySelector('.img-upload__overlay'),
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
      window.galleryFilter.showFilters();
    }
  };

  var onPhotoEditFormEscPress = function (evt) {
    if (evt.keyCode === window.formConstVar.ESC_KEYCODE && evt.target !== PhotoEdit.COMMENT && evt.target !== PhotoEdit.HASHTAGS) {
      hidePhotoEditForm(PhotoEdit.OVERLAY);
    }
  };

  var validateHashtags = function (string) {
    var hashtags = string.value;
    var array = [];

    hashtags = hashtags.trim();
    hashtags.concat(' ', hashtags);
    array = hashtags.toLowerCase().split(SEPARATOR);

    console.log(array);

    var checkUnique = function name(elements) {
      var sorted = elements.slice().sort;
      for (var i = 1; i < sorted.length; i++) {
        if (sorted[i - 1] === sorted[i]) {
          return false;
        }
      }
      return true;
    }

    var lonelyHashtag = array.some(function (element) {
      return element.charAt(0) === '';
    });

    console.log(lonelyHashtag);

    var spaceHashtag = array.some(function (element) {
      return element.charAt(0) === ' ';
    });

    console.log(spaceHashtag);

    if (spaceHashtag) {
      console.log(PhotoEdit.HASHTAGS.setCustomValidity('111'));
      PhotoEdit.HASHTAGS.setCustomValidity('111');
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

      showPhotoEditForm(PhotoEdit.OVERLAY);
      reader.readAsDataURL(file);
    } else {
      window.utils.onErrormessage(ERROR_FILE_TYPE_MESSAGE);
    }

  };

  uploadFile.addEventListener('change', function () {
    validateLoad();
  });

  PhotoEdit.CLOSE.addEventListener('click', function (evt) {
    evt.preventDefault();
    hidePhotoEditForm(PhotoEdit.OVERLAY);
  });

  PhotoEdit.SUBMIT.addEventListener('click', function (evt) {
    evt.preventDefault();
    validateHashtags(PhotoEdit.HASHTAGS);
    //window.backend.save(window.formConstVar.URL_SEND, new FormData(PHOTO_EDIT_FORM), !!!!!!, window.utils.onErrormessage);
  });

})();
