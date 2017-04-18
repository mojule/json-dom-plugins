'use strict'

const isType = node => {
  return {
    isDocumentFragment: () =>
      node.isArray() && node.getValue( 'propertyName' ) === '$documentFragment',
    isText: () =>
      node.isString() && node.getValue( 'propertyName' ) === '$text'
  }
}

module.exports = isType
