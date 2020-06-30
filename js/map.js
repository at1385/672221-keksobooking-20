'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  map.insertBefore(window.card.container, mapFiltersContainer);

  var mapPins = [];

  var onMapPinClick = function (evt) {
    mapPins = window.pin.container.querySelectorAll('.map__pin');

    if (evt.target.matches('button') || evt.target.matches('img')) {
      for (var i = 1; i < mapPins.length; i++) {
        window.card.open(mapPins[i], window.ads[i - 1]);
        window.pin.container.removeEventListener('click', onMapPinClick, true);
      }
    }
  };

  var mainMapPin = window.pin.container.querySelector('.map__pin--main');
  var mapFiltersForm = map.querySelector('.map__filters');

  window.getAdressCoords(mainMapPin.offsetLeft, mainMapPin.offsetTop, window.adForm.form, window.adForm.address);

  var deactivateFormElements = function (form, elementTagName) {
    var elements = form.querySelectorAll(elementTagName);

    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  var activateFormElements = function (form, elementTagName) {
    var elements = form.querySelectorAll(elementTagName);

    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  deactivateFormElements(mapFiltersForm, 'select');
  deactivateFormElements(mapFiltersForm, 'fieldset');
  deactivateFormElements(window.adForm.form, 'fieldset');

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.adForm.form.classList.remove('ad-form--disabled');
    window.getAdressCoords(mainMapPin.offsetLeft, mainMapPin.offsetTop, window.adForm.form, window.adForm.address);
    activateFormElements(mapFiltersForm, 'select');
    activateFormElements(mapFiltersForm, 'fieldset');
    activateFormElements(window.adForm.form, 'fieldset');
    window.pin.render(window.ads);
    window.pin.container.addEventListener('click', onMapPinClick, true);
  };

  var onMainMapPinLeftClick = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      activatePage();
      mainMapPin.removeEventListener('mousedown', onMainMapPinLeftClick);
      mainMapPin.removeEventListener('keydown', onMainMapPinEnterPress);
    }
  };

  var onMainMapPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activatePage();
      mainMapPin.removeEventListener('mousedown', onMainMapPinLeftClick);
      mainMapPin.removeEventListener('keydown', onMainMapPinEnterPress);
    }
  };

  mainMapPin.addEventListener('mousedown', onMainMapPinLeftClick);
  mainMapPin.addEventListener('keydown', onMainMapPinEnterPress);

  window.mapMainPin = mainMapPin;
})();
