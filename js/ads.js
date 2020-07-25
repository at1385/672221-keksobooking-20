'use strict';

(function () {
  window.ads = {
    array: [],
    download: function (data) {
      var ads = data;

      window.ads.array = ads.filter(function (ad) {
        return ad.offer;
      });

      for (var i = 0; i < window.ads.array.length; i++) {
        if (window.ads.array[i].offer.title === 'Императорский дворец в центре Токио') {
          window.ads.array[i].offer.type = 'palace';
          break;
        }
      }

      window.pin.render(window.ads.array);

      window.util.enableFormElements(window.fiters.form, 'select');
      window.util.enableFormElements(window.fiters.form, 'fieldset');

      window.pin.getRelevantCards();
    }
  };
})();
