/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import ENUMS from 'hudson/enums';
import ENV from 'hudson/config/environment';

const isEmpty = inputValue=> Ember.isEmpty(inputValue);

const UserDetailsComponent = Ember.Component.extend({

  newPassword: "",
  confirmPassword: "",

  sources: ENUMS.PAYMENT_SOURCE.CHOICES.slice(0, -1),
  durations: ENUMS.PAYMENT_DURATION.CHOICES.slice(0, -1),

  user: (function() {
    return this.get('store').createRecord('user');
  }).property(),

  isOverview: true,
  isNamespace: false,
  isSubscription: false,

  scansLeft: true,
  expiryDate: true,

  addSubscription: true,
  subscriptionForm: false,

  showHide: true,
  editUnedit: false,

  showSubscription: true,
  editSubscription: false,

  showScansLeft: true,
  showExpiryDate: false,


  hasScansLeft: true,
  regularUserSelected: false,

  hasExpiryDate: true,
  scansLeftSelected: false,

  pricings: (function() {
    const store = this.get("store");
    return store.findAll("pricing");
  }).property(),

  coupons: (function() {
    const store = this.get("store");
    return store.findAll("coupon");
  }).property(),

  subscriptions: (function() {
    const store = this.get("store");
    return store.findAll("subscription");
  }).property(),

  overviewClass: Ember.computed("isOverview", function() {
    if (this.get("isOverview")) {
      return "is-active";
    }
  }),
  namespaceClass: Ember.computed("isNamespace", function() {
    if (this.get("isNamespace")) {
      return "is-active";
    }
  }),
  subscriptionClass: Ember.computed("isSubscription", function() {
    if (this.get("isSubscription")) {
      return "is-active";
    }
  }),

  actions: {

    displayOverview() {
      this.set("isOverview", true);
      this.set("isNamespace", false);
      return this.set("isSubscription", false);
    },

    displayNamespace() {
      this.set("isOverview", false);
      this.set("isNamespace", true);
      return this.set("isSubscription", false);
    },

    displaySubscription() {
      this.set("isOverview", false);
      this.set("isNamespace", false);
      return this.set("isSubscription", true);
    },

    openSubscriptionForm() {
      this.set("addSubscription", false);
      return this.set("subscriptionForm", true);
    },

    closeSubscriptionForm() {
      this.set("addSubscription", true);
      return this.set("subscriptionForm", false);
    },

    editUser() {
      this.set("showHide", false);
      return this.set("editUnedit", true);
    },

    editSubscription() {
      this.set("showSubscription", false);
      return this.set("editSubscription", true);
    },

    cancelForm() {
      this.set("showHide", true);
      return this.set("editUnedit", false);
    },

    cancelSubscription() {
      this.set("showSubscription", true);
      return this.set("editSubscription", false);
    },

    updateUser() {
      const fullName = this.get("user.fullName");
      const username = this.get("user.username");
      const email = this.get("user.email");

      for (let inputValue of [fullName,username,email]) {
        if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
      }

      const that = this;
      const user = this.get('user');
      return user.save()
      .then(function(data) {
        that.set("showHide", true);
        that.set("editUnedit", false);
        return that.get("notify").success("User Updated!");}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    },

    changePassword() {
      const newPassword = this.get("newPassword");
      const confirmPassword = this.get("confirmPassword");

      if (newPassword !== confirmPassword) {
        return this.get("notify").error("Password doesn't match");
      }

      const userId = this.get("user.id");
      const changePassword = [ENV.endpoints.changePassword, userId].join('/');
      const data = {
        "data": {
          "attributes": {
            "password": confirmPassword
          },
          "type": "user"
        }
      };
      const that = this;
      return this.get("ajax").post(changePassword, {data: JSON.stringify(data)})
      .then(function(data) {
        that.get("notify").success("Password Changed");
        that.set("newPassword", '');
        return that.set("confirmPassword", '');}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    },

    anyNamespace() {
      return this.set("user.anyNamespace", !this.get("user.anyNamespace"));
    },

    addNamespaces() {
      const anyNamespace = this.get("user.anyNamespace");
      const namespaces = this.get("user.namespaces");

      const userId = this.get("user.id");
      const namespace = [ENV.endpoints.namespace, userId].join('/');
      const that = this;
      const data = {
        "data": {
          "attributes": {
            "any-namespace": anyNamespace,
            "namespaces": namespaces
          },
          "type": "users"
        }
      };
      return this.get("ajax").patch(namespace, {data: JSON.stringify(data)})
      .then(function(data) {
        that.set("showHide", true);
        that.set("editUnedit", false);
        that.get("notify").success("Namespace added!");
        return setTimeout(() => window.location.reload() // FIXME: Hackish Way
        ,
          3 * 1000);}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    },

    updatedPricingPlan() {
      return this.set("updatedPricingPlan", parseInt(this.$('#updated-pricing-plan').val()));
    },

    updatedPaymentSource() {
      return this.set("updatedPaymentSource", parseInt(this.$('#updated-payment-source').val()));
    },

    updatedPaymentType() {
      const updatedPaymentType = parseInt(this.$('.updated-payment-type').val());
      if (updatedPaymentType === ENUMS.PLAN_TYPE.PER_SCAN) {
        this.set("hasScansLeft", true);
        this.set("scansLeftSelected", true);
        this.set("hasExpiryDate", false);
        this.set("regularUserSelected", false);
        return this.set("haslimitedScans", true);
      } else {
        this.set("hasScansLeft", false);
        this.set("scansLeftSelected", false);
        this.set("hasExpiryDate", true);
        this.set("regularUserSelected", true);
        this.set("haslimitedScans", false);
        return this.set("totalScansLeft", 0);
      }
    },

    changedDuration() {
      return this.set("updatedDuration", parseInt(this.$('#changed-duration').val()));
    },

    updatedDuration() {
      return this.set("updatedDuration", parseInt(this.$('#updated-duration').val()));
    },

    saveSubscription() {

      const pricingId = this.get("user.subscription.pricing.id");
      const paymentSource = this.get("user.subscription.source");
      const limitedScans = this.get("user.subscription.limitedScans");
      const scansLeftCount = this.get("user.subscription.scansLeft");
      const duration = this.get("user.subscription.duration");

      let updatedPricingPlan = this.get("updatedPricingPlan");
      let haslimitedScans = this.get("haslimitedScans");
      let updatedPaymentSource = this.get("updatedPaymentSource");
      let totalScansLeft = this.get("totalScansLeft");
      let updatedDuration = this.get("updatedDuration");
      const selectedExpiryDate = this.get("selectedExpiryDate");

      if (Ember.isEmpty(updatedPricingPlan)) {
        updatedPricingPlan = pricingId;
      }
      if (Ember.isEmpty(updatedPaymentSource)) {
        updatedPaymentSource = paymentSource;
      }
      if (Ember.isEmpty(haslimitedScans)) {
        haslimitedScans = limitedScans;
      }
      if (Ember.isEmpty(totalScansLeft)) {
        totalScansLeft = scansLeftCount;
      }
      if (Ember.isEmpty(updatedDuration)) {
        updatedDuration = duration;
      }

      const userId = this.get("user.id");
      const subscriptionId = this.get("user.subscription.id");
      const subscription = [ENV.endpoints.subscription, subscriptionId].join('/');
      const that = this;
      const data = {
        "data": {
          "attributes": {
            "duration": updatedDuration,
            "source": updatedPaymentSource,
            "scans-left": totalScansLeft,
            "expiry-date": selectedExpiryDate,
            "limited-scans": haslimitedScans
          },
          "relationships": {
            "pricing": {
              "data": {
                "id": updatedPricingPlan,
                "type": "pricing"
              }
            },
            "user": {
              "data": {
                "id": userId,
                "type": "user"
              }
            }
          },
          "type": "subscriptions"
        }
      };
      return this.get("ajax").patch(subscription, {data: JSON.stringify(data)})
      .then(function(data) {
        that.set("showSubscription", true);
        that.set("editSubscription", false);
        that.get("notify").success("Subscription Updated!");
        return setTimeout(() => window.location.reload() // FIXME: Hackish Way
        ,
          3 * 1000);}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    },


    addedPricing() {
      return this.set("addedPricing", parseInt(this.$('#added-pricing').val()));
    },

    addedSource() {
      return this.set("addedSource", parseInt(this.$('#added-source').val()));
    },

    changedPaymentType() {
      this.set("changedPaymentType", parseInt(this.$('#added-payment-type').val()));

      const changedPaymentType = this.get("changedPaymentType");

      if (changedPaymentType === ENUMS.PLAN_TYPE.PER_SCAN) {
        this.set("showExpiryDate", false);
        this.set("showScansLeft", true);
        this.set("haslimitedScans", true);
        return this.set("addedDuration", 0);
      } else {
        this.set("showExpiryDate", true);
        this.set("showScansLeft", false);
        this.set("haslimitedScans", false);
        return this.set("totalScansLeft", 0);
      }
    },

    addedDuration() {
      return this.set("addedDuration", parseInt(this.$('#added-duration').val()));
    },


    addNewSubscription() {

      const addedPricing = this.get("addedPricing");
      const addedSource = this.get("addedSource");
      const addedDuration = this.get("addedDuration");

      const totalScansLeft = this.get("totalScansLeft");
      const haslimitedScans = this.get("haslimitedScans");
      const selectedExpiryDate = this.get("selectedExpiryDate");

      if ([addedPricing, addedSource, addedDuration, totalScansLeft, haslimitedScans, selectedExpiryDate ].includes(undefined)) {
        this.get("notify").error("Please Enter/Select all the fields");
      }

      const userId = this.get("user.id");
      const that = this;
      const data = {
        "data": {
          "attributes": {
            "duration": addedDuration,
            "source": addedSource,
            "scans-left": totalScansLeft,
            "expiry-date": selectedExpiryDate,
            "limited-scans": haslimitedScans
          },
          "relationships": {
            "pricing": {
              "data": {
                "id": addedPricing,
                "type": "pricing"
              }
            },
            "user": {
              "data": {
                "id": userId,
                "type": "user"
              }
            }
          },
          "type": "subscriptions"
        }
      };
      return this.get("ajax").post(ENV.endpoints.subscription, {data: JSON.stringify(data)})
      .then(function(data) {
        that.get("notify").success("Subscription added!");
        return setTimeout(() => window.location.reload() // FIXME: Hackish Way
        ,
          3 * 1000);}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from(error.errors)) {
            result.push(that.get("notify").error(error.detail != null ? error.detail.message : undefined));
          }
          return result;
        })()
      );
    },

    deleteSubscription() {
      const subscriptionId = this.get("user.subscription.id");
      const subscription = [ENV.endpoints.subscription, subscriptionId].join('/');
      if (!confirm("Do you want to delete this subscription?")) { return; }
      const that = this;
      return this.get("ajax").delete(subscription)
      .then(function(data) {
        that.get("notify").success("Subscription deleted successfully");
        return setTimeout(() => window.location.reload() // FIXME: Hackish Way
        ,
          3 * 1000);}).catch(error =>
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


export default UserDetailsComponent;
