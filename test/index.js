'use strict'

const assert = require( 'assert' )
const fs = require( 'fs' )
const is = require( '@mojule/is' )
const JsonTree = require( '@mojule/json-tree' )
const plugins = require( '../src' )
const testJson = require( './fixtures/test.json' )

const Tree = JsonTree.Factory( plugins )

describe( 'JSON DOM', () => {
  describe( 'OM types', () => {
    it( 'empty', () => {
      const text = Tree.createText( 'test' )
      const comment = Tree.createComment( 'test' )
      const documentType = Tree.createDocumentType( 'test' )

      assert( text.isEmpty() )
      assert( comment.isEmpty() )
      assert( documentType.isEmpty() )
    })

    it( 'not empty', () => {
      const document = Tree.createDocument()
      const fragment = Tree.createDocumentFragment()
      const element = Tree.createElement( 'array' )

      assert( !document.isEmpty() )
      assert( !fragment.isEmpty() )
      assert( !element.isEmpty() )
    })

    it( 'createString', () => {
      const s1 = Tree.createString( 'abc' )
      const s2 = Tree.createString( 42 )

      assert.equal( s1.nodeValue(), 'abc' )
      assert.equal( s2.nodeValue(), '42' )
    })

    it( 'createBoolean', () => {
      const b1 = Tree.createBoolean( true )
      const b2 = Tree.createBoolean( 'true' )
      const b3 = Tree.createBoolean( false )
      const b4 = Tree.createBoolean( 'false' )
      const b5 = Tree.createBoolean( true, 'test' )

      assert( b1.nodeValue() )
      assert( b2.nodeValue() )
      assert( !b3.nodeValue() )
      assert( !b4.nodeValue() )
      assert( b5.getValue( 'propertyName' ), 'test' )
    })

    it( 'documentType', () => {
      const doctype = Tree.createDocumentType( 'name', 'public', 'system' )

      // converts doctypes to strings
      assert( doctype.isString() )
    })

    it( 'foreign types', () => {
      const foreign = Tree.createElement( 'foreign' )

      assert.equal( foreign.tagName(), 'foreign' )
    })
  })

  describe( 'Plugins', () => {
    it( 'stringify', () => {
      const tree = Tree( testJson )

      const ml = tree.stringify()

      assert( is.string( ml ) )
    })

    it( 'parse', () => {
      const inTree = Tree( testJson )
      const ml = inTree.stringify()
      const outTree = Tree.parse( ml )
      const outJson = outTree.toJson()

      assert.deepEqual( testJson, outJson )
    })

    it( 'parse handles whitespace', () => {
      return new Promise( ( resolve, reject ) => {
        fs.readFile( './test/fixtures/json.html', 'utf8', ( err, data ) => {
          if( err ) reject( err )

          resolve( data )
        })
      }).then( ml => {
        const outTree = Tree.parse( ml )
        const outJson = outTree.toJson()

        assert.deepEqual( testJson, outJson )
      })
    })

    it( 'matches', () => {
      const tree = Tree( testJson )

      const foobar = tree.find( current =>
        current.getValue( 'propertyName' ) === 'foobar'
      )

      const id = foobar.id()

      const da = tree.find( current =>
        current.getValue( 'propertyName' ) === 'da'
      )

      assert( foobar.matches( 'object.foobar' ) )
      assert( foobar.matches( '#' + id ) )
      assert( da.matches( 'array.da' ) )
      assert( !da.matches( 'object.da' ) )
      assert( da.matches( '.d array.da' ) )
      assert( da.matches( '.foobar > .d > .da' ) )
    })

    it( 'querySelector', () => {
      const tree = Tree( testJson )

      const foobar1 = tree.find( current =>
        current.getValue( 'propertyName' ) === 'foobar'
      )

      const foobar2 = tree.querySelector( '.foobar' )

      assert.equal( foobar1, foobar2 )
    })

    it( 'querySelectorAll', () => {
      const tree = Tree( testJson )

      const numbers1 = tree.findAll( current => current.isNumber() )
      const numbers2 = tree.querySelectorAll( 'number' )

      const sum1 = numbers1.reduce( ( sum, current ) => {
        const value = current.nodeValue()

        return sum + value
      }, 0 )

      const sum2 = numbers2.reduce( ( sum, current ) => {
        const value = current.nodeValue()

        return sum + value
      }, 0 )

      assert.equal( sum1, sum2 )
    })

    it( 'getText', () => {
      const tree = Tree( testJson )
      const expect = 'btruefalseabc123123abcfalse123abcfalse123abcfalseb312312123123abcfalseb'

      assert.equal( tree.getText(), expect )
    })
  })
})