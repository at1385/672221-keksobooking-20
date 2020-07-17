'use strict';

(function () {
  var ADS_QUANTITY = 5;

  window.adsDownload = function (ads) {
    var fragment = document.createDocumentFragment();
    var adsLength = ads.length > ADS_QUANTITY ? ADS_QUANTITY : ads.length;

    for (var i = 0; i < adsLength; i++) {
      fragment.appendChild(window.pin.create(ads[i]));
    }

    window.pin.container.appendChild(fragment);

    window.util.enableFormElements(window.map.filtersForm, 'select');
    window.util.enableFormElements(window.map.filtersForm, 'fieldset');

    window.pin.collection = window.pin.container.querySelectorAll('.map__pin');

    for (i = 1; i < window.pin.collection.length; i++) {
      window.card.open(window.pin.collection[i], ads[i - 1]);
    }
  };
})();
