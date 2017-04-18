'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var domPlugins = require('@mojule/dom-plugins');
var attributes = require('./plugins/attributes');
var createNodes = require('./plugins/createNodes');
var getText = require('./plugins/getText');
var isType = require('./plugins/isType');
var parser = require('./plugins/parser');

module.exports = [].concat(_toConsumableArray(domPlugins), [attributes, createNodes, getText, isType, parser]);