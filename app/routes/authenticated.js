/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'hudson/config/environment';

const { location } = window;

const {inject: {service}, isEmpty, RSVP} = Ember;

const AuthenticatedRoute = Ember.Route.extend(AuthenticatedRouteMixin, {

  lastTransition: null,
  session: service(),
  realtime: service(),

  beforeModel(transition){
    this.set("lastTransition", transition);
    return this._super(transition);
  },

  afterModel() {
    let allEvents;
    this.get('notify').setDefaultAutoClear(ENV.notifications.autoClear);

    const that = this;
    const store = this.get("store");

    const realtime = this.get("realtime");

    return allEvents = {

      object(data) {
          return store.pushPayload({data});
        },

      message(data) {
          const { message } = data;
          const { notifyType } = data;
          if (notifyType === ENUMS.NOTIFY.INFO) { that.get("notify").info(message); }
          if (notifyType === ENUMS.NOTIFY.SUCCESS) { that.get("notify").success(message); }
          if (notifyType === ENUMS.NOTIFY.WARNING) { that.get("notify").warning(message); }
          if (notifyType === ENUMS.NOTIFY.ALERT) { that.get("notify").alert(message); }
          if (notifyType === ENUMS.NOTIFY.ERROR) { return that.get("notify").error(message); }
        },

      logout() {
          localStorage.clear();
          return location.reload();
        },

      reload() {
        return location.reload();
      },

      counter(data) {
        return realtime.incrementProperty(`${data.type}Counter`);
      }
    };
  },


  model() {
    const userId = this.get("session.data.authenticated.user_id");
    return this.get('store').findRecord('user', userId);
  },

  redirect(){
    const loc = window.location.pathname.startsWith("/security/")
    if(!loc) {
      this.transitionTo('/security/');
    }
  },

  actions: {
    invalidateSession() {
      return this.get('session').invalidate();
    }
  }
}
);

export default AuthenticatedRoute;
