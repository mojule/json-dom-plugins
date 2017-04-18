'use strict'

const is = require( '@mojule/is' )
const utils = require( '@mojule/utils' )

const { capitalizeFirstLetter } = utils

const jsonNodeTypes = [ 'string', 'number', 'boolean', 'null', 'array', 'object' ]
const valueTypes = [ 'string', 'number', 'boolean' ]

const createOmNode = node => {
  return {
    $createString: ( nodeValue = '', propertyName = '' ) => {
      if( !is.string( nodeValue ) )
        nodeValue = nodeValue.toString()

      const nodeType = 'string'
      const value = { nodeType, nodeValue }

      if( propertyName !== '' )
        Object.assign( value, { propertyName } )

      return node( value )
    },
    $createNumber: ( nodeValue = 0, propertyName = '' ) => {
      if( !is.number( nodeValue ) )
        nodeValue = parseFloat( nodeValue )

      const nodeType = 'number'
      const value = { nodeType, nodeValue }

      if( propertyName !== '' )
        Object.assign( value, { propertyName } )

      return node( value )
    },
    $createBoolean: ( nodeValue = false, propertyName = '' ) => {
      if( !is.boolean( nodeValue ) )
        nodeValue = nodeValue.toString().trim().toLowerCase() === 'true'

      const nodeType = 'boolean'
      const value = { nodeType, nodeValue }

      if( propertyName !== '' )
        Object.assign( value, { propertyName } )

      return node( value )
    },
    $createNull: ( propertyName = '' ) => {
      const nodeType = 'null'
      const value = { nodeType }

      if( propertyName !== '' )
        Object.assign( value, { propertyName } )

      return node( value )
    },
    $createArray: ( propertyName = '' ) => {
      const nodeType = 'array'
      const value = { nodeType }

      if( propertyName !== '' )
        Object.assign( value, { propertyName } )

      return node( value )
    },
    $createObject: ( propertyName = '' ) => {
      const nodeType = 'object'
      const value = { nodeType }

      if( propertyName !== '' )
        Object.assign( value, { propertyName } )

      return node( value )
    },
    $createText: text => node.createString( text, '$text' ),
    $createComment: text => node.createString( `<!--${ text }-->` ),
    $createDocumentFragment: () => node.createArray( '$documentFragment' ),
    $createDocumentType: ( name, publicId = '', systemId = '' ) => {
      let nodeValue = name

      if( publicId ){
        nodeValue += ` public "${ publicId }"`
      }

      if( systemId ){
        nodeValue += ` "${ systemId }"`
      }

      return node.createString( nodeValue )
    },
    $createDocument: () => node.createArray(),
    $createElement: ( tagName, attributes = {} ) => {
      if( jsonNodeTypes.includes( tagName ) ){
        if( !is.empty( attributes ) )
          attributes = node.attributesToValue( attributes )

        const create = node[ `create${ capitalizeFirstLetter( tagName ) }` ]
        let { nodeValue, propertyName } = attributes

        if( is.undefined( propertyName ) )
          propertyName = ''

        if( valueTypes.includes( tagName ) )
          return create( nodeValue, propertyName )

        return create( propertyName )
      }

      const nodeType = tagName
      const value = Object.assign( {}, attributes, { nodeType } )

      return node( value )
    }
  }
}

module.exports = createOmNode
