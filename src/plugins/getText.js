'use strict'

const getText = node => {
  const { getText } = node

  return {
    getText: () => {
      if( node.isString() || node.isNumber() || node.isBoolean() )
        return node.nodeValue().toString()

      return getText()
    }
  }
}

module.exports = getText
