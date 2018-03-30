`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'create-analysis', 'Integration | Component | create analysis', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{create-analysis}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#create-analysis}}
      template block text
    {{/create-analysis}}
  """

  assert.equal @$().text().trim(), 'template block text'
