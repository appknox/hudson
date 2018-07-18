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
import EmberUploader from 'ember-uploader';

const {inject: {service}, isEmpty, RSVP} = Ember;


const Uploader = EmberUploader.Uploader.extend({

  ajax: service("ajax"),
  notify: service("notification-messages"),

  upload(file) {
    const that = this;

    const signSuccess = function(json){
      const settings = {
        dataType: "text",
        contentType: "application/octet-stream",
        processData: false,
        xhrFields: {
          withCredentials: false
        },
        xhr() {
          const xhr = Ember.$.ajaxSettings.xhr();
          xhr.upload.onprogress = e => that.didProgress(e);
          that.one('isAborting', () => xhr.abort());
          return xhr;
        },
        data: file
      };
      return that.get("ajax").put(json.url, settings)
      .then(function() {
        that.didUpload(json.file_key, json.file_key_signed);
        return that.get("notify").success("File Uploaded Successfully. Please wait while we process your file.");}).catch(function(error) {
        that.get("notify").error("Error while uploading file to presigned URL");
        return (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })();
      });
    };

    const data =
      {content_type: "application/octet-stream"};

    return that.get("ajax").request(ENV.endpoints.signedUrl, {data})
    .then(json=> signSuccess(json)).catch(function(error) {
      that.get("notify").error("Error while fetching signed url");
      return (() => {
        const result = [];
        for (error of Array.from(error.errors)) {
          result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
        }
        return result;
      })();
    });
  }
});

export default Uploader;
