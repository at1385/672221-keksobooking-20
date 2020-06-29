'use strict';

(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_POINTER_HEIGHT = 22;

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

  var getMainPinCoordinate = function (offsetX, offsetY) {
    return (mainMapPin.offsetLeft + offsetX) + ', ' + (mainMapPin.offsetTop + offsetY);
  };

  window.adForm.address.value = getMainPinCoordinate(Math.round(MAIN_PIN_SIZE / 2), Math.round(MAIN_PIN_SIZE / 2));

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
    window.adForm.address.value = getMainPinCoordinate(Math.round(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_POINTER_HEIGHT);
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
})();
