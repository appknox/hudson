import Ember from 'ember';
import ENUMS from 'hudson/enums';

export function metricInteraction(params) {
  let impact = params[0];
  if(typeof impact === "object") {
    impact = impact.value;
  }
  switch (impact) {
    case ENUMS.USER_INTERACTION.NOT_REQUIRED: return "NOT REQUIRED";
    case ENUMS.USER_INTERACTION.REQUIRED: return "REQUIRED";
    case ENUMS.USER_INTERACTION.UNKNOWN: return "UNKNOWN";
    default: return impact;
  }
}

export default Ember.Helper.helper(metricInteraction);
