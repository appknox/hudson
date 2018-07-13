import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  downloadUrl: DS.attr('string'),
  analysis: DS.belongsTo('analysis', {inverse: 'attachments'})
});
