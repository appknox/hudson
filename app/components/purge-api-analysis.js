import Ember from 'ember';
import ENV from 'hudson/config/environment';

const PurgeApiAnalysisComponent = Ember.Component.extend({

  actions: {
    purgeAPIAnalyses() {
      const fileId = this.$('#file-number').val();
      if (Ember.isEmpty(fileId)) {
        return this.get("notify").error("Please enter any File ID");
      }
      const data =
        {file_id: fileId};
      return this.get("ajax").post(ENV.endpoints.purgeAPIAnalyses, {data})
      .then((data) => {
        this.get("notify").error("Successfully Purged the Analysis");
      }, () => {
        this.get("notify").error("Sorry something went wrong, please try again");
      })
    }
  }
});

export default PurgeApiAnalysisComponent;
