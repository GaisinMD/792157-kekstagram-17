// Выполняемые задачи: запуск логики
// Зависимости: gallery.js, constants.js

'use strict';

(function () {

  window.backend.load(window.formConstVar.URL_GET, window.gallery.generatePicturesList, window.utils.onErrormessage);
  window.galleryFilter.showFilters();

})();
