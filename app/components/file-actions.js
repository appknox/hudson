import Ember from 'ember';
import ENV from 'hudson/config/environment';

const FileActionsComponent = Ember.Component.extend({

  fileDetails: (function() {
    const fileId = this.get("file.fileId");
    return this.get("store").findRecord("file", fileId);
  }).property(),

  ireneFilePath: (function() {
    const fileId = this.get("file.fileId");
    const ireneHost = ENV.ireneHost;
    return [ireneHost, "file", fileId].join('/');
  }).property(),

  actions: {
    openGenerateReportModal() {
      this.set("showGenerateReportModal", true);
    },

    openDownloadReportModal() {
      this.set("showDownloadReportModal", true);
    }
  }

});

export default FileActionsComponent;
