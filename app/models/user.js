/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import DS from 'ember-data';
import ENUMS from 'hudson/enums';

const User = DS.Model.extend({
  uuid: DS.attr('string'),
  username: DS.attr('string'),
  role: 2,
  department: 2,
  email: DS.attr('string'),
  password: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  namespaces: DS.attr('string'),
  projectCount: DS.attr('number'),
  dateJoined: DS.attr('date'),
  isActive: DS.attr('boolean'),
  anyNamespace: DS.attr('boolean'),
  invoices: DS.hasMany('invoice', {inverse:'user'}),
  collaborations: DS.hasMany('collaboration', {inverse:'user'}),
  files: DS.hasMany('file', {inverse:'user'}),
  subscription: DS.belongsTo('subscription', {inverse:'user'}),
  ownedProjects: DS.hasMany('project', {inverse:'owner'}),

  showSalesDashboard: (function() {
    const role = this.get("role");
    const department = this.get("department");
    if (role === ENUMS.USER_ROLE.CO_FOUNDER) {
      return true;
    } else if ((role === ENUMS.USER_ROLE.EMPLOYEE) && (department === ENUMS.USER_DEPARTMENT.SALES)) {
      return true;
    } else {
      return false;
    }
  }).property("role", "department"),

  showSecurityDashboard: (function() {
    const role = this.get("role");
    const department = this.get("department");
    if (role === ENUMS.USER_ROLE.CO_FOUNDER) {
      return true;
    } else if ((role === ENUMS.USER_ROLE.EMPLOYEE) && (department === ENUMS.USER_DEPARTMENT.SECURITY)) {
      return true;
    } else {
      return false;
    }
  }).property("role", "department"),


  hasSubscription: (function() {
    const subscriptionId = this.get("subscription.id");
    return !Ember.isEmpty(subscriptionId);
  }).property("subscription.id"),

  fullName: (function() {
    const firstName = this.get("firstName");
    const lastName = this.get("lastName");
    return firstName + " " + lastName;
  }).property("firstName","lastName"),

  dateJoinedHumanized: Ember.computed("dateJoined", function() {
    const dateJoined = this.get("dateJoined");
    if (Ember.isEmpty(dateJoined)) {
      return;
    }
    return `${dateJoined.toLocaleDateString()}`;
  }),

  userStatus: (function() {
    const isActive = this.get("isActive");
    if (isActive === false) {
      return "active";
    } else {
      return "inactive";
    }
  }).property("isActive")
});

export default User;
