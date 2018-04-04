/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import BaseModelMixin from '../../../mixins/base-model';
import { module, test } from 'qunit';

module('Unit | Mixin | base model');

// Replace this with your real tests.
test('it works', function(assert) {
  const BaseModelObject = Ember.Object.extend(BaseModelMixin);
  const subject = BaseModelObject.create();
  return assert.ok(subject);
});
