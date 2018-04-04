/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const LoginComponentComponent = Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    authenticate() {
      const identification = this.get("identification");
      const password = this.get("password");
      return this.get('session').authenticate('authenticator:hudson', identification, password);
    }
  }
});


export default LoginComponentComponent;
