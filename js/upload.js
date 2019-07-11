// Выполняемые задачи: Открывание закрывание формы редактирования
// Зависимости: constants.js, utils.js, gallery-filter.js

'use strict';

(function () {
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var photoEditFormClose = photoEditForm.querySelector('#upload-cancel');

  var comment = document.querySelector('.text__description');
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
    if (evt.keyCode === window.formConstVar.ESC_KEYCODE && evt.target !== comment) {
      hidePhotoEditForm(photoEditForm);
    }
  };

  uploadFile.addEventListener('change', function () {
    showPhotoEditForm(photoEditForm);
  });

  photoEditFormClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    hidePhotoEditForm(photoEditForm);
  });

})();
