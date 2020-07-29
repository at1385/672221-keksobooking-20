'use strict';

(function () {
  var MAX_HOUSING_PRICE = 1000000;

  var TitleLength = {
    MIN: 30,
    MAX: 100
  };

  var HousingType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var HousingMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adFormTitle = adForm.querySelector('#title');
  var adFormAddress = adForm.querySelector('#address');
  var adFormOfferType = adForm.querySelector('#type');
  var adFormOfferPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormRoomQuantity = adForm.querySelector('#room_number');
  var adFormGuestQuantity = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');
  window.util.disableFormElements(adForm, 'fieldset');

  adFormTitle.setAttribute('minlength', TitleLength.MIN);
  adFormTitle.setAttribute('maxlength', TitleLength.MAX);
  adFormTitle.setAttribute('required', true);

  var configureInvalidEvent = function (inputField, onInputFieldEvent) {
    inputField.style = 'border-width: 2px; border-color: red;';
    inputField.addEventListener('input', onInputFieldEvent);
  };

  var onAdFormTitleInput = function () {
    if (adFormTitle.value.length >= TitleLength.MIN) {
      adFormTitle.removeAttribute('style');
    } else {
      adFormTitle.style = 'border-width: 2px; border-color: red;';
    }
  };

  var onAdFormTitleInvalid = function () {
    configureInvalidEvent(adFormTitle, onAdFormTitleInput);
  };

  adFormTitle.addEventListener('invalid', onAdFormTitleInvalid);

  adFormAddress.setAttribute('readonly', true);
  window.getAdressCoords(window.pin.main.offsetLeft, window.pin.main.offsetTop, adForm, adFormAddress);

  var setMinPrice = function () {
    switch (adFormOfferType.value) {
      case HousingType.BUNGALO:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.BUNGALO);
        adFormOfferPrice.placeholder = 'от ' + HousingMinPrice.BUNGALO;
        break;
      case HousingType.FLAT:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.FLAT);
        adFormOfferPrice.placeholder = 'от ' + HousingMinPrice.FLAT;
        break;
      case HousingType.HOUSE:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.HOUSE);
        adFormOfferPrice.placeholder = 'от ' + HousingMinPrice.HOUSE;
        break;
      case HousingType.PALACE:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.PALACE);
        adFormOfferPrice.placeholder = 'от ' + HousingMinPrice.PALACE;
    }
  };

  var onOfferTypeChange = function () {
    setMinPrice();
  };

  setMinPrice();
  adFormOfferType.addEventListener('change', onOfferTypeChange);

  adFormOfferPrice.setAttribute('max', MAX_HOUSING_PRICE);
  adFormOfferPrice.setAttribute('required', true);

  var onAdFormOfferPriceInput = function () {
    if ((adFormOfferType.value === HousingType.BUNGALO && adFormOfferPrice.value >= HousingMinPrice.BUNGALO) ||
        (adFormOfferType.value === HousingType.FLAT && adFormOfferPrice.value >= HousingMinPrice.FLAT) ||
        (adFormOfferType.value === HousingType.HOUSE && adFormOfferPrice.value >= HousingMinPrice.HOUSE) ||
        (adFormOfferType.value === HousingType.PALACE && adFormOfferPrice.value >= HousingMinPrice.PALACE)) {
      adFormOfferPrice.removeAttribute('style');
    } else {
      adFormOfferPrice.style = 'border-width: 2px; border-color: red;';
    }
  };

  var onAdFormOfferPriceInvalid = function () {
    configureInvalidEvent(adFormOfferPrice, onAdFormOfferPriceInput);
  };

  adFormOfferPrice.addEventListener('invalid', onAdFormOfferPriceInvalid);

  var synchronizeTime = function (chosenTime, adaptiveTime) {
    switch (chosenTime.value) {
      case '12:00':
        adaptiveTime.value = '12:00';
        break;
      case '13:00':
        adaptiveTime.value = '13:00';
        break;
      case '14:00':
        adaptiveTime.value = '14:00';
    }
  };

  var onTimeOutChange = function () {
    synchronizeTime(adFormTimeIn, adFormTimeOut);
  };

  var onTimeInChange = function () {
    synchronizeTime(adFormTimeOut, adFormTimeIn);
  };

  adFormTimeIn.addEventListener('change', onTimeOutChange);
  adFormTimeOut.addEventListener('change', onTimeInChange);

  var compareRoomAndGuestQuantity = function () {
    if (adFormRoomQuantity.value === '1' && adFormGuestQuantity.value !== '1') {
      adFormGuestQuantity.setCustomValidity('1 комната только для 1-го гостя!');
    } else if (adFormRoomQuantity.value === '2' && adFormGuestQuantity.value !== '1' && adFormGuestQuantity.value !== '2') {
      adFormGuestQuantity.setCustomValidity('2 комнаты только для 1-го или 2-х гостей!');
    } else if (adFormRoomQuantity.value === '3' && adFormGuestQuantity.value === '0') {
      adFormGuestQuantity.setCustomValidity('3 комнаты только для 1-го, 2-ух или 3-х гостей!');
    } else if (adFormRoomQuantity.value === '100' && adFormGuestQuantity.value !== '0') {
      adFormGuestQuantity.setCustomValidity('Не для гостей!');
    } else {
      adFormGuestQuantity.setCustomValidity('');
    }
  };

  var removeInputEvent = function (inputField, onInputFieldEvent) {
    inputField.removeAttribute('style');
    inputField.removeEventListener('input', onInputFieldEvent);
  };

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.setOriginalState();
    removeInputEvent(adFormTitle, onAdFormTitleInput);
    removeInputEvent(adFormOfferPrice, onAdFormOfferPriceInput);
  });

  adForm.addEventListener('click', function () {
    compareRoomAndGuestQuantity();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), window.adFormSend.onSuccess, window.adFormSend.onError);
    adFormTitle.removeEventListener('input', onAdFormTitleInput);
    adFormOfferPrice.removeEventListener('input', onAdFormOfferPriceInput);
  });

  window.adForm = {
    form: adForm,
    address: adFormAddress
  };
})();
