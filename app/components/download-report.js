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
        file_id: fileId,
        submit: "Download"
      };
      return this.get("ajax").post(ENV.endpoints.downloadReport, { namespace: '/hudson-api', data: JSON.stringify(data), contentType: 'application/json' })
      .then(() => {
        this.get("notify").success("Report Downloaded Successfully");
      }, () => {
        this.get("notify").error("Sorry something went wrong, please try again");
      })
    }
  }
});

export default DownloadReportComponent;
