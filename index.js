'use strict';

const pbjs = require('protobufjs/cli/pbjs');
const progeny = require('progeny');

const formatError = (path, err) => {
  const error = new Error(`${path}\n${err}`);
  error.name = '';
  return error;
};


class ProtoBufJSCompiler {
  constructor(cfg) {
    if (cfg == null) cfg = {};
    this.config = cfg.plugins && cfg.plugins.proto || {};
    if (this.config.includePath !== undefined) {
      this.includePath = this.config.includePath;
    }
  }

  get getDependencies() {
    return progeny({
      extension: 'proto',
      regexp: /^\s*import\s+(?:public\s+)?"(.+)";/,
      reverseArgs: true,
    });
  }

  compile(file) {
    let compiled;
    let args = ['--target', 'static-module', '--wrap', 'es6', '--es6', file.path];
    if (this.includePath) {
      args = args.concat(['-p', this.includePath]);
    }
    try {
      pbjs.main(args, (err, output) => {
        if (err) {
          throw err;
        }
        // do something with output
        compiled = output;
      });
    } catch (err) {
      return Promise.reject(formatError(err));
    }

    const result = {
      data: compiled,
    };

    return Promise.resolve(result);
  }
}

ProtoBufJSCompiler.prototype.brunchPlugin = true;
ProtoBufJSCompiler.prototype.type = 'javascript';
ProtoBufJSCompiler.prototype.extension = 'proto';
ProtoBufJSCompiler.prototype.targetExtension = 'js';


module.exports = ProtoBufJSCompiler;
