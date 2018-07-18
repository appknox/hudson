/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const ActiveDevicesComponent = Ember.Component.extend({

  devices: (function() {
    return this.get("store").findAll("device");
  }).property()
});

export default ActiveDevicesComponent;
