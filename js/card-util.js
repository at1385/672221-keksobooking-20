'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.cardUtil = {
    hideElement: function (element, content) {
      if (!content && content !== 0 || content.length === 0) {
        element.style.display = 'none';
      }
    },
    translateOfferType: function (offerType) {
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
    },
    fillFeatures: function (listItems) {
      for (var i = 0; i < listItems.length; i++) {
        listItems[i].textContent = FEATURES[i];
      }
    },
    hideUnavailableFeature: function (list, array) {
      for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
        for (var j = 0; j < array.length; j++) {
          if (array[j] === list[i].textContent) {
            list[i].style.display = 'inline-block';
          }
        }
      }
    },
    addPhotos: function (array, photo) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
        var newPhoto = photo.cloneNode(true);
        newPhoto.src = array[i];
        fragment.appendChild(newPhoto);
      }

      return fragment;
    }
  };
})();
