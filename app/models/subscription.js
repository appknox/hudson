/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import DS from 'ember-data';
import ENUMS from 'hudson/enums';

const Subscription = DS.Model.extend({

  duration: DS.attr('number'),
  scansLeft: DS.attr('number'),
  expiryDate: DS.attr('date'),
  limitedScans: DS.attr('boolean'),
  source: DS.attr('number'),
  user : DS.belongsTo('user', {inverse: 'subscription'}),
  pricing : DS.belongsTo('pricing', {inverse: 'subscriptions'}),

  perScanSubscription: (function() {
    const limitedScans = this.get("limitedScans");
    return limitedScans;
  }).property("limitedScans"),

  humanizedExpiryDate: (function() {
    const expiryDate = this.get("expiryDate");
    return (expiryDate != null ? expiryDate.toLocaleDateString() : undefined);
  }).property("expiryDate"),

  sourceType: (function() {
    switch (this.get("source")) {
      case ENUMS.PAYMENT_SOURCE.PAYPAL: return "Paypal";
      case ENUMS.PAYMENT_SOURCE.STRIPE_MANUAL: return "Stripe Manual";
      case ENUMS.PAYMENT_SOURCE.BANK_TRANSFER: return "Bank Transfer";
      case ENUMS.PAYMENT_SOURCE.MANUAL: return "Manual";
      case ENUMS.PAYMENT_SOURCE.STRIPE_RECURRING: return "Stripe Recurring";
      default: return "unknown";
    }
  }).property("source")
});

export default Subscription;
