'use strict';
// Выполняемые задачи: загрузка данных
// Зависимости: gallery.js

window.backend = (function () {

  var CODE_SUCCES = 200;

  return {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === CODE_SUCCES) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      });

      xhr.open('GET', url);
      xhr.send();
    }

  };

})();
