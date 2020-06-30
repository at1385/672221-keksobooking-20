'use strict';

(function () {
  var leftEdge = window.data.MAP_X_MIN - Math.round(window.data.MAIN_PIN_SIZE / 2);
  var rightEdge = Math.round(window.data.MAP_X_MAX - window.data.MAIN_PIN_SIZE / 2);
  var topEdge = window.data.MAP_Y_MIN - (window.data.MAIN_PIN_SIZE + window.data.MAIN_PIN_POINTER_HEIGHT);
  var bottomEdge = window.data.MAP_Y_MAX - (window.data.MAIN_PIN_SIZE + window.data.MAIN_PIN_POINTER_HEIGHT);

  window.mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mainPinCoords = {
        x: window.mapMainPin.offsetLeft,
        y: window.mapMainPin.offsetTop
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.mapMainPin.style.top = (window.mapMainPin.offsetTop - shift.y) + 'px';
        window.mapMainPin.style.left = (window.mapMainPin.offsetLeft - shift.x) + 'px';

        mainPinCoords.x = window.mapMainPin.offsetLeft - shift.x;
        mainPinCoords.y = window.mapMainPin.offsetTop - shift.y;

        if (window.mapMainPin.offsetLeft - shift.x < leftEdge) {
          window.mapMainPin.style.left = leftEdge + 'px';
        }
        if (window.mapMainPin.offsetLeft - shift.x > rightEdge) {
          window.mapMainPin.style.left = rightEdge + 'px';
        }
        if (window.mapMainPin.offsetTop - shift.y < topEdge) {
          window.mapMainPin.style.top = topEdge + 'px';
        }
        if (window.mapMainPin.offsetTop - shift.y > bottomEdge) {
          window.mapMainPin.style.top = bottomEdge + 'px';
        }

        window.getAdressCoords(mainPinCoords.x, mainPinCoords.y, window.adForm.form, window.adForm.address);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        window.getAdressCoords(mainPinCoords.x, mainPinCoords.y, window.adForm.form, window.adForm.address);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
