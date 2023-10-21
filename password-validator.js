(function (win) {
  /*
  {
    el: '#password', //selector of password field,
    statusEl: '#status', //selector of element where validation status will be displayed,
    lowercase: 2, //minimum number of lowercase characters
    uppercase: 2, //minimum number of uppercase characters
    special: 2, //minimum number of special characters
    number: 2, //minimum number of numbers
    minlength: 8 //minimum length of password
  }
  */

  var attr = "data-password-validator";
  var tick = "✓";
  var cross = "⨯";

  function _getStatusHtml(options, value) {
    var lower = options.lower || 1;
    var upper = options.upper || 1;
    var special = options.special || 1;
    var number = options.number || 1;
    var minlength = options.minlength || 8;

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

    statusHtml.push("<ul>");
    statusHtml.push(
      "<li>" +
        (length < minlength ? cross : tick) +
        " Minimum " +
        minlength +
        " characters required" +
        "</li>"
    );
    if (lower > 0) {
      statusHtml.push(
        "<li>" +
          (nLower < lower ? cross : tick) +
          " Minimum " +
          lower +
          " lowercase characters required" +
          "</li>"
      );
    }
    if (upper > 0) {
      statusHtml.push(
        "<li>" +
          (nUpper < upper ? cross : tick) +
          " Minimum " +
          upper +
          " uppercase characters required" +
          "</li>"
      );
    }
    if (special > 0) {
      statusHtml.push(
        "<li>" +
          (nSpecial < special ? cross : tick) +
          " Minimum " +
          special +
          " special characters required" +
          "</li>"
      );
    }
    if (number > 0) {
      statusHtml.push(
        "<li>" +
          (nNumber < number ? cross : tick) +
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
    var el = document.querySelector(options.el);
    var statusEl = document.querySelector(options.statusEl);

    if (el.hasAttribute(attr)) return;

    el.addEventListener("input", function (e) {
      var value = e.target.value;
      statusEl.innerHTML = _getStatusHtml(options, value);
    });

    el.setAttribute(attr, "true");
    statusEl.innerHTML = _getStatusHtml(options, "");
  };
})(window);
