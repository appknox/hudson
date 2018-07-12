import DS from 'ember-data';

export default DS.Model.extend({

  findings: DS.attr(),
  risk: DS.attr('number'),
  scope: DS.attr('number'),
  status: DS.attr('number'),
  cvssBase: DS.attr('string'),
  cvssVector: DS.attr('string'),
  cvssVersion: DS.attr('number'),
  attackVector: DS.attr('number'),
  overriddenRisk: DS.attr('number'),
  integrityImpact: DS.attr('number'),
  userInteraction: DS.attr('number'),
  analiserVersion: DS.attr('number'),
  attackComplexity: DS.attr('number'),
  privilegesRequired: DS.attr('number'),
  availabilityImpact: DS.attr('number'),
  confidentialityImpact: DS.attr('number'),
  overriddenRiskToProfile: DS.attr('boolean'),
  vulnerability: DS.belongsTo('vulnerability'),
  owasps: DS.hasMany('owasp', {inverse:'analysis'}),
  file: DS.belongsTo('file', {inverse: 'analyses'}),
  pcidsses: DS.hasMany('pcidss', {inverse:'analysis'})
});
