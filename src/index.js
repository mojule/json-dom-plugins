'use strict'

const domPlugins = require( '@mojule/dom-plugins' )
const attributes = require( './plugins/attributes' )
const createNodes = require( './plugins/createNodes' )
const getText = require( './plugins/getText' )
const isType = require( './plugins/isType' )
const parser = require( './plugins/parser' )

module.exports = [
  ...domPlugins, attributes, createNodes, getText, isType, parser
]
