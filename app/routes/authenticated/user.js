/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const AuthenticatedUserRoute = Ember.Route.extend({

  model(params) {
    return this.get('store').find('user', params.userId);
  }
});

export default AuthenticatedUserRoute;
