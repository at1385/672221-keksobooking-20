'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var PIN_X_OFFSET = -25;
var PIN_Y_OFFSET = -70;
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_POINTER_HEIGHT = 22;

// Создание массива объявлений
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

// Создание пинов объявлений
var map = document.querySelector('.map');
var mapPinsContainer = map.querySelector('.map__pins');
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

  mapPinsContainer.appendChild(fragment);
};

// Создание карточки объявления
var mapFiltersContainer = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapCardsContainer = document.createElement('div');
mapCardsContainer.className = 'map__cards';
map.insertBefore(mapCardsContainer, mapFiltersContainer);

var translateOfferType = function (offerType) {
  switch (offerType) {
    case 'palace':
      offerType = 'Дворец';
      break;

    case 'flat':
      offerType = 'Квартира';
      break;

    case 'house':
      offerType = 'Дом';
      break;

    case 'bungalo':
      offerType = 'Бунгало';
      break;
  }

  return offerType;
};

var fillList = function (listItems, array) {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].textContent = array[i];
  }
};

var addPhotos = function (array, photo) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var newPhoto = photo.cloneNode(true);
    newPhoto.src = array[i];
    fragment.appendChild(newPhoto);
  }

  return fragment;
};

var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = translateOfferType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  var cardFeatures = cardElement.querySelectorAll('.popup__feature');
  fillList(cardFeatures, card.offer.features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  var cardPhoto = cardElement.querySelector('.popup__photo');
  cardElement.querySelector('.popup__photos').removeChild(cardPhoto);
  cardElement.querySelector('.popup__photos').appendChild(addPhotos(card.offer.photos, cardPhoto));

  return cardElement;
};

var renderCard = function (ad) {
  var adCard = createCard(ad);
  mapCardsContainer.appendChild(adCard);
};

// Открытие карточки объявления
var mapPins = [];

var openCard = function (mapPin, adCard) {
  mapPin.addEventListener('click', function () {
    if (mapCardsContainer.firstChild) {
      mapCardsContainer.removeChild(mapCardsContainer.firstChild);
    }

    renderCard(adCard);

    var closeCardButton = mapCardsContainer.querySelector('.popup__close');

    var closeCard = function () {
      mapCardsContainer.removeChild(mapCardsContainer.firstChild);
    };

    var onCardEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCard();
        document.removeEventListener('keydown', onCardEscPress);
      }
    };

    document.addEventListener('keydown', onCardEscPress);

    closeCardButton.addEventListener('click', function () {
      closeCard();
      document.removeEventListener('keydown', onCardEscPress);
    });
  });
};

var onMapPinClick = function (evt) {
  mapPins = mapPinsContainer.querySelectorAll('.map__pin');

  if (evt.target.matches('button') || evt.target.matches('img')) {
    for (var i = 1; i < mapPins.length; i++) {
      openCard(mapPins[i], ads[i - 1]);
      mapPinsContainer.removeEventListener('click', onMapPinClick, true);
    }
  }
};

// Деактивация/Активация страницы
var mainMapPin = mapPinsContainer.querySelector('.map__pin--main');
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
  mapPinsContainer.addEventListener('click', onMapPinClick, true);
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

// Валидация adForm
var adFormTitle = adForm.querySelector('#title');
var adFormOfferType = adForm.querySelector('#type');
var adFormOfferPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormRoomQuantity = adForm.querySelector('#room_number');
var adFormGuestQuantity = adForm.querySelector('#capacity');
var adFormUserAvatar = adForm.querySelector('#avatar');
var adFormOfferImages = adForm.querySelector('#images');

adFormTitle.setAttribute('minlength', 30);
adFormTitle.setAttribute('maxlength', 100);
adFormTitle.setAttribute('required', true);

adFormAddress.setAttribute('readonly', true);

var setMinPrice = function () {
  switch (adFormOfferType.value) {
    case 'bungalo':
      adFormOfferPrice.setAttribute('min', 0);
      adFormOfferPrice.placeholder = '0';
      break;
    case 'flat':
      adFormOfferPrice.setAttribute('min', 1000);
      adFormOfferPrice.placeholder = '1000';
      break;
    case 'house':
      adFormOfferPrice.setAttribute('min', 5000);
      adFormOfferPrice.placeholder = '5000';
      break;
    case 'palace':
      adFormOfferPrice.setAttribute('min', 10000);
      adFormOfferPrice.placeholder = '10000';
  }
};

setMinPrice();
adFormOfferType.addEventListener('change', setMinPrice);

adFormOfferPrice.setAttribute('max', 1000000);
adFormOfferPrice.setAttribute('required', true);

var setTimeOut = function () {
  switch (adFormTimeIn.value) {
    case '12:00':
      adFormTimeOut.value = '12:00';
      break;
    case '13:00':
      adFormTimeOut.value = '13:00';
      break;
    case '14:00':
      adFormTimeOut.value = '14:00';
  }
};

var setTimeIn = function () {
  switch (adFormTimeOut.value) {
    case '12:00':
      adFormTimeIn.value = '12:00';
      break;
    case '13:00':
      adFormTimeIn.value = '13:00';
      break;
    case '14:00':
      adFormTimeIn.value = '14:00';
  }
};

adFormTimeIn.addEventListener('change', setTimeOut);
adFormTimeOut.addEventListener('change', setTimeIn);

var compareRoomAndGuestQuantity = function () {
  if (adFormRoomQuantity.value === '1' && adFormGuestQuantity.value !== '1') {
    adFormGuestQuantity.setCustomValidity('В одной комнате можно разместить только одного гостя!');
  } else if (adFormRoomQuantity.value === '2' && adFormGuestQuantity.value !== '1' && adFormGuestQuantity.value !== '2') {
    adFormGuestQuantity.setCustomValidity('В двух комнатах можно разместить только одного или двух гостей!');
  } else if (adFormRoomQuantity.value === '3' && adFormGuestQuantity.value === '0') {
    adFormGuestQuantity.setCustomValidity('В трех комнатах можно разместить не менее одного и не более трех гостей!');
  } else if (adFormRoomQuantity.value === '100' && adFormGuestQuantity.value !== '0') {
    adFormGuestQuantity.setCustomValidity('Не для гостей!');
  } else {
    adFormGuestQuantity.setCustomValidity('');
  }
};

adFormUserAvatar.setAttribute('accept', 'image/png, image/jpeg');
adFormOfferImages.setAttribute('accept', 'image/png, image/jpeg');

adForm.addEventListener('click', function () {
  compareRoomAndGuestQuantity();
});
