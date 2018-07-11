import Ember from 'ember';
import ENV from 'hudson/config/environment';

const GenerateReportComponent = Ember.Component.extend({

  actions: {
    generateReport() {
      const fileId = this.$('#file-number').val();
      const emailIds = this.$('#email-ids').val();
      if (Ember.isEmpty(fileId) || Ember.isEmpty(emailIds)) {
        return this.get("notify").error("Please enter all the values");
      }
      const data = {
        file_id: fileId,
        email_ids: emailIds
      };
      return this.get("ajax").post(ENV.endpoints.generateReport, {data})
      .then(() => {
        this.get("notify").success("Report Generated and sent to the Email ID(s)");
      }, () => {
        this.get("notify").error("Sorry something went wrong, please try again");
      })
    }
  }
});

export default GenerateReportComponent;
