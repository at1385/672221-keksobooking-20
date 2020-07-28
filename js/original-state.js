'use strict';

(function () {
  window.setOriginalState = function () {
    window.util.setDefaultCoords();

    if (window.card.container.firstChild) {
      window.card.close();
    }

    for (var i = 1; i < window.pin.collection.length; i++) {
      window.pin.container.removeChild(window.pin.collection[i]);
    }

    window.map.block.classList.add('map--faded');
    window.util.disableFormElements(window.fiters.form, 'select');
    window.util.disableFormElements(window.fiters.form, 'fieldset');
    window.fiters.form.reset();

    window.adForm.form.classList.add('ad-form--disabled');
    window.util.disableFormElements(window.adForm.form, 'fieldset');
    window.adForm.form.reset();
    window.adFormImages.reset();
    window.getAdressCoords(window.pin.main.offsetLeft, window.pin.main.offsetTop, window.adForm.form, window.adForm.address);

    window.pin.main.addEventListener('mousedown', window.map.onMainPinLeftClick);
    window.pin.main.addEventListener('keydown', window.map.onMainPinEnterPress);
  };
})();
