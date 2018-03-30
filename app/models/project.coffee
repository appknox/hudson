`import DS from 'ember-data'`

Project = DS.Model.extend
  owner: DS.belongsTo 'user', inverse: 'ownedProjects'
  files: DS.hasMany 'file', inverse:'project'
  platform: DS.attr 'number'
  packageName: DS.attr 'string'

`export default Project`
