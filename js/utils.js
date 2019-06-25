'use strict';
// Выполняемые задачи: Утилиты
// Зависимости:

window.utils = (function () {

  return {
    // показать элемент DOM
    showElement: function (element) {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
    },

    // скрыть элемент DOM
    hideElement: function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    },

    // слайдер
    slider: function (pin, track, callback) {
      pin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var startCoords = evt.clientX;

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var lineWidth = track.clientWidth;
          var shift = startCoords - moveEvt.clientX;

          startCoords = moveEvt.clientX;
          callback((pin.offsetLeft - shift) * 100 / lineWidth);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },

    // сообщение об ошибке закрузки
    onErrormessage: function (code) {
      var popup = document.querySelector('.error-message');
      var errorCode = popup.querySelector('.error-message-code');
      var button = popup.querySelector('.error-message-button');

      var hidePopup = function (element) {
        if (!element.classList.contains('hidden')) {
          element.classList.add('hidden');
          document.removeEventListener('keydown', onEscPress);
        }
      };

      var onEscPress = function (evt) {
        if (evt.keyCode === window.formConstVar.ESC_KEYCODE) {
          hidePopup(popup);
        }
      };

      button.addEventListener('click', function () {
        hidePopup(popup);
      });

      if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        document.addEventListener('keydown', onEscPress);
      }

      errorCode.textContent = code;
    }

  };

})();
