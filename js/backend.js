// Выполняемые задачи: загрузка данных
// Зависимости: constants.js gallery.js

'use strict';

window.backend = (function () {

  var CODE_SUCCES = 200;

  return {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === CODE_SUCCES) {
          window.formConstVar.PHOTOS_LIST = xhr.response;
          onLoad(window.formConstVar.PHOTOS_LIST);
        } else {
          onError(xhr.status);
        }
      });

      xhr.open('GET', url);
      xhr.send();
    }

  };

})();
