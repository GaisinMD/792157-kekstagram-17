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
    LEVEL_VALUE: window.constants.imageUploadEffectsLevel.querySelector('.effect-level__value'),
    LINE: window.constants.imageUploadEffectsLevel.querySelector('.effect-level__line'),
    PIN: window.constants.imageUploadEffectsLevel.querySelector('.effect-level__pin'),
    DEPTH: window.constants.imageUploadEffectsLevel.querySelector('.effect-level__depth')
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
    if (button.target.classList.contains('scale__control--bigger') && window.constants.photosize < window.constants.PHOTO_SIZE_MAX) {
      window.constants.photosize += Photo.SIZE_CHANGE_STEP;
    } else if ((button.target.classList.contains('scale__control--smaller') && window.constants.photosize > Photo.SIZE_MIN)) {
      window.constants.photosize -= Photo.SIZE_CHANGE_STEP;
    }
    window.constants.photoSizeValue.value = '' + window.constants.photosize + '%';
    window.constants.photoPreviewImage.style = 'transform: scale(' + (window.constants.photosize / 100) + ')';
  };

  var applyPicturefilter = function (element) {
    value = element.value;

    window.constants.photoPreview.classList = 'img-upload__preview';
    window.constants.photoPreview.classList.add('effects__preview--' + value);

    if (value === 'none') {
      window.utils.hideElement(window.constants.imageUploadEffectsLevel);
      window.constants.photoPreview.style = '';
    } else {
      window.utils.showElement(window.constants.imageUploadEffectsLevel);
      addEffectLevelValue(Photo.EFFECT_VOLUME_DEFAULT, effects[value]);
    }
  };

  var addEffectLevelValue = function (percent, effect) {
    var valuePercent = (effect[2] - effect[1]) / Photo.EFFECT_VOLUME_DEFAULT * percent;
    var valueInput = effect[1] + valuePercent;

    ImageEffect.PIN.style = 'left:' + percent + '%';
    ImageEffect.DEPTH.style = 'width:' + percent + '%';
    ImageEffect.LEVEL_VALUE.textContent = valueInput.toFixed(2);
    window.constants.photoPreview.style = 'filter: ' + effect[0] + '(' + valueInput.toFixed(2) + effect[3] + ')';
  };

  var getEffectValue = function (percent) {
    if (percent >= 0 && percent <= MAX_PERCENT) {
      addEffectLevelValue(percent, effects[value]);
    }
  };

  window.constants.photoChangeSize.addEventListener('click', changeSizePhotoPreview);

  window.constants.imageUploadEffects.addEventListener('change', function (evt) {
    applyPicturefilter(evt.target);
  });

  window.utils.setSlider(ImageEffect.PIN, ImageEffect.LINE, getEffectValue);

})();
