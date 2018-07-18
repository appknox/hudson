import Ember from 'ember';
import ENV from 'hudson/config/environment';

const DownloadReportComponent = Ember.Component.extend({

  actions: {
    downloadReport() {
      const fileId = this.get("fileNumber");
      if (Ember.isEmpty(fileId)) {
        return this.get("notify").error("Please enter the File ID");
      }
      const url = [ENV.endpoints.reports, fileId].join('/');
      return this.get("ajax").request(ENV.endpoints.url, { namespace: '/hudson-api'})
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
