'use strict';

const WrapPathsInMirageAssertionTransform = require("./wrap-paths-in-mirage-assertion");

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included(app) {
    app.registry.add('htmlbars-ast-plugin', {
      name: 'wrap-paths-in-mirage-assertion',
      plugin: WrapPathsInMirageAssertionTransform,
      dependencyInvalidation: true,
    });
  }
};
