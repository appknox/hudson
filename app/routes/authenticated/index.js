import Ember from 'ember';

const AuthenticatedIndexRoute = Ember.Route.extend({
  redirect() {
    const loc = window.location.pathname;
    if(loc === "/login") {
      this.transitionTo("/security/project-list");
    }
    else {
      this.transitionTo(loc);
    }
  }
});

export default AuthenticatedIndexRoute;
