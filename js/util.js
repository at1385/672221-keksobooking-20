'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_CLICK = 0;

  window.util = {
    isEscPress: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    isEnterPress: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    isLeftClick: function (evt, action) {
      if (evt.button === LEFT_CLICK) {
        action();
      }
    },
    disableFormElements: function (form, elementTagName) {
      var elements = form.querySelectorAll(elementTagName);

      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', true);
      }
    },
    enableFormElements: function (form, elementTagName) {
      var elements = form.querySelectorAll(elementTagName);

      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('disabled');
      }
    }
  };
})();
