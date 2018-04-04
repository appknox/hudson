/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const SecuritySplitComponent = Ember.Component.extend({

  isGenerateReportClass: true,
  isUploadReportClass: false,
  isDowloadReportClass: false,
  isSearchClass: false,
  isPurgeAnalysisClass: false,

  generateReportClass: Ember.computed("isGenerateReportClass", function() {
    if (this.get('isGenerateReportClass')) {
      return 'is-active';
    }
  }),

  uploadReportClass: Ember.computed("isUploadReportClass", function() {
    if (this.get('isUploadReportClass')) {
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
      this.set("isUploadReportClass", false);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", false);
    },

    displayUploadReport() {
      this.set("isGenerateReportClass", false);
      this.set("isUploadReportClass", true);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", false);
    },

    displayDownloadReport() {
      this.set("isGenerateReportClass", false);
      this.set("isUploadReportClass", false);
      this.set("isDowloadReportClass", true);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", false);
    },

    displaySearch() {
      this.set("isGenerateReportClass", false);
      this.set("isUploadReportClass", false);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", true);
      return this.set("isPurgeAnalysisClass", false);
    },

    displayPurgeAnalysis() {
      this.set("isGenerateReportClass", false);
      this.set("isUploadReportClass", false);
      this.set("isDowloadReportClass", false);
      this.set("isSearchClass", false);
      return this.set("isPurgeAnalysisClass", true);
    }
  }
});




export default SecuritySplitComponent;
