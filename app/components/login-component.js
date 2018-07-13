import Ember from 'ember';

const LoginComponentComponent = Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    authenticate() {
      const identification = this.get("identification");
      const password = this.get("password");
      this.get('session').authenticate('authenticator:hudson', identification, password);
    }
  }
});


export default LoginComponentComponent;
