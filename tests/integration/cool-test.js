import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from 'ember-cli-htmlbars';

module("cool", function (hooks) {
  setupRenderingTest(hooks);

  test("works", async function (assert) {
    this.value = "test";
    await render(hbs`<Cool @contento={{this.value}} />`);

    assert.async();
    assert.ok(false);
  });
});
