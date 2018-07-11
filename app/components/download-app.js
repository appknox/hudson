import Ember from 'ember';
import ENV from 'hudson/config/environment';

const DownloadAppComponent = Ember.Component.extend({

  actions: {
    downloadApp() {
      const fileId = this.$('#file-number').val();
      if (Ember.isEmpty(fileId)) {
        return this.get("notify").error("Please enter the File ID");
      }
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

export default DownloadAppComponent;
