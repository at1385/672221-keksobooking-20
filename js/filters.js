'use strict';

(function () {
  var FILTER_DEFAULT_VALUE = 'any';

  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');
  var priceFilter = filters.querySelector('#housing-price');
  var roomsFilter = filters.querySelector('#housing-rooms');
  var guestsFilter = filters.querySelector('#housing-guests');
  var featuresFilter = filters.querySelector('#housing-features');

  window.util.disableFormElements(filters, 'select');
  window.util.disableFormElements(filters, 'fieldset');

  var filterByType = function (ad) {
    if (typeFilter.value === FILTER_DEFAULT_VALUE || typeFilter.value === ad.offer.type) {
      return true;
    }
    return false;
  };

  var filterByPrice = function (ad) {
    if (priceFilter.value === FILTER_DEFAULT_VALUE || (PriceRange[priceFilter.value.toUpperCase()].MIN <= ad.offer.price && PriceRange[priceFilter.value.toUpperCase()].MAX >= ad.offer.price)) {
      return true;
    }
    return false;
  };

  var filterByRooms = function (ad) {
    if (roomsFilter.value === FILTER_DEFAULT_VALUE || +roomsFilter.value === ad.offer.rooms) {
      return true;
    }
    return false;
  };

  var filterByGuests = function (ad) {
    if (guestsFilter.value === FILTER_DEFAULT_VALUE || +guestsFilter.value === ad.offer.guests) {
      return true;
    }
    return false;
  };

  var filterByFeatures = function (ad) {
    var checkedFeatures = Array.from(featuresFilter.querySelectorAll('input:checked'));

    return checkedFeatures.every(function (feature) {
      return ad.offer.features.includes(feature.value);
    });
  };

  var getFilteredAds = function (ads) {
    var filteredAds = [];

    for (var i = 0; i < ads.length; i++) {
      if (filterByType(ads[i]) && filterByPrice(ads[i]) && filterByRooms(ads[i]) && filterByGuests(ads[i]) && filterByFeatures(ads[i])) {
        filteredAds.push(ads[i]);
        if (filteredAds.length === window.pin.QUANTITY) {
          break;
        }
      }
    }

    return filteredAds;
  };

  var updateAds = function () {
    if (window.card.container.firstChild) {
      window.card.close();
    }

    var i = 1;
    window.util.deleteChilds('.map__pins', '.map__pin', i);

    window.pin.render(getFilteredAds(window.ads.data));
    window.pin.getRelevantCards();
  };

  filters.addEventListener('change', window.util.debounce(function () {
    updateAds();
  }));

  window.fiters = {
    form: filters
  };
})();
