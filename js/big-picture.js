// Выполняемые задачи: попап изображения других пользователей
// Зависимости: constants.js

'use strict';

(function () {
  var BIG_PICTURE = document.querySelector('.big-picture');
  var Picture = {
    img: BIG_PICTURE.querySelector('.big-picture__img').children[0],
    likes: BIG_PICTURE.querySelector('.likes-count'),
    description: BIG_PICTURE.querySelector('.social__caption'),
    commentsCount: BIG_PICTURE.querySelector('.comments-count'),
    socialCommentList: BIG_PICTURE.querySelector('.social__comments'),
    commentInput: BIG_PICTURE.querySelector('.social__footer-text'),
    closeButton: BIG_PICTURE.querySelector('.big-picture__cancel')
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

    window.utils.removeChildren(Picture.socialCommentList, Picture.socialCommentList.getElementsByTagName('li'));

    list.forEach(function (elem) {
      fragment.appendChild(generateComment(commentTemplate.cloneNode(true), elem));
    });

    Picture.socialCommentList.appendChild(fragment);
  };

  var generateBigPicture = function (source) {
    Picture.img.src = source.url;
    Picture.likes.textContent = source.likes;
    Picture.description.textContent = source.description;
    Picture.commentsCount.textContent = source.comments.length;
    generateCommentList(source.comments);
  };

  var hideBigPicture = function (element) {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);
    }
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.formConstVar.ESC_KEYCODE && evt.target !== Picture.commentInput) {
      hideBigPicture(BIG_PICTURE);
    }
  };

  var showBigPicture = function (evt) {
    var target = evt.target;
    var hitElement;

    while (target !== window.formConstVar.pictureList) {
      if (target.classList.contains('picture')) {
        window.utils.showElement(BIG_PICTURE);
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

  Picture.closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    hideBigPicture(BIG_PICTURE);
  });

})();
