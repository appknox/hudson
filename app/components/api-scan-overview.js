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

const ApiScanOverviewComponent = Ember.Component.extend({

    file: null,
    tagName: ['tr'],

    actions: {
      stopAPIScan() {
        const fileId = this.get("file.id");
        const data =
          {file_id: fileId};
        const that = this;
        return this.get("ajax").post(ENV.endpoints.apiScan, {data})
        .then(data => that.get("notify").success("API Scan Stopped Successfully")).catch(error =>
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

export default ApiScanOverviewComponent;
