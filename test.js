'use strict';

const expect = require('chai').expect;
const path = require('path');
const progeny = require('progeny');
const ProtoBufJSCompiler = require('./');
const fs = require('fs');

function getFixturePath(subPath) {
  return path.join(__dirname, 'fixtures', subPath);
}

describe('protobufjs-brunch', () => {
  let plugin;
  beforeEach(() => {
    plugin = new ProtoBufJSCompiler({
      conventions: {},
      plugins: {
        proto: {
          includePath: getFixturePath("/included"),
        }
      },
    });
  });

  it('should be an object', () => {
    expect(plugin).to.be.an.instanceof(ProtoBufJSCompiler);
  });

  it('should have #compile method', () => {
    expect(plugin).to.respondTo('compile');
  });

  it('should compile and produce valid result', () => {
    const file = {
      path: getFixturePath("test.proto"),
    };
    file.data = fs.readFileSync(file.path, "utf8");
    return plugin.compile(file).then(file => {
      expect(file.data).to.contain("require(\"protobufjs/light\");");
      expect(file.data).to.contain("Test:");
    });
  });

  it('should compile with relative dependancies', () => {
    const file = {
      path: getFixturePath("outer.proto"),
    };
    file.data = fs.readFileSync(file.path, "utf8");
    return plugin.compile(file).then(file => {
      expect(file.data).to.contain("require(\"protobufjs/light\");");
      expect(file.data).to.contain("Outer:");
    });
  });

  it('should compile with a package', () => {
    const file = {
      path: getFixturePath("package.proto"),
    };
    file.data = fs.readFileSync(file.path, "utf8");
    return plugin.compile(file).then(file => {
      expect(file.data).to.contain("require(\"protobufjs/light\");");
      expect(file.data).to.contain("Test:");
    });
  });

  it('should compile with dependancies from an include path', () => {
    const file = {
      path: getFixturePath("/source/depender.proto"),
    };
    file.data = fs.readFileSync(file.path, "utf8");
    return plugin.compile(file).then(file => {
      expect(file.data).to.contain("require(\"protobufjs/light\");");
      expect(file.data).to.contain("Depender:");
    });
  });
});
