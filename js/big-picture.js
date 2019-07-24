// Выполняемые задачи: попап изображения других пользователей
// Зависимости: constants.js, utils.js

'use strict';

(function () {
  var BIG_PICTURE = document.querySelector('.big-picture');
  var Picture = {
    IMG: BIG_PICTURE.querySelector('.big-picture__img').children[0],
    LIKES: BIG_PICTURE.querySelector('.likes-count'),
    DESCRIPTION: BIG_PICTURE.querySelector('.social__caption'),
    COMMENTS_COUNT: BIG_PICTURE.querySelector('.social__comment-count'),
    COMMENTS_QUANTITY: BIG_PICTURE.querySelector('.comments-count'),
    COMMENTS_LOADER: BIG_PICTURE.querySelector('.social__comments-loader'),
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
    var STEP = 5;
    var BEGIN_THREAD = 0;

    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();

    var addComments = function (beginComments, stepComments) {
      return function () {
        if (stepComments >= list.length) {
          stepComments = list.length;
          window.utils.hideElement(Picture.COMMENTS_LOADER);
        }
        Picture.COMMENTS_COUNT.textContent = stepComments + ' из ';
        Picture.COMMENTS_COUNT.appendChild(Picture.COMMENTS_QUANTITY);
        Picture.COMMENTS_COUNT.textContent += ' комментариев';
        for (; beginComments < stepComments; beginComments++) {
          fragment.appendChild(generateComment(commentTemplate.cloneNode(true), list[beginComments]));
        }
        stepComments += STEP;
        Picture.SOCIAL_COMMENT_LIST.appendChild(fragment);
      };
    };

    window.utils.removeChildren(Picture.SOCIAL_COMMENT_LIST, Picture.SOCIAL_COMMENT_LIST.getElementsByTagName('li'));

    if (STEP > list.length) {
      addComments(BEGIN_THREAD, list.length)();
    } else {
      var increaseComments = addComments(BEGIN_THREAD, STEP);
      increaseComments();
      window.utils.showElement(Picture.COMMENTS_COUNT);
      window.utils.showElement(Picture.COMMENTS_LOADER);
      Picture.COMMENTS_LOADER.addEventListener('click', increaseComments);
    }
  };

  var generateBigPicture = function (source) {
    Picture.IMG.src = source.url;
    Picture.LIKES.textContent = source.likes;
    Picture.DESCRIPTION.textContent = source.description;
    Picture.COMMENTS_QUANTITY.textContent = source.comments.length;
    generateCommentList(source.comments);
  };

  var hideBigPicture = function (element) {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);
      window.utils.hideElement(Picture.COMMENTS_COUNT);
      window.utils.hideElement(Picture.COMMENTS_LOADER);
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
