'use strict';

(function () {
  window.getAdressCoords = function (x, y, form, address) {
    var mainPinX = Math.round(x + window.data.MAIN_PIN_SIZE / 2);

    if (mainPinX < window.data.MAP_X_MIN) {
      mainPinX = window.data.MAP_X_MIN;
    } else if (mainPinX > window.data.MAP_X_MAX) {
      mainPinX = window.data.MAP_X_MAX;
    }

    if (form.classList.contains('ad-form--disabled')) {
      var mainPinY = Math.round(y + window.data.MAIN_PIN_SIZE / 2);
    } else {
      mainPinY = Math.round(y + window.data.MAIN_PIN_SIZE + window.data.MAIN_PIN_POINTER_HEIGHT);

      if (mainPinY < window.data.MAP_Y_MIN) {
        mainPinY = window.data.MAP_Y_MIN;
      } else if (mainPinY > window.data.MAP_Y_MAX) {
        mainPinY = window.data.MAP_Y_MAX;
      }
    }

    address.value = mainPinX + ', ' + mainPinY;
  };
})();
