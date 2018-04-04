/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const AppsSplitComponent = Ember.Component.extend({

  currentTab: "downloadApp",

  isDownloadApp: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "downloadApp";
  }),

  isSearchDownloadApp: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "searchDownloadApp";
  }),

  isUploadApp: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "uploadApp";
  }),

  isSearchUploadApp: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "searchUploadApp";
  }),

  isDeleteApp: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "deleteApp";
  }),

  isDeleteProject: Ember.computed("currentTab", function() {
    const currentTab = this.get("currentTab");
    return currentTab === "deleteProject";
  }),

  actions: {
    displayDownloadApp() {
      return this.set("currentTab", "downloadApp");
    },

    displaySearchDownloadApp() {
      return this.set("currentTab", "searchDownloadApp");
    },

    displayUploadApp() {
      return this.set("currentTab", "uploadApp");
    },

    displaySearchUploadApp() {
      return this.set("currentTab", "searchUploadApp");
    },

    displayDeleteApp() {
      return this.set("currentTab", "deleteApp");
    },

    displayDeleteProject() {
      return this.set("currentTab", "deleteProject");
    }
  }
});  

export default AppsSplitComponent;
