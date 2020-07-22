'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');
  var priceFilter = filters.querySelector('#housing-price');
  var roomsFilter = filters.querySelector('#housing-rooms');
  var guestsFilter = filters.querySelector('#housing-guests');
  var featuresFilter = filters.querySelector('#housing-features');

  var updateAds = function () {
    if (window.card.container.firstChild) {
      window.card.close();
    }

    var i = 1;
    window.util.deleteChilds('.map__pins', '.map__pin', i);

    var checkedFeatures = Array.from(featuresFilter.querySelectorAll('input:checked'));

    window.pin.render(window.ads.array
      .filter(function (ad) {
        var typeAds = (typeFilter.value !== 'any') ? ad.offer.type === typeFilter.value : window.ads.array;
        return typeAds;
      })
      .filter(function (ad) {
        switch (priceFilter.value) {
          case 'middle':
            return ad.offer.price >= 10000 && ad.offer.price <= 50000;
          case 'low':
            return ad.offer.price < 10000;
          case 'high':
            return ad.offer.price > 50000;
          default:
            return ad.offer.price;
        }
      })
      .filter(function (ad) {
        var roomsAds = (roomsFilter.value !== 'any') ? ad.offer.rooms === +roomsFilter.value : window.ads.array;
        return roomsAds;
      })
      .filter(function (ad) {
        var guestsAds = (guestsFilter.value !== 'any') ? ad.offer.guests === +guestsFilter.value : window.ads.array;
        return guestsAds;
      })
      .filter(function (ad) {
        return checkedFeatures.every(function (feature) {
          return ad.offer.features.includes(feature.value);
        });
      })
    );

    window.pin.getRelevantCards();
  };

  filters.addEventListener('change', function () {
    updateAds();
  });

  window.fiters = {
    form: filters
  };
})();
