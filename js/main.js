// Выполняемые задачи: запуск логики
// Зависимости: constants.js, backend.js, utils.js, gallery.js, gallery-filter.js

'use strict';

(function () {
  var createPicturesList = function (response) {
    window.constants.PHOTOS_LIST = response;
    window.gallery.generatePicturesList(response);
  };

  window.backend.load(window.constants.URL_GET, createPicturesList, window.utils.onErrorMessage);
  window.galleryFilter.showFilters();

})();
