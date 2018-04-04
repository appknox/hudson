/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const ScansSplitComponent = Ember.Component.extend({

  isDynamicScan: true,
  isAPIScan: false,
  isStartAPIScan: false,

  dynamicScanClass: Ember.computed("isDynamicScan", function() {
    if (this.get("isDynamicScan")) {
      return "is-active";
    }
  }),
  apiScanClass: Ember.computed("isAPIScan", function() {
    if (this.get("isAPIScan")) {
      return "is-active";
    }
  }),

  startAPIScanclass: Ember.computed("isStartAPIScan", function() {
    if (this.get("isStartAPIScan")) {
      return "is-active";
    }
  }),

  actions: {
    displayDynamicScan() {
      this.set("isDynamicScan", true);
      this.set("isAPIScan", false);
      return this.set("isStartAPIScan", false);
    },
    displayAPIScan() {
      this.set("isAPIScan", true);
      this.set("isDynamicScan", false);
      return this.set("isStartAPIScan", false);
    },
    displayStartAPIScans() {
      this.set("isStartAPIScan", true);
      this.set("isDynamicScan", false);
      return this.set("isAPIScan", false);
    }
  }
});

export default ScansSplitComponent;
