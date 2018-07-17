import DS from 'ember-data';

const Project = DS.Model.extend({
  owner: DS.belongsTo('user', {inverse: 'ownedProjects'}),
  files: DS.hasMany('file', {inverse:'project'}),
  platform: DS.attr('number'),
  package_name: DS.attr('string')
});

export default Project;
