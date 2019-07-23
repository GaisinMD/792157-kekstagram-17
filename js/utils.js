// Выполняемые задачи: Утилиты
// Зависимости: constants.js

'use strict';

window.utils = (function () {
  var DEBOUNCE_INTERVAL = 500;

  return {
    // установка задержки
    debounce: function (callback) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          callback.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },

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

    // очистка DOM узла
    removeChildren: function (parent, children) {
      while (children[0]) {
        parent.removeChild(children[0]);
      }
    },

    // случайное целое число
    randomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    // перемешивание массива
    shuffleList: function (list) {
      var y;
      var x;
      for (var i = list.length - 1; i > 0; i--) {
        y = window.utils.randomInteger(0, i);
        x = list[i];
        list[i] = list[y];
        list[y] = x;
      }
      return list;
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
    onErrorMessage: function (code) {
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
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          hidePopup(popup);
        }
      };

      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        hidePopup(popup);
      });

      if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        document.addEventListener('keydown', onEscPress);
      }

      errorCode.textContent = code;
    },

    // сообщение об успехе закрузки
    onSuccessMessage: function (code) {
      var popup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      var inner = popup.querySelector('.success__inner');
      var button = inner.querySelector('.success__button');
      var header = inner.querySelector('.success__title');

      var hidePopup = function (element) {
        window.constants.mainTag.removeChild(element);
        document.removeEventListener('keydown', onEscPress);
      };

      var onEscPress = function (evt) {
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          hidePopup(popup);
        }
      };

      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        hidePopup(popup);
      });

      document.addEventListener('keydown', onEscPress);

      popup.addEventListener('click', function (evt) {
        if (evt.target === popup) {
          hidePopup(popup);
        }
      });

      header.textContent = header.textContent + ': ' + code.filename.filename;
      window.constants.mainTag.appendChild(popup);

    }

  };

})();
