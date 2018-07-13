import Ember from 'ember';
import ENV from 'hudson/config/environment';

const DownloadReportComponent = Ember.Component.extend({

  actions: {
    downloadReport() {
      const fileId = this.get("fileNumber");
      if (Ember.isEmpty(fileId)) {
        return this.get("notify").error("Please enter the File ID");
      }
      const data = {
        file_id: fileId
      };
      return this.get("ajax").post(ENV.endpoints.downloadReport, { namespace: '/hudson-api', data})
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

export default DownloadReportComponent;
