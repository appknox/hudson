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
        this.get("ajax").post(ENV.endpoints.apiScan, {data})
        .then(function(){
          that.get("notify").success("API Scan Stopped Successfully");
        })
        .catch(function() {
          that.get("notify").error(error.payload.error);
        });
      }
    }
});

export default ApiScanOverviewComponent;
