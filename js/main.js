// Выполняемые задачи: запуск логики
// Зависимости: constants.js, backend.js, utils.js, gallery.js, gallery-filter.js

'use strict';

(function () {

  window.backend.load(window.constants.URL_GET, window.gallery.generatePicturesList, window.utils.onErrorMessage);
  window.galleryFilter.showFilters();

})();
