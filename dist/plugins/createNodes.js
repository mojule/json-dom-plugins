'use strict';

var is = require('@mojule/is');
var utils = require('@mojule/utils');

var capitalizeFirstLetter = utils.capitalizeFirstLetter;


var jsonNodeTypes = ['string', 'number', 'boolean', 'null', 'array', 'object'];
var valueTypes = ['string', 'number', 'boolean'];

var createOmNode = function createOmNode(node) {
  return {
    $createString: function $createString() {
      var nodeValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var propertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!is.string(nodeValue)) nodeValue = nodeValue.toString();

      var nodeType = 'string';
      var value = { nodeType: nodeType, nodeValue: nodeValue };

      if (propertyName !== '') Object.assign(value, { propertyName: propertyName });

      return node(value);
    },
    $createNumber: function $createNumber() {
      var nodeValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var propertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!is.number(nodeValue)) nodeValue = parseFloat(nodeValue);

      var nodeType = 'number';
      var value = { nodeType: nodeType, nodeValue: nodeValue };

      if (propertyName !== '') Object.assign(value, { propertyName: propertyName });

      return node(value);
    },
    $createBoolean: function $createBoolean() {
      var nodeValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var propertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!is.boolean(nodeValue)) nodeValue = nodeValue.toString().trim().toLowerCase() === 'true';

      var nodeType = 'boolean';
      var value = { nodeType: nodeType, nodeValue: nodeValue };

      if (propertyName !== '') Object.assign(value, { propertyName: propertyName });

      return node(value);
    },
    $createNull: function $createNull() {
      var propertyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var nodeType = 'null';
      var value = { nodeType: nodeType };

      if (propertyName !== '') Object.assign(value, { propertyName: propertyName });

      return node(value);
    },
    $createArray: function $createArray() {
      var propertyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var nodeType = 'array';
      var value = { nodeType: nodeType };

      if (propertyName !== '') Object.assign(value, { propertyName: propertyName });

      return node(value);
    },
    $createObject: function $createObject() {
      var propertyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var nodeType = 'object';
      var value = { nodeType: nodeType };

      if (propertyName !== '') Object.assign(value, { propertyName: propertyName });

      return node(value);
    },
    $createText: function $createText(text) {
      return node.createString(text, '$text');
    },
    $createComment: function $createComment(text) {
      return node.createString('<!--' + text + '-->');
    },
    $createDocumentFragment: function $createDocumentFragment() {
      return node.createArray('$documentFragment');
    },
    $createDocumentType: function $createDocumentType(name) {
      var publicId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var systemId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var nodeValue = name;

      if (publicId) {
        nodeValue += ' public "' + publicId + '"';
      }

      if (systemId) {
        nodeValue += ' "' + systemId + '"';
      }

      return node.createString(nodeValue);
    },
    $createDocument: function $createDocument() {
      return node.createArray();
    },
    $createElement: function $createElement(tagName) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (jsonNodeTypes.includes(tagName)) {
        if (!is.empty(attributes)) attributes = node.attributesToValue(attributes);

        var create = node['create' + capitalizeFirstLetter(tagName)];
        var _attributes = attributes,
            nodeValue = _attributes.nodeValue,
            propertyName = _attributes.propertyName;


        if (is.undefined(propertyName)) propertyName = '';

        if (valueTypes.includes(tagName)) return create(nodeValue, propertyName);

        return create(propertyName);
      }

      var nodeType = tagName;
      var value = Object.assign({}, attributes, { nodeType: nodeType });

      return node(value);
    }
  };
};

module.exports = createOmNode;