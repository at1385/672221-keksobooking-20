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
      window.setOriginalState();
      showMessage('#success', '.success');
    },
    onError: function () {
      showMessage('#error', '.error');
    }
  };
})();
