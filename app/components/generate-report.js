/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import ENV from 'hudson/config/environment';

const GenerateReportComponent = Ember.Component.extend({

  actions: {
    generateReport() {
      const fileId = this.$('#file-number').val();
      const emailIds = this.$('#email-ids').val();
      const data = {
        file_id: fileId,
        email_ids: emailIds
      };
      const that = this;
      return this.get("ajax").post(ENV.endpoints.generateReport, {data})
      .then(data => that.get("notify").success("Report Generated and sent to the Email ID(s)")).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    }
  }
});

export default GenerateReportComponent;
