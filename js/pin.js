'use strict';

(function () {
  var PIN_X_OFFSET = -25;
  var PIN_Y_OFFSET = -70;
  var PINS_QUANTITY = 5;

  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = pinsContainer.querySelector('.map__pin--main');

  var createPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + PIN_X_OFFSET + 'px';
    pinElement.style.top = pin.location.y + PIN_Y_OFFSET + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };

  window.pin = {
    container: pinsContainer,
    main: mainPin,
    collection: [],
    render: function (data) {
      var fragment = document.createDocumentFragment();
      var pinsLength = data.length > PINS_QUANTITY ? PINS_QUANTITY : data.length;

      for (var i = 0; i < pinsLength; i++) {
        fragment.appendChild(createPin(data[i]));
      }

      window.pin.container.appendChild(fragment);
    },
    getRelevantCards: function () {
      window.pin.collection = pinsContainer.querySelectorAll('.map__pin');

      for (var i = 1; i < window.pin.collection.length; i++) {
        for (var j = 0; j < window.ads.data.length; j++) {
          if (window.pin.collection[i].querySelector('img').alt === window.ads.data[j].offer.title) {
            window.card.open(window.pin.collection[i], window.ads.data[j]);
            break;
          }
        }
      }
    }
  };
})();
