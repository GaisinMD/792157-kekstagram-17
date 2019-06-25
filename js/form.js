'use strict';
// Выполняемые задачи: Работа с формой
// Зависимости: form-const-variables.js

(function () {
  var PHOTO_SIZE_MIN = 25;
  var PHOTO_SIZE_CHANGE_STEP = 25;
  var PHOTO_EFFECT_VOLUME_DEFAULT = 100;
  var MAX_PERCENT = 100;

  var imageEffectLevelValue = window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__value');
  var imageEffectLine = window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__line');
  var imageEffectPin = window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__pin');
  var imageEffectDepth = window.formConstVar.imageUploadEffectsLevel.querySelector('.effect-level__depth');
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
      window.formConstVar.photosize += PHOTO_SIZE_CHANGE_STEP;
    } else if ((button.target.classList.contains('scale__control--smaller') && window.formConstVar.photosize > PHOTO_SIZE_MIN)) {
      window.formConstVar.photosize -= PHOTO_SIZE_CHANGE_STEP;
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
      addEffectLevelValue(PHOTO_EFFECT_VOLUME_DEFAULT, effects[value]);
    }
  };

  var addEffectLevelValue = function (percent, effect) {
    imageEffectPin.style = 'left:' + percent + '%';
    imageEffectDepth.style = 'width:' + percent + '%';
    var valuePercent = (effect[2] - effect[1]) / PHOTO_EFFECT_VOLUME_DEFAULT * percent;
    var valueInput = effect[1] + valuePercent;
    imageEffectLevelValue.textContent = valueInput.toFixed(2);
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

  window.utils.slider(imageEffectPin, imageEffectLine, getEffectValue);

})();
