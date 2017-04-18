# json-dom-plugins

Plugins for [json-tree](https://github.com/mojule/json-tree) that let you treat
JSON like a DOM. Built on [dom-plugins](https://github.com/mojule/dom-plugins).

## Wait, what?

It's more useful than you might think - using query selectors to find things
in an object graph for example:

```json
{
  "name": "backpack",
  "weight": 1,
  "contents": [
    {
      "name": "apple",
      "weight": 0.85
    }
  ]
}
```

```javascript
const tree = JsonTree( json )
const weightNodes = tree.querySelectorAll( 'number.weight' )

const totalWeight = weightNodes.reduce(
  ( sum, node ) => sum + node.nodeValue(),
  0
)

console.log( totalWeight ) // 1.85
```

## Install

`npm install @mojule/json-dom-plugins`

## Example

```javascript
const { Factory } = require( '@mojule/json-tree' )
const domPlugins = require( '@mojule/json-dom-plugins' )
const json = require( './path/to/my.json' )

const Tree = Factory( domPlugins )
const tree = Tree( json )

const weightNodes = tree.querySelectorAll( 'number.weight' )
// etc
```