(function (win) {
  var attr = "data-password-validator";
  var tick = "✓";
  var cross = "⨯";
  var eye = "👁";

  function _debounce(func, timeout) {
    let timer;
    return function () {
      clearTimeout(timer);
      var args = arguments;
      var context = this;
      timer = setTimeout(function () {
        func.apply(context, args);
      }, timeout);
    };
  }

  function _getStatusHtml(valid) {
    return valid
      ? '<span class="status-valid">' + tick + "</span>"
      : '<span class="status-invalid">' + cross + "</span>";
  }

  function _getStatusSummaryHtml(options, value) {
    var lower = options.hasOwnProperty("lower") ? options.lower : 1;
    var upper = options.hasOwnProperty("upper") ? options.upper : 1;
    var special = options.hasOwnProperty("special") ? options.special : 1;
    var number = options.hasOwnProperty("number") ? options.number : 1;
    var minlength = options.hasOwnProperty("minlength") ? options.minlength : 8;

    var length = value.length;
    var nLower = 0;
    var nUpper = 0;
    var nSpecial = 0;
    var nNumber = 0;
    var statusHtml = [];

    for (var i = 0; i < value.length; i++) {
      var c = value[i];
      if (c >= "a" && c <= "z") {
        nLower++;
      } else if (c >= "A" && c <= "Z") {
        nUpper++;
      } else if (c >= "0" && c <= "9") {
        nNumber++;
      } else {
        nSpecial++;
      }
    }

    statusHtml.push('<ul class="password-validator-summary">');
    statusHtml.push(
      "<li>" +
        _getStatusHtml(length >= minlength) +
        " Minimum " +
        minlength +
        " characters required" +
        "</li>"
    );
    if (lower > 0) {
      statusHtml.push(
        "<li>" +
          _getStatusHtml(nLower >= lower) +
          " Minimum " +
          lower +
          " lowercase characters required" +
          "</li>"
      );
    }
    if (upper > 0) {
      statusHtml.push(
        "<li>" +
          _getStatusHtml(nUpper >= upper) +
          " Minimum " +
          upper +
          " uppercase characters required" +
          "</li>"
      );
    }
    if (special > 0) {
      statusHtml.push(
        "<li>" +
          _getStatusHtml(nSpecial >= special) +
          " Minimum " +
          special +
          " special characters required" +
          "</li>"
      );
    }
    if (number > 0) {
      statusHtml.push(
        "<li>" +
          _getStatusHtml(nNumber >= number) +
          " Minimum " +
          number +
          " number characters required" +
          "</li>"
      );
    }
    statusHtml.push("</ul>");
    return statusHtml.join("");
  }

  win.passwordValidator = function (options) {
    if (!options.el) throw "option required: el";
    if (!options.statusEl) throw "option required: statusEl";

    var el = document.querySelector(options.el);
    var statusEl = document.querySelector(options.statusEl);

    if (el.hasAttribute(attr)) return;

    el.addEventListener(
      "input",
      _debounce(function (e) {
        var value = e.target.value;
        statusEl.innerHTML = _getStatusSummaryHtml(options, value);
      }),
      100
    );

    el.setAttribute(attr, "true");
    statusEl.innerHTML = _getStatusSummaryHtml(options, "");
  };
})(window);
