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
    let args = ['--target', 'json-module', '--wrap', 'commonjs', file.path];
    if (this.includePath) {
      args = args.concat(['-p', this.includePath]);
    }

    return new Promise((resolve, reject) => {
      try {
        pbjs.main(args, (err, output) => {
          if (err) {
            throw err;
          }
          const result = {
            data: output,
          };
          return resolve(result);
        });
      } catch (err) {
        return reject(formatError(err));
      }
    });
  }
}

ProtoBufJSCompiler.prototype.brunchPlugin = true;
ProtoBufJSCompiler.prototype.type = 'javascript';
ProtoBufJSCompiler.prototype.extension = 'proto';
ProtoBufJSCompiler.prototype.targetExtension = 'js';


module.exports = ProtoBufJSCompiler;
