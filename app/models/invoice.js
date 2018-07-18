/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import DS from 'ember-data';
import ENUMS from 'hudson/enums';

const Invoice = DS.Model.extend({
  user : DS.belongsTo('user', {inverse: 'invoices'}),
  amount: DS.attr('string'),
  paidOn: DS.attr('date'),
  source: DS.attr('number'),
  pricing: DS.belongsTo('pricing', {inverse:'invoices'}),
  coupon: DS.belongsTo('coupon', {inverse:'invoices'}),
  duration: DS.attr('number'),

  sourceType: (function() {
    switch (this.get("source")) {
      case ENUMS.PAYMENT_SOURCE.PAYPAL: return "Paypal";
      case ENUMS.PAYMENT_SOURCE.STRIPE_MANUAL: return "Stripe Manual";
      case ENUMS.PAYMENT_SOURCE.BANK_TRANSFER: return "Bank Transfer";
      case ENUMS.PAYMENT_SOURCE.MANUAL: return "Manual";
      case ENUMS.PAYMENT_SOURCE.STRIPE_RECURRING: return "Stripe Recurring";
      default: return "unknown";
    }
  }).property("source"),

  durationText: (function() {
    switch (this.get("duration")) {
      case ENUMS.PAYMENT_DURATION.MONTHLY: return "Monthly";
      case ENUMS.PAYMENT_DURATION.QUATERLY: return "Quaterly";
      case ENUMS.PAYMENT_DURATION.HALFYEARLY: return "Half Yearly";
      case ENUMS.PAYMENT_DURATION.YEARLY: return "Yearly";
      default: return "";
    }
  }).property("duration"),

  paidOnHumanized: (function() {
    const paidOn = this.get("paidOn");
    return paidOn.toLocaleDateString();
  }).property("paidOn"),

  hasDiscount: (function() {
    const discount = this.get("coupon.discount");
    return typeof(discount) !== "undefined";
  }).property("coupon.discount")
});

export default Invoice;
