import DRFSerializer from './drf';

export default DRFSerializer.extend({
  normalizeResponse: function (store, primaryModelClass, payload) {
    return {
      data: {
        id: payload.id,
        type: 'analysis',
        attributes: {
          status: payload.status,
          risk: payload.risk,
          cvssBase: payload.cvss_base,
          attackVector: payload.attack_vector,
          attackComplexity: payload.attack_complexity,
          privilegesRequired: payload.privileges_required,
          userInteraction: payload.user_interaction,
          scope: payload.scope,
          confidentialityImpact: payload.confidentiality_impact,
          integrityImpact: payload.integrity_impact,
          availabilityImpact: payload.availability_impact,
          owasp: payload.owasp,
          pcidss: payload.pcidss,
          findings: payload.findings
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
