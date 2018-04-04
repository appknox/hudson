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

const DownloadAppComponent = Ember.Component.extend({

  actions: {
    downloadApp() {
      const fileId = this.$('#file-number').val();
      const data = {
        file_id: fileId,
        submit: "Download"
      };
      const that = this;
      return this.get("ajax").post(ENV.endpoints.downloadApp, {data})
      .then(function() {
        that.get("notify").success("App Downloaded Successfully");
      })
      .catch(error =>
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

export default DownloadAppComponent;
