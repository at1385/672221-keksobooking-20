'use strict';

(function () {
  var USER_AVATAR_WIDTH = 40;
  var USER_AVATAR_HEIGHT = 44;
  var USER_AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';
  var USER_AVATAR_ALT = 'Аватар пользователя';
  var OFFER_PHOTO_WIDTH = 70;
  var OFFER_PHOTO_HEIGHT = 70;
  var OFFER_PHOTO_ALT = 'Фотография жилья';

  var adFormUserAvatarChooser = window.adForm.form.querySelector('#avatar');
  var adFormUserAvatarContainer = window.adForm.form.querySelector('.ad-form-header__preview');
  var adFormUserAvatarPreview = adFormUserAvatarContainer.querySelector('img');
  var adFormOfferImagesChooser = window.adForm.form.querySelector('#images');
  var adFormOfferImagesContainer = window.adForm.form.querySelector('.ad-form__photo');

  adFormUserAvatarChooser.setAttribute('accept', 'image/png, image/jpeg');
  adFormUserAvatarChooser.addEventListener('change', window.util.setImage.bind(null, adFormUserAvatarChooser, USER_AVATAR_WIDTH, USER_AVATAR_HEIGHT, USER_AVATAR_ALT, adFormUserAvatarContainer));

  adFormOfferImagesChooser.setAttribute('accept', 'image/png, image/jpeg');
  adFormOfferImagesChooser.addEventListener('change', window.util.setImage.bind(null, adFormOfferImagesChooser, OFFER_PHOTO_WIDTH, OFFER_PHOTO_HEIGHT, OFFER_PHOTO_ALT, adFormOfferImagesContainer));

  window.adFormImages = {
    reset: function () {
      if (adFormUserAvatarPreview.src !== USER_AVATAR_DEFAULT_SRC) {
        adFormUserAvatarPreview.src = USER_AVATAR_DEFAULT_SRC;
      }
      if (adFormOfferImagesContainer.firstChild) {
        adFormOfferImagesContainer.removeChild(adFormOfferImagesContainer.firstChild);
      }
    }
  };
})();
