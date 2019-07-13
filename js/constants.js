// Выполняемые задачи: Библиотека констант и переменных для формы редактирования
// Зависимости:

'use strict';

window.formConstVar = (function () {
  var photoPreview = document.querySelector('.img-upload__preview');
  var photoChangeSize = document.querySelector('.img-upload__scale');

  return {
    ESC_KEYCODE: 27,
    PHOTO_SIZE_MAX: 100,
    URL_GET: 'https://js.dump.academy/kekstagram/data',
    URL_SEND: 'https://js.dump.academy/kekstagram',
    PHOTOS_LIST: [],

    mainTag: document.getElementsByTagName('main')[0],

    pictureList: document.querySelector('.pictures'),

    imageUploadEffects: document.querySelector('.effects__list'),

    photoPreviewOverlay: document.querySelector('.img-upload__overlay'),
    photoPreview: photoPreview,
    photoPreviewImage: photoPreview.getElementsByTagName('img')[0],

    photoChangeSize: photoChangeSize,
    photoSizeValue: photoChangeSize.querySelector('.scale__control--value'),

    imageUploadEffectsLevel: document.querySelector('.img-upload__effect-level'),

    photosize: 0
  };

})();
