// Выполняемые задачи: Генерация галлерии на главной странице
// Зависимости: utils.js

'use strict';

window.galleryFilter = (function () {
  var BEGIN_NEW_ARRAY = 0;
  var END_NEW_ARRAY = 10;

  var imgFilters = document.querySelector('.img-filters');

  var Filters = {
    POPULAR: document.getElementById('filter-popular'),
    NEW: document.getElementById('filter-new'),
    DISCUSSED: document.getElementById('filter-discussed')
  };

  var activeFilter = Filters.POPULAR;

  var applyFilter = function (filter) {
    var sortedList = window.formConstVar.PHOTOS_LIST.slice();

    switch (filter) {
      case 'filter-new':
        sortedList = window.utils.shuffleList(sortedList);
        sortedList = sortedList.slice(BEGIN_NEW_ARRAY, END_NEW_ARRAY);
        break;
      case 'filter-discussed':
        sortedList.sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
        break;
    }

    window.gallery.generatePicturesList(sortedList);
  };

  var delayingSwitchFilters = window.utils.debounce(function (id) {
    applyFilter(id);
  });

  var switchFilters = function (evt) {
    if (evt.target !== activeFilter && evt.target.classList.contains('img-filters__button')) {
      activeFilter.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      activeFilter = evt.target;

      delayingSwitchFilters(activeFilter.id);

    }
  };

  imgFilters.addEventListener('click', function (evt) {
    evt.preventDefault();
    switchFilters(evt);
  });

  return {

    showFilters: function () {
      if (imgFilters.classList.contains('img-filters--inactive')) {
        imgFilters.classList.remove('img-filters--inactive');
      }
    },

    hideFilters: function () {
      if (!imgFilters.classList.contains('img-filters--inactive')) {
        imgFilters.classList.add('img-filters--inactive');
      }
    }

  };

})();
