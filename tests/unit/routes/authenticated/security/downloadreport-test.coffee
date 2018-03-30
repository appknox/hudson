`import { moduleFor, test } from 'ember-qunit'`

moduleFor 'route:authenticated/security/downloadreport', 'Unit | Route | authenticated/security/downloadreport', {
  # Specify the other units that are required for this test.
  # needs: ['controller:foo']
}

test 'it exists', (assert) ->
  route = @subject()
  assert.ok route
