'use strict';

var MAX_QUANTITY_COMMENTS = 3;
var MAX_QUANTITY_TEXT_COMMENTS = 2;
var MAX_QUANTITY_LIKES = 250;

var photosQuantity = 25;
var photosUlrList = [];
var commentsListAll = [];
var commentsTextList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var commentatorsNameList = [
  'Алина', 'Полина', 'Дарья', 'Коля', 'Максим', 'Вадим'
];
var photosList = [];
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var shuffleList = function (list) {
  var y;
  var x;
  for (var i = list.length - 1; i > 0; i--) {
    y = randomInteger(0, i);
    x = list[i];
    list[i] = list[y];
    list[y] = x;
  }
  return list;
};

var generatePhotosUrlList = function (quantity) {
  var urlList = [];
  for (var i = 1; i <= quantity; i++) {
    urlList.push('photos/' + i + '.jpg');
  }
  return shuffleList(urlList);
};

var generateCommentatorList = function (names) {
  var listCommentators = [];
  var shuffleNames = shuffleList(names);

  for (var i = 0; i < shuffleNames.length; i++) {
    var commentator = {};
    commentator.name = shuffleNames[i];
    commentator.avatar = 'img/avatar-' + (i + 1) + '.svg';
    listCommentators.push(commentator);
  }

  return listCommentators;
};

var generatePhotoComment = function (commentatorsList) {
  var comments = [];
  var quantityRandom = randomInteger(1, MAX_QUANTITY_COMMENTS);
  for (var i = 0; i < quantityRandom; i++) {
    var comment = {};
    comment.message = '';
    var countComments = randomInteger(1, MAX_QUANTITY_TEXT_COMMENTS);
    var countComentator = randomInteger(0, commentatorsList.length - 1);

    comment.avatar = commentatorsList[countComentator].avatar;

    for (var j = 0; j <= countComments; j++) {
      comment.message += commentsTextList[randomInteger(0, commentsTextList.length - 1)];
      if (countComments === 1 && j === 0) {
        comment.message += ' ';
      }
    }

    comment.name = commentatorsList[countComentator].name;

    comments.push(comment);
  }
  return comments;
};

var generatePhotoCommentsList = function (quantity) {
  var commentsList = [];
  var listCommentators = generateCommentatorList(commentatorsNameList);
  for (var i = 0; i < quantity; i++) {
    commentsList.push(generatePhotoComment(listCommentators));
  }
  return commentsList;
};

var generatePhotos = function (quantity, urls, comments) {
  var photos = [];
  for (var i = 0; i < quantity; i++) {
    var photoObject = {};
    photoObject.url = urls[i];
    photoObject.likes = randomInteger(1, MAX_QUANTITY_LIKES);
    photoObject.comments = comments[i];
    photos.push(photoObject);
  }
  return photos;
};

var generatePicture = function (template, pictureItem) {
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.picture__img').src = pictureItem.url;
  templateElement.querySelector('.picture__likes').textContent = pictureItem.likes + '';
  templateElement.querySelector('.picture__comments').textContent = pictureItem.comments.length + '';
  return templateElement;
};

var generatePicturesList = function (list, parentElement) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    fragment.appendChild(generatePicture(pictureTemplate, list[i]));
  }
  parentElement.appendChild(fragment);
};

photosUlrList = generatePhotosUrlList(photosQuantity);
commentsListAll = generatePhotoCommentsList(photosQuantity);
photosList = generatePhotos(photosQuantity, photosUlrList, commentsListAll);

generatePicturesList(photosList, pictureList);
