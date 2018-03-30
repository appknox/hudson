`import DS from 'ember-data'`
`import ENUMS from 'hudson/enums'`

User = DS.Model.extend
  uuid: DS.attr 'string'
  username: DS.attr 'string'
  role: 2
  department: 2
  email: DS.attr 'string'
  password: DS.attr 'string'
  firstName: DS.attr 'string'
  lastName: DS.attr 'string'
  namespaces: DS.attr 'string'
  projectCount: DS.attr 'number'
  dateJoined: DS.attr 'date'
  isActive: DS.attr 'boolean'
  anyNamespace: DS.attr 'boolean'
  invoices: DS.hasMany 'invoice', inverse:'user'
  collaborations: DS.hasMany 'collaboration', inverse:'user'
  files: DS.hasMany 'file', inverse:'user'
  subscription: DS.belongsTo 'subscription', inverse:'user'
  ownedProjects: DS.hasMany 'project', inverse:'owner'

  showSalesDashboard: (->
    role = @get "role"
    department = @get "department"
    if role is ENUMS.USER_ROLE.CO_FOUNDER
      true
    else if role is ENUMS.USER_ROLE.EMPLOYEE and department is ENUMS.USER_DEPARTMENT.SALES
      true
    else
      false
  ).property "role", "department"

  showSecurityDashboard: (->
    role = @get "role"
    department = @get "department"
    if role is ENUMS.USER_ROLE.CO_FOUNDER
      true
    else if role is ENUMS.USER_ROLE.EMPLOYEE and department is ENUMS.USER_DEPARTMENT.SECURITY
      true
    else
      false
  ).property "role", "department"


  hasSubscription: (->
    subscriptionId = @get "subscription.id"
    !Ember.isEmpty subscriptionId
  ).property "subscription.id"

  fullName: (->
    firstName = @get "firstName"
    lastName = @get "lastName"
    firstName + " " + lastName
  ).property "firstName","lastName"

  dateJoinedHumanized: Ember.computed "dateJoined", ->
    dateJoined = @get "dateJoined"
    if Ember.isEmpty dateJoined
      return
    "#{dateJoined.toLocaleDateString()}"

  userStatus: (->
    isActive = @get "isActive"
    if isActive is false
      "active"
    else
      "inactive"
  ).property "isActive"

`export default User`
