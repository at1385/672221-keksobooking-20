'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.cardUtil = {
    hideElement: function (element, content) {
      if (!content && content !== 0 || content.length === 0) {
        element.style.display = 'none';
      }
    },
    typeNameEngToRus: {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    },
    fillFeatures: function (features) {
      for (var i = 0; i < features.length; i++) {
        features[i].textContent = FEATURES[i];
      }
    },
    hideUnavailableFeatures: function (features, adFeatures) {
      features.forEach(function (element) {
        element.style.display = (adFeatures.indexOf(element.textContent) >= 0) ? 'inline-block' : 'none';
      });
    },
    addPhotos: function (adPhotos, photo) {
      var fragment = document.createDocumentFragment();

      adPhotos.forEach(function (element) {
        var newPhoto = photo.cloneNode(true);
        newPhoto.src = element;
        fragment.appendChild(newPhoto);
      });

      return fragment;
    }
  };
})();
