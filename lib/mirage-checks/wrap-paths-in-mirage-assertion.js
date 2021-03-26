function isTestFile(path) {
  
}

class WrapPathsInMirageAssertionTransform {
  transform(root) {
    console.log("TRASNSFO");
    this.syntax.traverse(root, {
      PathExpression() {
        console.log(...arguments);
      }
    });

    return root;
  }
}

module.exports = WrapPathsInMirageAssertionTransform;
