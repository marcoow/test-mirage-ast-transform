'use strict';

const WrapPathsInMirageAssertionTransform = require("./wrap-paths-in-mirage-assertion");

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included(app) {
    this.app = app;

    if (this.app.env !== "production") {
      this.app.registry.add('htmlbars-ast-plugin', {
        name: 'wrap-paths-in-mirage-assertion',
        plugin: WrapPathsInMirageAssertionTransform,
        baseDir: () => __dirname,
      });
    }
  },

  treeFor(name) {
    if (this.app.env !== "production") {
      return this._super.treeFor.apply(this, arguments);
    }
  }
};
