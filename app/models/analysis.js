import DS from 'ember-data';

export default DS.Model.extend({
  owasp: DS.attr(),
  pcidss: DS.attr(),
  findings: DS.attr(),
  risk: DS.attr('number'),
  scope: DS.attr('number'),
  status: DS.attr('number'),
  cvssBase: DS.attr('number'),
  cvssVector: DS.attr('number'),
  cvssVersion: DS.attr('number'),
  attackVector: DS.attr('number'),
  integrityImpact: DS.attr('number'),
  userInteraction: DS.attr('number'),
  analiserVersion: DS.attr('number'),
  attackComplexity: DS.attr('number'),
  privilegesRequired: DS.attr('number'),
  availabilityImpact: DS.attr('number'),
  confidentialityImpact: DS.attr('number'),
  vulnerability: DS.belongsTo('vulnerability'),
  file: DS.belongsTo('file', {inverse: 'analyses'})
});
