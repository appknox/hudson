import DRFSerializer from './drf';

export default DRFSerializer.extend({
  normalizeResponse: function (store, primaryModelClass, payload) {
    return {
      data: {
        id: payload.id,
        type: 'analysis',
        attributes: {
          risk: payload.risk,
          owasp: payload.owasp,
          scope: payload.scope,
          status: payload.status,
          pcidss: payload.pcidss,
          findings: payload.findings,
          cvssBase: payload.cvss_base,
          attackVector: payload.attack_vector,
          overriddenRisk: payload.overridden_risk,
          userInteraction: payload.user_interaction,
          integrityImpact: payload.integrity_impact,
          attackComplexity: payload.attack_complexity,
          privilegesRequired: payload.privileges_required,
          availabilityImpact: payload.availability_impact,
          confidentialityImpact: payload.confidentiality_impact,
          overriddenRiskToProfile: payload.overridden_risk_to_profile,
          cvssVersion: payload.cvss_version,
          cvssVector: payload.cvss_vector
        },
        relationships: {
          file: {
            data: {
              type: "file",
              id: payload.file.id
            }
          },
          vulnerability: {
            data: {
              type: "vulnerability",
              id: payload.vulnerability.id
            }
          }
        }
      }
    };
  }
});
