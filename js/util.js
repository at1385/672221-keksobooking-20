'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_CLICK = 0;
  var DEBOUNCE_INTERVAL = 500;
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
    deleteChilds: function (parentSelector, childSelector, i) {
      var parent = document.querySelector(parentSelector);
      var childs = parent.querySelectorAll(childSelector);
      if (childs) {
        for (i; i < childs.length; i++) {
          parent.removeChild(childs[i]);
        }
      }
    },
    debounce: function (callback) {
      var previousTimeout = null;

      return function () {
        if (previousTimeout) {
          window.clearTimeout(previousTimeout);
        }

        previousTimeout = window.setTimeout(function () {
          callback.apply(null, arguments);
        }, DEBOUNCE_INTERVAL);
      };
    },
    createImgElement: function (imgWidth, imgHeight, imgAlt, target) {
      var img = document.createElement('img');

      img.setAttribute('src', '');
      img.setAttribute('width', imgWidth);
      img.setAttribute('height', imgHeight);
      img.setAttribute('alt', imgAlt);

      target.appendChild(img);
    },
    setImage: function (imageChooser, imgWidth, imgHeight, imgAlt, imageContainer) {
      if (!imageContainer.firstChild) {
        window.util.createImgElement(imgWidth, imgHeight, imgAlt, imageContainer);
      }

      var imagePreview = imageContainer.querySelector('img');

      var image = imageChooser.files[0];
      var imageName = image.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return imageName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          imagePreview.src = reader.result;
        });

        reader.readAsDataURL(image);
      }
    }
  };
})();
