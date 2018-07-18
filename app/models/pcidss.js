import DS from 'ember-data';

const Pcidss = DS.Model.extend({
  code: DS.attr(),
  title: DS.attr(),
  description: DS.attr(),
  analysis: DS.belongsTo('analysis', {inverse: 'pcidss'}),
});

export default Pcidss;
