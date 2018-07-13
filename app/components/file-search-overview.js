import Ember from 'ember';
import ENV from 'hudson/config/environment';

const FileSearchOverviewComponent = Ember.Component.extend({

  tagName: ['tr'],

  actions: {
    downloadApp() {
      const fileId = this.get("file.id");
      const data = {
        file_id: fileId
      };
      return this.get("ajax").post(ENV.endpoints.downloadApp, { namespace: '/hudson-api', data})
      .then((data) => {
        window.location = data.url;
      }, (error) => {
        for (error of error.errors) {
          this.get("notify").error(error.detail.error);
        }
      })
    }
  }

});

export default FileSearchOverviewComponent;
