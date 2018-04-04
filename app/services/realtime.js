import Ember from 'ember';

const RealtimeService = Ember.Service.extend({

  UserCounter: 0,
  PricingCount: 0,
  FileCount: 0,
  CouponCount: 0,
  InvoiceCount: 0
});

export default RealtimeService;
