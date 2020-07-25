'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardsContainer = document.createElement('div');
  cardsContainer.className = 'map__cards';

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

  var hideUnavailableFeature = function (list, array) {
    for (var i = 0; i < list.length; i++) {
      list[i].style.display = 'none';
      for (var j = 0; j < array.length; j++) {
        if (array[j] === list[i].textContent) {
          list[i].style.display = 'inline-block';
        }
      }
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
    window.util.hideElement(cardElement.querySelector('.popup__avatar'), card.author.avatar);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    window.util.hideElement(cardElement.querySelector('.popup__title'), card.offer.title);

    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    window.util.hideElement(cardElement.querySelector('.popup__text--address'), card.offer.address);

    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    window.util.hideElement(cardElement.querySelector('.popup__text--price'), card.offer.price);

    cardElement.querySelector('.popup__type').textContent = translateOfferType(card.offer.type);
    window.util.hideElement(cardElement.querySelector('.popup__type'), card.offer.type);

    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    window.util.hideElement(cardElement.querySelector('.popup__text--capacity'), card.offer.rooms);

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    window.util.hideElement(cardElement.querySelector('.popup__text--time'), card.offer.checkin);

    var cardFeatures = cardElement.querySelectorAll('.popup__feature');
    fillList(cardFeatures, FEATURES);
    hideUnavailableFeature(cardFeatures, card.offer.features);
    window.util.hideElement(cardElement.querySelector('.popup__features'), card.offer.features);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    window.util.hideElement(cardElement.querySelector('.popup__description'), card.offer.description);

    var cardPhoto = cardElement.querySelector('.popup__photo');
    cardElement.querySelector('.popup__photos').removeChild(cardPhoto);
    cardElement.querySelector('.popup__photos').appendChild(addPhotos(card.offer.photos, cardPhoto));
    window.util.hideElement(cardElement.querySelector('.popup__photos'), card.offer.photos);

    return cardElement;
  };

  var closeCard = function () {
    cardsContainer.removeChild(cardsContainer.firstChild);
    window.pin.container.querySelector('.map__pin--active').classList.remove('map__pin--active');
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardEscPress = function (evt) {
    window.util.isEscPress(evt, closeCard);
  };

  window.card = {
    container: cardsContainer,
    render: function (ad) {
      if (cardsContainer.firstChild) {
        closeCard();
      }

      var adCard = createCard(ad);
      cardsContainer.appendChild(adCard);
    },
    open: function (mapPin, adCard) {
      mapPin.addEventListener('click', function () {
        window.card.render(adCard);
        mapPin.classList.add('map__pin--active');

        var closeCardButton = cardsContainer.querySelector('.popup__close');
        closeCardButton.addEventListener('click', function () {
          closeCard();
        });

        document.addEventListener('keydown', onCardEscPress);
      });
    },
    close: closeCard
  };
})();
