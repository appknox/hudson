/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import DS from 'ember-data';
import ENUMS from 'hudson/enums';

const Collaboration = DS.Model.extend({

  user: DS.belongsTo('user', {inverse: 'collaborations'}),
  role: DS.attr('number'),
  username: DS.attr('string'),

  roleHumanized:(function() {
    switch (this.get("role")) {
      case ENUMS.COLLABORATION_ROLE.ADMIN: return "Admin";
      case ENUMS.COLLABORATION_ROLE.MANAGER: return "Manager";
      case ENUMS.COLLABORATION_ROLE.READ_ONLY: return "Read Only";
    }
  }).property("role")
});

export default Collaboration;
