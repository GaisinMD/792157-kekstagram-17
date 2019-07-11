// Выполняемые задачи: Работа с формой
// Зависимости: constants.js, utils.js

'use strict';

(function () {
  var MAX_PERCENT = 100;

  var Photo = {
    SIZE_MIN: 25,
    SIZE_CHANGE_STEP: 25,
    EFFECT_VOLUME_DEFAULT: 100
  };

  var ImageEffect = {
    LEVEL_VALUE: window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__value'),
    LINE: window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__line'),
    PIN: window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__pin'),
    DEPTH: window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__depth')
  };

  var effects = {
    chrome: ['grayscale', 0, 1, ''],
    sepia: ['sepia', 0, 1, ''],
    marvin: ['invert', 0, 100, '%'],
    phobos: ['blur', 0, 3, 'px'],
    heat: ['brightness', 1, 3, '']
  };

  var value = '';

  var changeSizePhotoPreview = function (button) {
    if (button.target.classList.contains('scale__control--bigger') && window.formConstVar.photosize < window.formConstVar.PHOTO_SIZE_MAX) {
      window.formConstVar.photosize += Photo.SIZE_CHANGE_STEP;
    } else if ((button.target.classList.contains('scale__control--smaller') && window.formConstVar.photosize > Photo.SIZE_MIN)) {
      window.formConstVar.photosize -= Photo.SIZE_CHANGE_STEP;
    }
    window.formConstVar.photoSizeValue.value = '' + window.formConstVar.photosize + '%';
    window.formConstVar.photoPreviewImage.style = 'transform: scale(' + (window.formConstVar.photosize / 100) + ')';
  };

  var applyPicturefilter = function (element) {
    value = element.value;

    window.formConstVar.photoPreview.classList = 'img-upload__preview';
    window.formConstVar.photoPreview.classList.add('effects__preview--' + value);

    if (value === 'none') {
      window.utils.hideElement(window.formConstVar.imageUploadEffectsLevel);
      window.formConstVar.photoPreview.style = '';
    } else {
      window.utils.showElement(window.formConstVar.imageUploadEffectsLevel);
      addEffectLevelValue(Photo.EFFECT_VOLUME_DEFAULT, effects[value]);
    }
  };

  var addEffectLevelValue = function (percent, effect) {
    ImageEffect.PIN.style = 'left:' + percent + '%';
    ImageEffect.DEPTH.style = 'width:' + percent + '%';
    var valuePercent = (effect[2] - effect[1]) / Photo.EFFECT_VOLUME_DEFAULT * percent;
    var valueInput = effect[1] + valuePercent;
    ImageEffect.LEVEL_VALUE.textContent = valueInput.toFixed(2);
    window.formConstVar.photoPreview.style = 'filter: ' + effect[0] + '(' + valueInput.toFixed(2) + effect[3] + ')';
  };

  var getEffectValue = function (percent) {
    if (percent >= 0 && percent <= MAX_PERCENT) {
      addEffectLevelValue(percent, effects[value]);
    }
  };

  window.formConstVar.photoChangeSize.addEventListener('click', changeSizePhotoPreview);

  window.formConstVar.imageUploadEffects.addEventListener('change', function (evt) {
    applyPicturefilter(evt.target);
  });

  window.utils.slider(ImageEffect.PIN, ImageEffect.LINE, getEffectValue);

})();
