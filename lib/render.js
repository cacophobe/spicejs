E.render = (function() {
  var FN = {},
    templateEscape = {"\\": "\\\\", "\n": "\\n", "\r": "\\r", "'": "\\'"},
    renderEscape = {'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'};

  function render(tmpl, data, escapeFn) {
    if (escapeFn === true) escapeFn = defaultEscapeFn;
    tmpl = tmpl || '';

    return (FN[tmpl] = FN[tmpl] || new Function("_", "e", "return '" +
      tmpl.replace(/[\\\n\r']/g, function(char) {
        return templateEscape[char];
      }).replace(/{\s*([\w\.]+)\s*}/g, "' + (e?e(_.$1,'$1'):_.$1||(_.$1==null?'':_.$1)) + '") + "'")
    )(data, escapeFn);
  };

  function defaultEscapeFn(str, key) {
    return str == null ? '' : (str+'').replace(/[&\"<>]/g, function(char) {
      return renderEscape[char];
    });
  }

  return render;
}());