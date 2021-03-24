class StripTestSelectorsTransform {
  transform(root) {
    this.syntax.traverse(root, {
      PathExpression() {
        console.log(...arguments);
      }
    });

    return root;
  }
}

module.exports = StripTestSelectorsTransform;
