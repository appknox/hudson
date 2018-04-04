/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const PricingOverviewComponent = Ember.Component.extend({

  tagName: ['tr'],
  classNames: ['table-content'],

  actions: {
    deletePricing() {
      const pricing = this.get('pricing');
      const pricingName = this.get("pricing.name");
      const deletedPricing = prompt("Enter the pricing name which you want to delete ", "");
      if (deletedPricing === null) {
        return;
      } else if (deletedPricing !== pricingName) {
        return this.get("notify").error("Enter the right pricing name to delete it");
      }
      const that = this;
      return pricing.destroyRecord()
      .then(function() {
        that.get("notify").success(`Pricing ${pricingName} has been deleted`);
      })
      .catch(error =>
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

export default PricingOverviewComponent;
