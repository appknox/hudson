import Ember from 'ember';
import ENV from 'hudson/config/environment';

const PurgeApiAnalysisComponent = Ember.Component.extend({

  actions: {
    purgeAPIAnalyses() {
      const fileId = this.get("fileNumber");
      if (Ember.isEmpty(fileId)) {
        return this.get("notify").error("Please enter any File ID");
      }
      const data =
        {file_id: fileId};
      return this.get("ajax").post(ENV.endpoints.purgeAPIAnalyses, { namespace: '/hudson-api', data})
      .then((data) => {
        this.get("notify").success("Successfully Purged the Analysis");
        this.set("fileNumber", "");
      }, (error) => {
        for (error of error.errors) {
          this.get("notify").error(error.detail.error);
        }
      })
    }
  }
});

export default PurgeApiAnalysisComponent;
