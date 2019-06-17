'use strict';

var ESC_KEYCODE = 27;
var PHOTO_SIZE_MAX = 100;
var PHOTO_SIZE_MIN = 0;
var PHOTO_SIZE_CHANGE_STEP = 25;

var uploadFile = document.querySelector('#upload-file');
var photoEditForm = document.querySelector('.img-upload__overlay');
var photoEditFormClose = photoEditForm.querySelector('#upload-cancel');

var photoPreviewImage = document.querySelector('.img-upload__preview').getElementsByTagName('img')[0];
var photoChangeSize = document.querySelector('.img-upload__scale');
var photoSizeBigger = photoChangeSize.querySelector('.scale__control--bigger');
var photoSizeSmaller = photoChangeSize.querySelector('.scale__control--smaller');
var photoSizeValue = photoChangeSize.querySelector('.scale__control--value');
var photosize;

var imageUploadEffects = document.querySelector('.effects__list');
var imageUploadEffectsLevel = document.querySelector('.img-upload__effect-level');
var imageEffectPin = document.querySelector('.effect-level__pin');

var showElement = function (element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  }
};

var showPhotoEditForm = function (element) {
  photosize = PHOTO_SIZE_MAX;
  showElement(element);
  document.addEventListener('keydown', PhotoEditFormEscPress);
};

var hidePhotoEditForm = function (element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', PhotoEditFormEscPress);
    uploadFile.value = '';
  }
};

var PhotoEditFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hidePhotoEditForm(photoEditForm);
  }
};

var changeSizePhotoPreview = function (change) {
  if (change === 'bigger' && photosize < PHOTO_SIZE_MAX) {
    photosize += PHOTO_SIZE_CHANGE_STEP;
  } else if ((change === 'smaller' && photosize > PHOTO_SIZE_MIN)) {
    photosize -= PHOTO_SIZE_CHANGE_STEP;
  }
  photoSizeValue.value = '' + photosize + '%';
  photoPreviewImage.style = 'transform: scale(' + (photosize / 100) + ')';
};

var applyEffect = function (effect) {};

uploadFile.addEventListener('change', function () {
  showPhotoEditForm(photoEditForm);
});

photoEditFormClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  hidePhotoEditForm(photoEditForm);
});

photoSizeBigger.addEventListener('click', function () {
  changeSizePhotoPreview('bigger');
});

photoSizeSmaller.addEventListener('click', function () {
  changeSizePhotoPreview('smaller');
});

imageUploadEffects.addEventListener('click', function (evt) {
  var target = evt.target;
  console.log(evt.target.classList);

  while (target !== imageUploadEffects) {
    if (target.tagName === 'input') {

      applyEffect(target);
      return;
    }
    target = target.parentNode;
  }
});
