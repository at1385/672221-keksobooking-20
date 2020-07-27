'use strict';

(function () {
  var DOWNLOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200,
    MOVED_PERMANENTLY: 301,
    MOVED_TEMPORARILY: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  window.server = {
    download: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;

        switch (xhr.status) {
          case StatusCode.OK:
            onSuccess(xhr.response);
            break;
          case StatusCode.MOVED_PERMANENTLY:
            error = 'Ошибка 301: Перемещено навсегда';
            break;
          case StatusCode.MOVED_TEMPORARILY:
            error = 'Ошибка 302: Перемещено временно';
            break;
          case StatusCode.BAD_REQUEST:
            error = 'Ошибка 400: Неверный запрос';
            break;
          case StatusCode.UNAUTHORIZED:
            error = 'Ошибка 401: Пользователь не авторизован';
            break;
          case StatusCode.FORBIDDEN:
            error = 'Ошибка 403: Доступ запрещен';
            break;
          case StatusCode.NOT_FOUND:
            error = 'Ошибка 404: Ничего не найдено';
            break;
          case StatusCode.SERVER_ERROR:
            error = 'Ошибка 500: Внутренняя ошибка сервера';
            break;
          default:
            error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', DOWNLOAD_URL);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;

        switch (xhr.status) {
          case StatusCode.OK:
            onSuccess(xhr.response);
            break;
          case StatusCode.MOVED_PERMANENTLY:
            error = 'Ошибка 301: Перемещено навсегда';
            break;
          case StatusCode.MOVED_TEMPORARILY:
            error = 'Ошибка 302: Перемещено временно';
            break;
          case StatusCode.BAD_REQUEST:
            error = 'Ошибка 400: Неверный запрос';
            break;
          case StatusCode.UNAUTHORIZED:
            error = 'Ошибка 401: Пользователь не авторизован';
            break;
          case StatusCode.FORBIDDEN:
            error = 'Ошибка 403: Доступ запрещен';
            break;
          case StatusCode.NOT_FOUND:
            error = 'Ошибка 404: Ничего не найдено';
            break;
          case StatusCode.SERVER_ERROR:
            error = 'Ошибка 500: Внутренняя ошибка сервера';
            break;
          default:
            error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    },
    onError: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = '0';
      node.style.right = '0';
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
