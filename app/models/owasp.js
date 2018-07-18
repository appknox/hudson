import DS from 'ember-data';

const Owasp = DS.Model.extend({
  code: DS.attr(),
  title: DS.attr(),
  description: DS.attr(),
  year: DS.attr(),
  analysis: DS.belongsTo('analysis', {inverse: 'owasp'}),
});

export default Owasp;
