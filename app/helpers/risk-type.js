import Ember from 'ember';
import ENUMS from 'hudson/enums';

export function riskType(params) {
  let risk = params[0];
  if(typeof risk === "object") {
    risk = risk.value;
  }
  switch (risk) {
    case ENUMS.RISK.UNKNOWN: return "UNTESTED";
    case ENUMS.RISK.NONE: return "NONE";
    case ENUMS.RISK.LOW: return "LOW";
    case ENUMS.RISK.MEDIUM: return "MEDIUM";
    case ENUMS.RISK.HIGH: return "HIGH";
    case ENUMS.RISK.CRITICAL: return "CRITICAL";
    default: return risk;
  }
}

export default Ember.Helper.helper(riskType);
