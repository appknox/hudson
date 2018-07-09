import Ember from 'ember';
import ENUMS from 'hudson/enums';

export function riskType(params) {

  const risk = params[0];

  switch (risk) {
    case ENUMS.RISK.UNKNOWN: return "UNTESTED";
    case ENUMS.RISK.NONE: return "NONE";
    case ENUMS.RISK.LOW: return "LOW";
    case ENUMS.RISK.MEDIUM: return "MEDIUM";
    case ENUMS.RISK.HIGH: return "HIGH";
    case ENUMS.RISK.CRITICAL: return "CRITICAL";
  }
}

export default Ember.Helper.helper(riskType);
