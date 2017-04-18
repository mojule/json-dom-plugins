'use strict'

const defaultOptions = {
  removeWhitespace: true
}

const parser = node => {
  const { parse } = node

  return {
    $parse: ( str, options = {} ) => {
      options = Object.assign( {}, defaultOptions, options )

      return parse( str, options )
    }
  }
}

module.exports = parser
