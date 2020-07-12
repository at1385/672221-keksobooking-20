'use strict';

(function () {
  var PIN_X_OFFSET = -25;
  var PIN_Y_OFFSET = -70;

  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = pinsContainer.querySelector('.map__pin--main');
  var pins = [];

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
    render: function (ads) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        fragment.appendChild(createPin(ads[i]));
      }

      pinsContainer.appendChild(fragment);

      pins = pinsContainer.querySelectorAll('.map__pin');

      for (i = 1; i < pins.length; i++) {
        window.card.open(pins[i], ads[i - 1]);
      }
    }
  };
})();
