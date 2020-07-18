'use strict';

(function () {
  window.ads = {
    array: [],
    download: function (data) {
      window.ads.array = data;
      window.pin.render(window.ads.array);

      window.util.enableFormElements(window.map.filtersForm, 'select');
      window.util.enableFormElements(window.map.filtersForm, 'fieldset');

      window.pin.collection = window.pin.container.querySelectorAll('.map__pin');

      for (var i = 1; i < window.pin.collection.length; i++) {
        window.card.open(window.pin.collection[i], window.ads.array[i - 1]);
      }
    }
  };
})();
