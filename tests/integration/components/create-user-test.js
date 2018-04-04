/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create-user', 'Integration | Component | create user', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with @set 'myProperty', 'value'
  // Handle any actions with @on 'myAction', (val) ->

  this.render(hbs("{{create-user}}"));

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs(`\
{{#create-user}}
  template block text
{{/create-user}}\
`
  )
  );

  return assert.equal(this.$().text().trim(), 'template block text');
});
