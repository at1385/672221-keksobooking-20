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

  adFormAddress.setAttribute('readonly', true);
  window.getAdressCoords(window.pin.main.offsetLeft, window.pin.main.offsetTop, adForm, adFormAddress);

  var setMinPrice = function () {
    switch (adFormOfferType.value) {
      case HousingType.BUNGALO:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.BUNGALO);
        adFormOfferPrice.placeholder = HousingMinPrice.BUNGALO;
        break;
      case HousingType.FLAT:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.FLAT);
        adFormOfferPrice.placeholder = HousingMinPrice.FLAT;
        break;
      case HousingType.HOUSE:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.HOUSE);
        adFormOfferPrice.placeholder = HousingMinPrice.HOUSE;
        break;
      case HousingType.PALACE:
        adFormOfferPrice.setAttribute('min', HousingMinPrice.PALACE);
        adFormOfferPrice.placeholder = HousingMinPrice.PALACE;
    }
  };

  var onOfferTypeChange = function () {
    setMinPrice();
  };

  setMinPrice();
  adFormOfferType.addEventListener('change', onOfferTypeChange);

  adFormOfferPrice.setAttribute('max', MAX_HOUSING_PRICE);
  adFormOfferPrice.setAttribute('required', true);

  var onTimeOutChange = function () {
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

  var onTimeInChange = function () {
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

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (window.card.container.firstChild) {
      window.card.close();
    }

    for (var i = 1; i < window.pin.collection.length; i++) {
      window.pin.container.removeChild(window.pin.collection[i]);
    }

    window.fiters.form.reset();
    adForm.reset();
    window.util.setDefaultCoords();
    window.getAdressCoords(window.pin.main.offsetLeft, window.pin.main.offsetTop, adForm, adFormAddress);
    window.adFormImages.reset();

    window.pin.render(window.ads.array);
    window.pin.getRelevantCards();
  });

  adForm.addEventListener('click', function () {
    compareRoomAndGuestQuantity();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), window.adFormSend.onSuccess, window.adFormSend.onError);
  });

  window.adForm = {
    form: adForm,
    address: adFormAddress
  };
})();
