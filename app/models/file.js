/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import DS from 'ember-data';
import ENUMS from 'hudson/enums';
import BaseModelMixin from 'hudson/mixins/base-model';

const File = DS.Model.extend(BaseModelMixin, {
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  dynamicStatus: DS.attr('number'),
  user: DS.belongsTo('user', {inverse:'files'}),
  project: DS.belongsTo('project', {inverse:'files'}),
  dynamicDate: DS.attr('date'),
  analyses: DS.hasMany('analysis', {inverse: 'file'}),

  statusText: (function() {
    switch (this.get("dynamicStatus")) {
      case ENUMS.DYNAMIC_STATUS.BOOTING: return "Booting";
      case ENUMS.DYNAMIC_STATUS.DOWNLOADING: return "Downloading";
      case ENUMS.DYNAMIC_STATUS.INSTALLING: return "Installing";
      case ENUMS.DYNAMIC_STATUS.LAUNCHING: return "Launching";
      case ENUMS.DYNAMIC_STATUS.HOOKING: return "Hooking";
      case ENUMS.DYNAMIC_STATUS.SHUTTING_DOWN: return "Shutting Down";
      default: return "Unknown Status";
    }

  }).property("dynamicStatus")
}
);

export default File;
