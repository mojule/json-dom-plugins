'use strict';

var defaultOptions = {
  removeWhitespace: true
};

var parser = function parser(node) {
  var parse = node.parse;


  return {
    $parse: function $parse(str) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = Object.assign({}, defaultOptions, options);

      return parse(str, options);
    }
  };
};

module.exports = parser;