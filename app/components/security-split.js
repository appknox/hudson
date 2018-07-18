/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const SecuritySplitComponent = Ember.Component.extend({

  isGenerateReportClass: false,
  isDowloadReportClass: false,
  isDownloadAppClass: false,
  isSearchClass: false,
  isPurgeAnalysisClass: false,

  didInsertElement() {
    this.activeTab();
  },

  activeTab() {
    const path = window.location.pathname;
    switch (path) {
      case "/security/downloadapp": return this.set("isDownloadAppClass", true);
      case "/security/purgeanalysis": return this.set("isPurgeAnalysisClass", true);
      case "/security/project-list": this.set("isSearchClass", true);
    }
  },

  generateReportClass: Ember.computed("isGenerateReportClass", function() {
    if (this.get('isGenerateReportClass')) {
      return 'is-active';
    }
  }),

  downloadAppClass: Ember.computed("isDownloadAppClass", function() {
    if (this.get('isDownloadAppClass')) {
      return 'is-active';
    }
  }),

  downloadReportClass: Ember.computed("isDowloadReportClass", function() {
    if (this.get('isDowloadReportClass')) {
      return 'is-active';
    }
  }),

  searchClass: Ember.computed("isSearchClass", function() {
    if (this.get('isSearchClass')) {
      return 'is-active';
    }
  }),

  purgeAnalysisClass: Ember.computed("isPurgeAnalysisClass", function() {
    if (this.get('isPurgeAnalysisClass')) {
      return 'is-active';
    }
  }),

  actions: {
    displayGenerateReport() {
      this.set("isGenerateReportClass", true);
      this.set("isDownloadAppClass", false);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", false);
    },

    displayDownloadApp() {
      this.set("isGenerateReportClass", false);
      this.set("isDownloadAppClass", true);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", false);
    },

    displayDownloadReport() {
      this.set("isGenerateReportClass", false);
      this.set("isDownloadAppClass", false);
      this.set("isDowloadReportClass", true);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", false);
    },

    displaySearch() {
      this.set("isGenerateReportClass", false);
      this.set("isDownloadAppClass", false);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", true);
      return this.set("isPurgeAnalysisClass", false);
    },

    displayPurgeAnalysis() {
      this.set("isGenerateReportClass", false);
      this.set("isDownloadAppClass", false);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", true);
    }
  }
});




export default SecuritySplitComponent;
