'use strict';

(function () {
  window.ads = {
    data: [],
    download: function (ads) {
      window.ads.data = ads.filter(function (ad) {
        return ad.offer;
      });

      for (var i = 0; i < window.ads.data.length; i++) {
        if (window.ads.data[i].offer.title === 'Императорский дворец в центре Токио') {
          window.ads.data[i].offer.type = 'palace';
          break;
        }
      }

      window.pin.render(window.ads.data);

      window.util.enableFormElements(window.fiters.form, 'select');
      window.util.enableFormElements(window.fiters.form, 'fieldset');

      window.pin.getRelevantCards();
    }
  };
})();
