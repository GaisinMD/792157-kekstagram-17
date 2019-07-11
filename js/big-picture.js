// Выполняемые задачи: попап изображения других пользователей
// Зависимости: constants.js

'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var picture = {
    img: bigPicture.querySelector('.big-picture__img').children[0],
    likes: bigPicture.querySelector('.likes-count'),
    description: bigPicture.querySelector('.social__caption'),
    commentsCount: bigPicture.querySelector('.comments-count'),
    socialCommentList: bigPicture.querySelector('.social__comments'),
    commentInput: bigPicture.querySelector('.social__footer-text'),
    closeButton: bigPicture.querySelector('.big-picture__cancel')
  };

  var PictureItem = function (url, likes, comments, description) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  };

  var generateComment = function (template, commentItem) {
    template.querySelector('.social__picture').src = commentItem.avatar;
    template.querySelector('.social__text').textContent = commentItem.message;
    return template;
  };

  var generateCommentList = function (list) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();

    window.utils.removeChildren(picture.socialCommentList, picture.socialCommentList.getElementsByTagName('li'));

    list.forEach(function (elem) {
      fragment.appendChild(generateComment(commentTemplate.cloneNode(true), elem));
    });

    picture.socialCommentList.appendChild(fragment);
  };

  var generateBigPicture = function (source) {
    picture.img.src = source.url;
    picture.likes.textContent = source.likes;
    picture.description.textContent = source.description;
    picture.commentsCount.textContent = source.comments.length;
    generateCommentList(source.comments);
  };

  var hideBigPicture = function (element) {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);
    }
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.formConstVar.ESC_KEYCODE && evt.target !== picture.commentInput) {
      hideBigPicture(bigPicture);
    }
  };

  var showBigPicture = function (evt) {
    var target = evt.target;
    var hitElement;

    while (target !== window.formConstVar.pictureList) {
      if (target.classList.contains('picture')) {
        window.utils.showElement(bigPicture);
        document.addEventListener('keydown', onBigPictureEscPress);
        hitElement = window.formConstVar.PHOTOS_LIST.slice().filter(function (i) {
          return (target.querySelector('.picture__img').src.search(i.url) >= 0);
        })[0];
      }
      target = target.parentNode;
    }

    if (hitElement) {
      var element = new PictureItem(hitElement.url, hitElement.likes, hitElement.comments, hitElement.description);
      generateBigPicture(element);
    }
  };

  window.formConstVar.pictureList.addEventListener('click', showBigPicture);

  picture.closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    hideBigPicture(bigPicture);
  });

})();
