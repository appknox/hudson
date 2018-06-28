import Ember from 'ember';

const AuthenticatedSecurityRoute = Ember.Route.extend({
  redirect() {
    const loc = window.location.pathname;
    if(loc === "/security") {
      this.transitionTo("/security/generatereport");
    }
    else {
      this.transitionTo(loc);
    }
  }
});

export default AuthenticatedSecurityRoute;
