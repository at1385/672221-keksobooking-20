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
