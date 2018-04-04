/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const InvoiceDetailsComponent = Ember.Component.extend({

  discountAmount: (function() {
    const price = this.get("invoice.pricing.price");
    const discount = this.get("invoice.coupon.discount");
    return (price * discount)/100;
  }).property("invoice.pricing.price", "invoice.coupon.discount")
});

export default InvoiceDetailsComponent;
