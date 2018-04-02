`import { moduleFor, test } from 'ember-qunit'`

moduleFor 'route:authenticated/security/purgeanalysis', 'Unit | Route | authenticated/security/purgeanalysis', {
  # Specify the other units that are required for this test.
  # needs: ['controller:foo']
}

test 'it exists', (assert) ->
  route = @subject()
  assert.ok route
