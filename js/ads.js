'use strict';

(function () {
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];

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

  window.ads = getAdsArray(8);
})();
