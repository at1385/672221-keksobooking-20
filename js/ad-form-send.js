'use strict';

(function () {
  var main = document.querySelector('main');

  var showMessage = function (templateId, templateContent) {
    document.activeElement.blur();

    var messageTemplate = document.querySelector(templateId).content.querySelector(templateContent);
    var message = messageTemplate.cloneNode(true);
    main.appendChild(message);

    var closeMessage = function () {
      main.removeChild(message);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onMessageEscPress = function (evt) {
      window.util.isEscPress(evt, closeMessage);
    };

    message.addEventListener('click', function () {
      closeMessage();
    });

    document.addEventListener('keydown', onMessageEscPress);
  };

  window.adFormSend = {
    onSuccess: function () {
      window.util.setDefaultCoords();

      var pins = window.pin.container.querySelectorAll('.map__pin');
      for (var i = 1; i < pins.length; i++) {
        window.pin.container.removeChild(pins[i]);
      }

      window.map.block.classList.add('map--faded');
      window.util.disableFormElements(window.fiters.form, 'select');
      window.util.disableFormElements(window.fiters.form, 'fieldset');

      window.adForm.form.classList.add('ad-form--disabled');
      window.util.disableFormElements(window.adForm.form, 'fieldset');
      window.adForm.form.reset();
      window.getAdressCoords(window.pin.main.offsetLeft, window.pin.main.offsetTop, window.adForm.form, window.adForm.address);

      window.pin.main.addEventListener('mousedown', window.map.onMainPinLeftClick);
      window.pin.main.addEventListener('keydown', window.map.onMainPinEnterPress);

      showMessage('#success', '.success');
    },
    onError: function () {
      showMessage('#error', '.error');
    }
  };
})();
