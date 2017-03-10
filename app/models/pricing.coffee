`import DS from 'ember-data'`

Pricing = DS.Model.extend
  name: DS.attr 'string'
  description: DS.attr 'string'
  price: DS.attr 'number'
  projectsLimit: DS.attr "number"
  invoices: DS.hasMany 'invoice', inverse:'pricing'

`export default Pricing`
