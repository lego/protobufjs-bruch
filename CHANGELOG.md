### protobufjs-brunch 1.0.2 (Aug. 10 2017)
* Major fix: specifies `targetExtension` so that the files will be post-processed by `babel-brunch`. This needs to be done because ProtoBuf.JS doesn't compile packages in a way that supports clean module usage without compiling to ES6. We've also changes to using `json-module` so multiple packages don't override each other.

### protobufjs-brunch 1.0.1 (Aug. 10 2017)
* Fixed dependency -- progeny is now the official version

### protobufjs-brunch 1.0.0 (Aug. 8 2017)
* Initial release
