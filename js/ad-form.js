'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormTitle = adForm.querySelector('#title');
  var adFormOfferType = adForm.querySelector('#type');
  var adFormOfferPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormRoomQuantity = adForm.querySelector('#room_number');
  var adFormGuestQuantity = adForm.querySelector('#capacity');
  var adFormUserAvatar = adForm.querySelector('#avatar');
  var adFormOfferImages = adForm.querySelector('#images');

  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');

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

  window.adForm = {
    form: adForm,
    address: adFormAddress
  };
})();
