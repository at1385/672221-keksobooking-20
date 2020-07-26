'use strict';

(function () {
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

  adFormTitle.setAttribute('minlength', 30);
  adFormTitle.setAttribute('maxlength', 100);
  adFormTitle.setAttribute('required', true);

  adFormAddress.setAttribute('readonly', true);
  window.getAdressCoords(window.pin.main.offsetLeft, window.pin.main.offsetTop, adForm, adFormAddress);

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
