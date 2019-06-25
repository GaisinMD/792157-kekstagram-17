'use strict';
// Выполняемые задачи: Генерация галлерии на главной странице

window.gallery = (function () {
  var generatePicture = function (template, pictureItem) {
    template.querySelector('.picture__img').src = pictureItem.url;
    template.querySelector('.picture__likes').textContent = pictureItem.likes + '';
    template.querySelector('.picture__comments').textContent = pictureItem.comments.length + '';
    return template;
  };

  return {
    generatePicturesList: function (list) {
      var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
      var pictureList = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < list.length; i++) {
        fragment.appendChild(generatePicture(pictureTemplate.cloneNode(true), list[i]));
      }
      pictureList.appendChild(fragment);
    }
  };

})();
