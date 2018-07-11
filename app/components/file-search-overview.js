import Ember from 'ember';
import ENV from 'hudson/config/environment';

const FileSearchOverviewComponent = Ember.Component.extend({

  tagName: ['tr'],

  actions: {
    downloadApp() {
      const fileId = this.get("file.id");
      const data = {
        file_id: fileId,
        submit: "Download"
      };
      return this.get("ajax").post(ENV.endpoints.downloadApp, {data})
      .then(() => {
        this.get("notify").success("App Downloaded Successfully");
      }, () => {
        this.get("notify").error("Sorry something went wrong, please try again");
      })
    }
  }

});

export default FileSearchOverviewComponent;
