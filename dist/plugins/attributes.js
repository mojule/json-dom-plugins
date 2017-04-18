'use strict';

var is = require('@mojule/is');

var attributes = function attributes(node) {
  var _getAttr = node.getAttr;


  return {
    getAttr: function getAttr(name) {
      /*
        lie to the select plugin, so we can select properties with .foo syntax
      */
      if (name === 'class') return _getAttr('propertyName');

      return _getAttr(name);
    },
    getAttributes: function getAttributes() {
      var value = Object.assign({}, node.getValue());

      delete value.nodeType;

      return node.valueToAttributes(value);
    }
  };
};

module.exports = attributes;