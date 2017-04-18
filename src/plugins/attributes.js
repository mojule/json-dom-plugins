'use strict'

const is = require( '@mojule/is' )

const attributes = node => {
  const { getAttr } = node

  return {
    getAttr: name => {
      /*
        lie to the select plugin, so we can select properties with .foo syntax
      */
      if( name === 'class' )
        return getAttr( 'propertyName' )

      return getAttr( name )
    },
    getAttributes: () => {
      const value = Object.assign( {}, node.getValue() )

      delete value.nodeType

      return node.valueToAttributes( value )
    }
  }
}

module.exports = attributes
