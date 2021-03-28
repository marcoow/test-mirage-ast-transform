const util = require('util');

function isTestFile(node) {
  // assuming undefined location identifies inline-precompile templates
  return typeof node.loc.source === "undefined";
}

const HELPER_NAME = "-assert-no-mirage-resource";
const HELPER_REGEX = new RegExp(`^\\(?${HELPER_NAME}`);

const ARGLESS_BUILTIN_HELPERS = [
  'array',
  'concat',
  'debugger',
  'has-block',
  'hasBlock',
  'hasBlockParams',
  'hash',
  'input',
  'log',
  'outlet',
  'query-params',
  'textarea',
  'yield',
];

class WrapPathsInMirageAssertionTransform {
  transform(root) {
    let b = this.syntax.builders;
    let currentPathIsCall = false;
    let insideSubExpression = false;

    this.syntax.traverse(root, {
      //PathExpression(path) {
      //  console.log("looking at ", path);
      //  if (isTestFile(path) && !currentPathIsCall) {
      //    let valid = ARGLESS_BUILTIN_HELPERS.includes(path.original)
      //    || HELPER_REGEX.test(path.original);
      //
      //    if (!valid) {
      //      console.error(path.original);
      //      let wrapped = `${HELPER_NAME} ${path.original}`;
      //      if (insideSubExpression) {
      //        wrapped = `(${wrapped})`;
      //      }
      //      console.log("replacing!");
      //      return b.path(wrapped);
      //    }
      //  }
      //
      //  currentPathIsCall = false;
      //},

      SubExpression: {
        enter() {
          currentPathIsCall = true;
          insideSubExpression = true;
        },

        leave() {
         insideSubExpression = false; 
        }
      },

      ElementModifierStatement() {
        currentPathIsCall = true;
      },

      MustacheStatement(node) {
        if (!node.path.original.startsWith(HELPER_NAME)) {
          let originalPath = node.path.original;
          node.path.original = HELPER_NAME;
          node.path.parts = [HELPER_NAME];
          node.params = [b.path(originalPath)];
          console.log(util.inspect(node));
        }
      },

      //MustacheStatement: {
      //  enter(node) {
      //    let isCall = node.params.length > 0 || node.hash.pairs.length > 0;
      //
      //    currentPathIsCall = isCall;
      //    insideSubExpression = isCall;
      //  },
      //
      //  leave() {
      //    insideSubExpression = false;
      //  }
      //},

      BlockStatement: {
        enter() {
          currentPathIsCall = true;
        },
      }
    });

    return root;
  }
}

module.exports = WrapPathsInMirageAssertionTransform;
