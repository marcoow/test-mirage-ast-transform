'use strict';

const WrapPathsInMirageAssertionTransform = require("./wrap-paths-in-mirage-assertion");

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included(app) {
    if (app.env !== "production") {
      app.registry.add('htmlbars-ast-plugin', {
        name: 'wrap-paths-in-mirage-assertion',
        plugin: WrapPathsInMirageAssertionTransform,
        baseDir: () => __dirname,
      });
    }
  }

  treeFor(name) {
    if (app.env !== "production") {
      return this._super.treeFor.apply(this, arguments);
    }
  }
};
