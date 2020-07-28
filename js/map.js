'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  map.insertBefore(window.card.container, mapFiltersContainer);

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.adForm.form.classList.remove('ad-form--disabled');
    window.getAdressCoords(window.pin.main.offsetLeft, window.pin.main.offsetTop, window.adForm.form, window.adForm.address);
    window.util.enableFormElements(window.adForm.form, 'fieldset');
    window.server.download(window.ads.download, window.server.onError);
    window.pin.main.removeEventListener('mousedown', onMainPinLeftClick);
    window.pin.main.removeEventListener('keydown', onMainPinEnterPress);
  };

  var onMainPinLeftClick = function (evt) {
    window.util.isLeftClick(evt, activatePage);
  };

  var onMainPinEnterPress = function (evt) {
    window.util.isEnterPress(evt, activatePage);
  };

  window.pin.main.addEventListener('mousedown', onMainPinLeftClick);
  window.pin.main.addEventListener('keydown', onMainPinEnterPress);

  window.map = {
    block: map,
    onMainPinLeftClick: onMainPinLeftClick,
    onMainPinEnterPress: onMainPinEnterPress
  };
})();
