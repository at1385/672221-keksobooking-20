'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var PIN_X_OFFSET = -25;
var PIN_Y_OFFSET = -70;
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_POINTER_HEIGHT = 22;

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

var ads = getAdsArray(8);

var map = document.querySelector('.map');
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

var mainMapPin = mapPins.querySelector('.map__pin--main');
var mapFiltersForm = map.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');
var adFormAddress = adForm.querySelector('#address');

var getMainPinCoordinate = function (offsetX, offsetY) {
  return (mainMapPin.offsetLeft + offsetX) + ', ' + (mainMapPin.offsetTop + offsetY);
};

adFormAddress.value = getMainPinCoordinate(Math.round(MAIN_PIN_SIZE / 2), Math.round(MAIN_PIN_SIZE / 2));

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
  adFormAddress.value = getMainPinCoordinate(Math.round(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_POINTER_HEIGHT);
  activateFormElements(mapFiltersForm, 'select');
  activateFormElements(mapFiltersForm, 'fieldset');
  activateFormElements(adForm, 'fieldset');
  renderPins(ads);
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

var roomQuantity = adForm.querySelector('#room_number');
var guestQuantity = adForm.querySelector('#capacity');

var compareRoomAndGuestQuantity = function () {
  if (roomQuantity.value === '1' && guestQuantity.value !== '1') {
    guestQuantity.setCustomValidity('В одной комнате можно разместить только одного гостя!');
  } else if (roomQuantity.value === '2' && guestQuantity.value !== '1' && guestQuantity.value !== '2') {
    guestQuantity.setCustomValidity('В двух комнатах можно разместить только одного или двух гостей!');
  } else if (roomQuantity.value === '3' && guestQuantity.value === '0') {
    guestQuantity.setCustomValidity('В трех комнатах можно разместить не менее одного и не более трех гостей!');
  } else if (roomQuantity.value === '100' && guestQuantity.value !== '0') {
    guestQuantity.setCustomValidity('Не для гостей!');
  } else {
    guestQuantity.setCustomValidity('');
  }
};

adForm.addEventListener('click', function () {
  compareRoomAndGuestQuantity();
});
