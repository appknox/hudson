/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-download-report', 'Integration | Component | search download report', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with @set 'myProperty', 'value'
  // Handle any actions with @on 'myAction', (val) ->

  this.render(hbs("{{search-download-report}}"));

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs(`\
{{#search-download-report}}
  template block text
{{/search-download-report}}\
`
  )
  );

  return assert.equal(this.$().text().trim(), 'template block text');
});
