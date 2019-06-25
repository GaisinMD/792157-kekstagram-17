'use strict';
// Выполняемые задачи: Утилиты
// Зависимости:

window.utils = (function () {

  return {
    showElement: function (element) {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
    },

    hideElement: function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    },

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
    }

  };

})();
