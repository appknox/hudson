/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import Uploader from 'hudson/utils/uploader';
import ENV from 'hudson/config/environment';
import EmberUploader from 'ember-uploader';

const UploadAppComponent = EmberUploader.FileField.extend({

  delegate: null,
  classNames: ["file-input"],

  filesDidChange(files) {

    const that = this;
    const delegate = this.get("delegate");
    delegate.set("isUploading", true);
    if (Ember.isEmpty(files)) {
      return;
    }
    const uploader = Uploader.create({container: this.container});

    uploader.didUpload = function(file_key, file_key_signed) {
      delegate.set("isUploading", false);
      const data = {
        file_key,
        file_key_signed
      };
      return that.get("ajax").post(ENV.endpoints.uploadedFile, {data});
    };

    uploader.on('progress', e => delegate.set("progress", parseInt(e.percent)));

    return uploader.upload(files[0]);
  }});


export default UploadAppComponent;
