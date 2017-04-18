'use strict';

var isType = function isType(node) {
  return {
    isDocumentFragment: function isDocumentFragment() {
      return node.isArray() && node.getValue('propertyName') === '$documentFragment';
    },
    isText: function isText() {
      return node.isString() && node.getValue('propertyName') === '$text';
    }
  };
};

module.exports = isType;