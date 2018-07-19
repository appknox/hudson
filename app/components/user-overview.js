/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const UserOverviewComponent = Ember.Component.extend({

  tagName: ['tr'],
  classNames: ['table-content'],

  actions: {
    deleteUser() {
      const user = this.get('user');
      const userName = this.get("user.username");
      const deletedUser = prompt("Enter the username which you want to delete ", "");
      if (deletedUser === null) {
        return;
      } else if (deletedUser !== userName) {
        return this.get("notify").error("Enter the right username to delete it");
      }
      const that = this;
      return user.destroyRecord()
      .then(() => that.get("notify").success(`User ${userName} has been deleted`)).catch(error =>
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

export default UserOverviewComponent;
