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

const CreatePricingComponent = Ember.Component.extend({

  pricing: (function() {
    return this.get('store').createRecord('pricing');
  }).property(),

  stat: (function() {
    return this.get('store').find('stat', 1);
  }).property(),

  actions: {

    addPricing() {
      const name = this.get("pricing.name");
      const price = this.get("pricing.price");
      const projectsLimit = this.get("pricing.projectsLimit");
      const description = this.get("pricing.description");

      for (let inputValue of [name,price,projectsLimit,description]) {
        if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
      }

      const that = this;
      const pricing = this.get('pricing');
      return pricing.save()
      .then(function(){
        that.send("closeModal");
        $('#create-pricing').find("input, textarea").val("");
        return that.get("notify").success("Pricing added!");}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    },

    openPricingModal() {
        return this.set("showPricingModal", true);
      },

    closeModal() {
      return this.set("showPricingModal", false);
    }
  }
});

export default CreatePricingComponent;
