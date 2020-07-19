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
    },
    setDefaultCoords: function () {
      window.pin.main.style.top = window.data.MAIN_PIN_Y + 'px';
      window.pin.main.style.left = window.data.MAIN_PIN_X + 'px';
    },
    deleteChilds: function (parentClass, childClass, i) {
      var parent = document.querySelector(parentClass);
      var childs = parent.querySelectorAll(childClass);
      if (childs) {
        for (i; i < childs.length; i++) {
          parent.removeChild(childs[i]);
        }
      }
    }
  };
})();
