/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const AuthenticatedScansRoute = Ember.Route.extend({

  model() {
    return this.get('store').findAll('file');
  }
});

export default AuthenticatedScansRoute;
