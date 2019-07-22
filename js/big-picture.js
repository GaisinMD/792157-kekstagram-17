// Выполняемые задачи: попап изображения других пользователей
// Зависимости: constants.js, utils.js

'use strict';

(function () {
  var BIG_PICTURE = document.querySelector('.big-picture');
  var Picture = {
    IMG: BIG_PICTURE.querySelector('.big-picture__img').children[0],
    LIKES: BIG_PICTURE.querySelector('.likes-count'),
    DESCRIPTION: BIG_PICTURE.querySelector('.social__caption'),
    COMMENTS_COUNT: BIG_PICTURE.querySelector('.comments-count'),
    SOCIAL_COMMENT_LIST: BIG_PICTURE.querySelector('.social__comments'),
    COMMENT_INPUT: BIG_PICTURE.querySelector('.social__footer-text'),
    CLOSE_BUTTON: BIG_PICTURE.querySelector('.big-picture__cancel')
  };

  var PictureItem = function (url, likes, comments, description) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  };

  var generateComment = function (template, commentItem) {
    var avatar = template.querySelector('.social__picture');
    avatar.src = commentItem.avatar;
    avatar.alt = commentItem.name;
    template.querySelector('.social__text').textContent = commentItem.message;
    return template;
  };

  var generateCommentList = function (list) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();

    window.utils.removeChildren(Picture.SOCIAL_COMMENT_LIST, Picture.SOCIAL_COMMENT_LIST.getElementsByTagName('li'));

    list.forEach(function (elem) {
      fragment.appendChild(generateComment(commentTemplate.cloneNode(true), elem));
    });

    Picture.SOCIAL_COMMENT_LIST.appendChild(fragment);
  };

  var generateBigPicture = function (source) {
    Picture.IMG.src = source.url;
    Picture.LIKES.textContent = source.likes;
    Picture.DESCRIPTION.textContent = source.description;
    Picture.COMMENTS_COUNT.textContent = source.comments.length;
    generateCommentList(source.comments);
  };

  var hideBigPicture = function (element) {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);
    }
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE && evt.target !== Picture.COMMENTS_INPUT) {
      hideBigPicture(BIG_PICTURE);
    }
  };

  var showBigPicture = function (evt) {
    var target = evt.target;
    var hitElement;

    while (target !== window.constants.pictureList) {
      if (target.classList.contains('picture')) {
        window.utils.showElement(BIG_PICTURE);
        document.addEventListener('keydown', onBigPictureEscPress);
        hitElement = window.constants.PHOTOS_LIST.slice().filter(function (i) {
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

  window.constants.pictureList.addEventListener('click', showBigPicture);

  Picture.CLOSE_BUTTON.addEventListener('click', function (evt) {
    evt.preventDefault();
    hideBigPicture(BIG_PICTURE);
  });

})();
