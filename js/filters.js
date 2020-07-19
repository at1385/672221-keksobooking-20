'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');

  var updateAds = function () {
    var i = 1;
    window.util.deleteChilds('.map__pins', '.map__pin', i);

    var sameTypeAds = window.ads.array.filter(function (it) {
      return it.offer.type === typeFilter.value;
    });

    if (typeFilter.value !== 'any') {
      window.pin.render(sameTypeAds);
    } else {
      window.pin.render(window.ads.array);
    }

    window.pin.getRelevantCards();
  };

  typeFilter.addEventListener('change', function () {
    updateAds();
  });

  window.fiters = {
    form: filters
  };
})();
