// Выполняемые задачи: Генерация галлерии на главной странице
// Зависимости: utils.js

'use strict';

window.gallery = (function () {
  var generatePicture = function (template, pictureItem) {
    template.querySelector('.picture__img').src = pictureItem.url;
    template.querySelector('.picture__likes').textContent = pictureItem.likes + '';
    template.querySelector('.picture__comments').textContent = pictureItem.comments.length + '';
    return template;
  };

  var generatePhotosList = function (responce) {
    var photos = [];
    responce.forEach(function (element) {
      photos.push(element);
    });
    return photos;
  };

  return {
    generatePicturesList: function (responce) {
      var list = generatePhotosList(responce);

      var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
      var pictureList = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();

      window.utils.removeChildren(pictureList);

      list.forEach(function (elem) {
        fragment.appendChild(generatePicture(pictureTemplate.cloneNode(true), elem));
      });

      pictureList.appendChild(fragment);

    }
  };

})();
