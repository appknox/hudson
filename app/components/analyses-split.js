/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const AnalysesSplitComponent = Ember.Component.extend({

  currentTab: "searchUpdateAnalysis",

  isSearchUpdateAnalysis: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "searchUpdateAnalysis";
  }),

  isPurgeAPIAnalysis: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "purgeAPIAnalysis";
  }),

  isUpdateAnalysis: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "updateAnalysis";
  }),

  isAddAnalysis: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "addAnalysis";
  }),

  actions: {
    displaySearchUpdateAnalysis() {
      return this.set("currentTab", "searchUpdateAnalysis");
    },

    displayPurgeAPIAnalysis() {
      return this.set("currentTab", "purgeAPIAnalysis");
    },

    displayUpdateAnalysis() {
      return this.set("currentTab", "updateAnalysis");
    },

    displayAddAnalysis() {
      return this.set("currentTab", "addAnalysis");
    }
  }
});

export default AnalysesSplitComponent;
