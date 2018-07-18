import DS from 'ember-data';

export default DS.Model.extend({
  findings: DS.attr(),
  risk: DS.attr('number'),
  status: DS.attr('number'),
  attack_vector: DS.attr('string'),
  attack_complexity: DS.attr('string'),
  privileges_required: DS.attr('string'),
  user_interaction: DS.attr('string'),
  scope: DS.attr('string'),
  confidentiality_impact: DS.attr('string'),
  integrity_impact: DS.attr('string'),
  availability_impact: DS.attr('string'),
  cvss_base: DS.attr('string'),
  cvss_vector: DS.attr('string'),
  cvss_version: DS.attr('string'),
  analiserVersion: DS.attr('number'),
  overridden_risk: DS.attr('number'),
  overridden_risk_to_profile: DS.attr('boolean'),
  vulnerability: DS.belongsTo('vulnerability'),
  owasp: DS.hasMany('owasp', {inverse:'analysis'}),
  pcidss: DS.hasMany('pcidss', {inverse:'analysis'}),
  file: DS.belongsTo('file', {inverse: 'analyses'}),
  attachments: DS.hasMany('attachment')
});
