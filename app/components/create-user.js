/* jshint ignore:start */
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const isEmpty = inputValue=> Ember.isEmpty(inputValue);

const CreateUserComponent = Ember.Component.extend({

  user: (function() {
    return this.get('store').createRecord('user');
  }).property(),

  stat: (function() {
    return this.get('store').find('stat', 1);
  }).property(),

  actions: {

    anyNamespace() {
      return this.set("user.anyNamespace", !this.get("user.anyNamespace"));
    },

    addUser() {
      let inputValue;
      const username = this.get("user.username");
      const email = this.get("user.email");
      const password = this.get("user.password");
      const firstName = this.get("user.firstName");
      const lastName = this.get("user.lastName");
      const anyNamespace = this.get("user.anyNamespace");
      const namespaces = this.get("user.namespaces");

      if (!anyNamespace) {
        for (inputValue of [namespaces]) {
          if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
        }
      }

      for (inputValue of [username,email,password,firstName,lastName]) {
        if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
      }

      const that = this;
      const user = this.get('user');
      return user.save()
      .then(function() {
        that.send("closeModal");
        $('#create-user').find("input, textarea").val("");
        return that.get("notify").success("User added!");}).catch(error =>
        (() => {
          const result = [];
          for (error of Array.from((error != null ? error.errors : undefined))) {
            result.push(that.get("notify").error(__guard__(error != null ? error.detail : undefined, x => x.message)));
          }
          return result;
        })()
      );
    },


    openUserModal() {
        return this.set("showUserModal", true);
      },

    closeModal() {
      return this.set("showUserModal", false);
    }
  }
});

export default CreateUserComponent;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

/* jshint ignore:end */
