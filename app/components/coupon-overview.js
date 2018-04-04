/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import ENV from 'hudson/config/environment';

const CouponOverviewComponent = Ember.Component.extend({

  tagName: ['tr'],
  classNames: ['table-content'],

  actions: {
    deleteCoupon() {
      const coupon = this.get('coupon');
      const couponCode = this.get("coupon.code");
      const deletedCoupon = prompt("Enter the coupon code which you want to delete ", "");
      if (deletedCoupon === null) {
        return;
      } else if (deletedCoupon !== couponCode) {
        return this.get("notify").error("Enter the right coupon code to delete it");
      }
      const that = this;
      return coupon.destroyRecord()
      .then(data => that.get("notify").success(`Coupon ${couponCode} has been deleted`)).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    }
  }
});


export default CouponOverviewComponent;
