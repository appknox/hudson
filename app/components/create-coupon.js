/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const isEmpty = inputValue=> Ember.isEmpty(inputValue);

const CreateCouponComponent = Ember.Component.extend({

  coupon: (function() {
    return this.get('store').createRecord('coupon');
  }).property(),

  stat: (function() {
    return this.get('store').find('stat', 1);
  }).property(),

  actions: {

    addCoupon() {
      const code = this.get("coupon.code");
      let discount = this.get("coupon.discount");

      for (let inputValue of [code,discount]) {
        if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
      }

      const that = this;
      const coupon = this.get('coupon');
      discount =  this.get("coupon.discount");
      const discountPercentage = discount/100;
      coupon.set("discount", discountPercentage);
      return coupon.save()
      .then(function(){
        that.send("closeModal");
        $('#create-coupon').find("input").val("");
        return that.get("notify").success("Coupon added!");}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    },

    openCouponModal() {
        return this.set("showCouponModal", true);
      },

    closeModal() {
      return this.set("showCouponModal", false);
    }
  }
});

export default CreateCouponComponent;
