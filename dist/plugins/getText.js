'use strict';

var getText = function getText(node) {
  var _getText = node.getText;


  return {
    getText: function getText() {
      if (node.isString() || node.isNumber() || node.isBoolean()) return node.nodeValue().toString();

      return _getText();
    }
  };
};

module.exports = getText;