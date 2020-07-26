'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardsContainer = document.createElement('div');
  cardsContainer.className = 'map__cards';

  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    window.cardUtil.hideElement(cardElement.querySelector('.popup__avatar'), card.author.avatar);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    window.cardUtil.hideElement(cardElement.querySelector('.popup__title'), card.offer.title);

    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    window.cardUtil.hideElement(cardElement.querySelector('.popup__text--address'), card.offer.address);

    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    window.cardUtil.hideElement(cardElement.querySelector('.popup__text--price'), card.offer.price);

    cardElement.querySelector('.popup__type').textContent = window.cardUtil.translateOfferType(card.offer.type);
    window.cardUtil.hideElement(cardElement.querySelector('.popup__type'), card.offer.type);

    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    window.cardUtil.hideElement(cardElement.querySelector('.popup__text--capacity'), card.offer.rooms);

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    window.cardUtil.hideElement(cardElement.querySelector('.popup__text--time'), card.offer.checkin);

    var cardFeatures = cardElement.querySelectorAll('.popup__feature');
    window.cardUtil.fillFeatures(cardFeatures);
    window.cardUtil.hideUnavailableFeature(cardFeatures, card.offer.features);
    window.cardUtil.hideElement(cardElement.querySelector('.popup__features'), card.offer.features);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    window.cardUtil.hideElement(cardElement.querySelector('.popup__description'), card.offer.description);

    var cardPhoto = cardElement.querySelector('.popup__photo');
    cardElement.querySelector('.popup__photos').removeChild(cardPhoto);
    cardElement.querySelector('.popup__photos').appendChild(window.cardUtil.addPhotos(card.offer.photos, cardPhoto));
    window.cardUtil.hideElement(cardElement.querySelector('.popup__photos'), card.offer.photos);

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
