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

const CouponDetailsComponent = Ember.Component.extend({

  coupon: (function() {
    return this.get('store').createRecord('coupon');
  }).property(),

  showHide: true,
  editUnedit: false,

  actions: {

    editText() {
      this.set("showHide", false);
      return this.set("editUnedit", true);
    },

    cancelForm() {
      this.set("showHide", true);
      return this.set("editUnedit", false);
    },

    saveText() {
      const code = this.get("coupon.code");
      const discount = this.get("coupon.discount");

      for (let inputValue of [code,discount]) {
        if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
      }

      const that = this;
      const coupon = this.get('coupon');
      return coupon.save()
      .then(function() {
        that.set("showHide", true);
        that.set("editUnedit", false);
        return that.get("notify").success("Coupon Updated!");}).catch(error =>
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

export default CouponDetailsComponent;
