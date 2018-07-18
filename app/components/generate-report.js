import Ember from 'ember';
import ENV from 'hudson/config/environment';

const GenerateReportComponent = Ember.Component.extend({

  actions: {
    generateReport() {
      const fileId = this.get("fileNumber");
      if (Ember.isEmpty(fileId)) {
        return this.get("notify").error("Please enter all the values");
      }
      const data = {};
      const url = [ENV.endpoints.reports, fileId].join('/');
      return this.get("ajax").put(url, { namespace: '/hudson-api', data})
      .then(() => {
        this.get("notify").success("Report Generated and sent to the Email ID(s)");
        this.set("fileNumber", "");
      }, (error) => {
        for (error of error.errors) {
          this.get("notify").error(error.detail.error);
        }
      })
    }
  }
});

export default GenerateReportComponent;
