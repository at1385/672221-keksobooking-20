'use strict';

(function () {
  var FILTER_DEFAULT_VALUE = 'any';

  var PriceRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');
  var priceFilter = filters.querySelector('#housing-price');
  var roomsFilter = filters.querySelector('#housing-rooms');
  var guestsFilter = filters.querySelector('#housing-guests');
  var featuresFilter = filters.querySelector('#housing-features');

  window.util.disableFormElements(filters, 'select');
  window.util.disableFormElements(filters, 'fieldset');

  var updateAds = function () {
    if (window.card.container.firstChild) {
      window.card.close();
    }

    var i = 1;
    window.util.deleteChilds('.map__pins', '.map__pin', i);

    var checkedFeatures = Array.from(featuresFilter.querySelectorAll('input:checked'));

    var filterByPrice = function (ad) {
      switch (priceFilter.value) {
        case PriceRange.MIDDLE:
          return ad.offer.price >= 10000 && ad.offer.price <= 50000;
        case PriceRange.LOW:
          return ad.offer.price < 10000;
        case PriceRange.HIGH:
          return ad.offer.price > 50000;
        default:
          return ad.offer.price;
      }
    };

    var filterByFeatures = function (ad) {
      return checkedFeatures.every(function (feature) {
        return ad.offer.features.includes(feature.value);
      });
    };

    window.pin.render(window.ads.array
      .filter(function (ad) {
        return ((typeFilter.value !== FILTER_DEFAULT_VALUE) ? ad.offer.type === typeFilter.value : window.ads.array) &&
        filterByPrice(ad) &&
        ((roomsFilter.value !== FILTER_DEFAULT_VALUE) ? ad.offer.rooms === +roomsFilter.value : window.ads.array) &&
        ((guestsFilter.value !== FILTER_DEFAULT_VALUE) ? ad.offer.guests === +guestsFilter.value : window.ads.array) &&
        filterByFeatures(ad);
      })
    );

    window.pin.getRelevantCards();
  };

  filters.addEventListener('change', window.util.debounce(function () {
    updateAds();
  }));

  window.fiters = {
    form: filters
  };
})();
