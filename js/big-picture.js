// Выполняемые задачи: попап изображения других пользователей
// Зависимости: constants.js

'use strict';

window.bigPicture = (function () {
  var BIG_PICTURE = document.querySelector('.big-picture');
  var socialCommentList = BIG_PICTURE.querySelector('.social__comments');


  var Picture = function (url, likes, comments, description) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  };

  var generateCommentList = function (list) {
    //window.utils.removeChildren();
    list.forEach(function () {

    });
  };

  var generateBigPicture = function (source) {
    BIG_PICTURE.querySelector('.big-picture__img').children[0].src = source.url;
    BIG_PICTURE.querySelector('.likes-count').textContent = source.likes;
    BIG_PICTURE.querySelector('.social__caption').textContent = source.description;
    BIG_PICTURE.querySelector('.comments-count').textContent = source.comments.length;
    generateCommentList(source.comments);
  };

  var showBigPicture = function (evt) {
    var target = evt.target;
    var hitElement;

    while (target !== window.formConstVar.pictureList) {
      if (target.classList.contains('picture')) {
        window.utils.showElement(BIG_PICTURE);
        hitElement = window.formConstVar.PHOTOS_LIST.slice().filter(function (i) {
          return (target.querySelector('.picture__img').src.search(i.url) >= 0);
        })[0];
      }
      target = target.parentNode;
    }

    if (hitElement) {
      var element = new Picture(hitElement.url, hitElement.likes, hitElement.comments, hitElement.description);
      generateBigPicture(element);
    }
  };

  window.formConstVar.pictureList.addEventListener('click', showBigPicture);

})();
