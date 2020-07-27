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
    hideUnavailableFeature: function (features, array) {
      for (var i = 0; i < features.length; i++) {
        features[i].style.display = 'none';

        array.forEach(function (element) {
          if (element === features[i].textContent) {
            features[i].style.display = 'inline-block';
          }
        });
      }
    },
    addPhotos: function (array, photo) {
      var fragment = document.createDocumentFragment();

      array.forEach(function (element) {
        var newPhoto = photo.cloneNode(true);
        newPhoto.src = element;
        fragment.appendChild(newPhoto);
      });

      return fragment;
    }
  };
})();
