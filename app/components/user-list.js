/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import PaginateMixin from 'hudson/mixins/paginate';

const UserListComponent = Ember.Component.extend(PaginateMixin, {

  query: "",
  targetObject: "user",

  sortProperties: ["id"],

  newUserObserver: Ember.observer("realtime.UserCount", function() {
    return this.incrementProperty("version");
  }),

  resetOffset() {
    return this.set("offset", 0);
  },

  offsetResetter: Ember.observer("query", function() {
    return (() => {
      const result = [];
      for (let property of ["query"]) {
        const propertyOldName = `_${property}`;
        const propertyNewValue = this.get(property);
        const propertyOldValue = this.get(propertyOldName);
        const propertyChanged = propertyOldValue !== propertyNewValue;
        if (propertyChanged) {
          this.set(propertyOldName, propertyNewValue);
          result.push(Ember.run.once(this, 'resetOffset'));
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }),

  extraQueryStrings: Ember.computed("query", function() {
    const query =
      {query: this.get("query")};
    return JSON.stringify(query, Object.keys(query).sort());
  })
}
);

export default UserListComponent;
