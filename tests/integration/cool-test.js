import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from 'ember-cli-htmlbars';

module("cool", function (hooks) {
  setupRenderingTest(hooks);

  test("works", async function (assert) {
    await render(hbs`<div class={{this.value}}>test</div>`);

    assert.ok(true);
  });
});
