'use strict';
// Выполняемые задачи: запуск логики
// Зависимости: gallery.js

(function () {

  window.backend.load(window.formConstVar.URL_GET, window.gallery.generatePicturesList, window.utils.onErrormessage);

})();
