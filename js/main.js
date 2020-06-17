'use strict';

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

// 11. Личный проект: доверяй, но проверяй (часть 1)

var mainMapPin = mapPins.querySelector('.map__pin--main');
var mapFiltersForm = map.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');

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
deactivateFormElements(adForm, 'fieldset');

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateFormElements(mapFiltersForm, 'select');
  activateFormElements(mapFiltersForm, 'fieldset');
  activateFormElements(adForm, 'fieldset');
};

mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    activatePage();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activatePage();
  }
});
