## protobufjs-brunch

[![npm version](https://badge.fury.io/js/protobufjs-brunch.svg)](https://badge.fury.io/js/protobufjs-brunch)
[![Build Status](https://travis-ci.org/lego/protobufjs-brunch.svg?branch=master)](https://travis-ci.org/lego/protobufjs-brunch)


Adds `.proto` compilation support to
[brunch](http://brunch.io) using [protobuf.js](https://github.com/dcodeIO/ProtoBuf.js/).

## Usage
Install the plugin via npm with `npm install --save-dev protobufjs-brunch`.

Or, do manual install:

* Add `"protobufjs-brunch": "x.y.z"` to `package.json` of your brunch app.
  Pick a plugin version that corresponds to your minor (y) brunch version.
* If you want to use git version of plugin, add
`"protobufjs-brunch": "git+ssh://git@github.com:lego/protobufjs-brunch.git"`.

### Options
Set additional include paths:
```javascript
module.exports = {
  plugins: {
    proto: {
      includePath: 'src/messages'
    }
  }
}
```
