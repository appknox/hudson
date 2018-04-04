import DS from 'ember-data';

const Stat = DS.Model.extend({

  users: DS.attr('number'),
  coupons: DS.attr('number'),
  pricings: DS.attr('number'),
  subscriptions: DS.attr('number'),
  files: DS.attr('number'),
  invoices: DS.attr('number')
});

export default Stat;
