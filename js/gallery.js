// Выполняемые задачи: Генерация галлерии на главной странице
// Зависимости: constants.js, utils.js

'use strict';

window.gallery = (function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  var generatePicture = function (template, pictureItem) {
    template.querySelector('.picture__img').src = pictureItem.url;
    template.querySelector('.picture__likes').textContent = pictureItem.likes + '';
    template.querySelector('.picture__comments').textContent = pictureItem.comments.length + '';
    return template;
  };

  return {
    generatePicturesList: function (response) {

      window.utils.removeChildren(window.constants.pictureList, window.constants.pictureList.getElementsByClassName('picture'));

      response.forEach(function (elem) {
        fragment.appendChild(generatePicture(pictureTemplate.cloneNode(true), elem));
      });

      window.constants.pictureList.appendChild(fragment);

    }
  };

})();
