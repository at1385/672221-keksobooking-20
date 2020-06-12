'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var PIN_X_OFFSET = -25;
var PIN_Y_OFFSET = -70;

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getAdsArray = function (itemQuantity) {
  var ads = [];

  for (var i = 0; i < itemQuantity; i++) {
    ads[i] = {
      author: {
        avatar: 'img/avatars/user0' + ++i + '.png'
      },

      offer: {
        title: 'Заголовок',
        address: '600, 350',
        price: 10000,
        type: getRandomElement(OFFER_TYPES),
        rooms: 2,
        guests: 2,
        checkin: getRandomElement(OFFER_TIMES),
        checkout: getRandomElement(OFFER_TIMES),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'Описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },

      location: {
        x: getRandomNumber(0, 1200),
        y: getRandomNumber(200, 700)
      }
    };

    --i;
  }

  return ads;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + PIN_X_OFFSET + 'px';
  pinElement.style.top = pin.location.y + PIN_Y_OFFSET + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var renderPins = function (adsArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsArray.length; i++) {
    fragment.appendChild(createPin(adsArray[i]));
  }

  mapPins.appendChild(fragment);
};

var ads = getAdsArray(8);
renderPins(ads);

var mapFiltersContainer = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapCards = document.createElement('div');
mapCards.className = 'map__cards';

var translateOfferType = function (offerType) {
  switch (offerType) {
    case 'palace':
      offerType = 'Дворец';
      break;

    case 'flat':
      offerType = 'Квартира';
      break;

    case 'house':
      offerType = 'Дом';
      break;

    case 'bungalo':
      offerType = 'Бунгало';
      break;
  }

  return offerType;
};

var fillList = function (listItems, array) {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].textContent = array[i];
  }
};

var addPhotos = function (array, photo) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var newPhoto = photo.cloneNode(true);
    newPhoto.src = array[i];
    fragment.appendChild(newPhoto);
  }

  return fragment;
};

var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = translateOfferType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  var cardFeatures = cardElement.querySelectorAll('.popup__feature');
  fillList(cardFeatures, card.offer.features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  var cardPhoto = cardElement.querySelector('.popup__photo');
  cardElement.querySelector('.popup__photos').removeChild(cardPhoto);
  cardElement.querySelector('.popup__photos').appendChild(addPhotos(card.offer.photos, cardPhoto));

  return cardElement;
};

var renderCards = function (adsArray) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(createCard(adsArray[0]));

  map.insertBefore(mapCards, mapFiltersContainer);
  mapCards.appendChild(fragment);
};

renderCards(ads);
