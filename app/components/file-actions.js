import Ember from 'ember';

const FileActionsComponent = Ember.Component.extend({

  fileDetails: (function() {
    const fileId = this.get("file.fileId");
    return this.get("store").findRecord("file", fileId);
  }).property()

});

export default FileActionsComponent;
