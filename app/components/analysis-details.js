import Ember from 'ember';
import ENUMS from 'hudson/enums';
import { task } from 'ember-concurrency';
import ENV from 'hudson/config/environment';

const { get, set } = Ember;

const isEmpty = inputValue=> Ember.isEmpty(inputValue);

const {inject: {service}} = Ember;

const AnalysisDetailsComponent = Ember.Component.extend({

  findingId: 0,
  findings: [],
  findingTitle: "",
  findingDescription: "",

  session: service(),

  risks: ENUMS.RISK.CHOICES,
  scopes: ENUMS.SCOPE.CHOICES.slice(0, 2),
  statuses: ENUMS.ANALYSIS_STATUS.CHOICES.slice(0),
  attackVectors: ENUMS.ATTACK_VECTOR.CHOICES.slice(0, 4),
  integrityImpacts: ENUMS.INTEGRITY_IMPACT.CHOICES.slice(0, 3),
  userInteractions: ENUMS.USER_INTERACTION.CHOICES.slice(0, 2),
  attackComplexities: ENUMS.ATTACK_COMPLEXITY.CHOICES.slice(0, 2),
  requiredPrevileges: ENUMS.PRIVILEGES_REQUIRED.CHOICES.slice(0, 3),
  availabilityImpacts: ENUMS.AVAILABILITY_IMPACT.CHOICES.slice(0, 3),
  confidentialityImpacts: ENUMS.CONFIDENTIALITY_IMPACT.CHOICES.slice(0, 3),

  analysisDetails: (function() {
    return this.get("store").findRecord('analysis', this.get("analysis.analysisId"));
  }).property(),

  owasps: (function() {
    const owasps = [];
    return this.get("store").findAll("owasp").then((data) => {
      data.content.forEach((item) => {
        owasps.push(item.id);
      });
      return owasps;
    });
  }).property(),

  pcidsses: (function() {
    const pcidsses = [];
    return this.get("store").findAll("pcidss").then((data) => {
      data.content.forEach((item) => {
        pcidsses.push(`${item.id} - ${item.__data.code} - ${item.__data.title} - ${item.__data.description}`);
      });
      return pcidsses;
    });
  }).property(),

  allFindings: (function() {
    let findingId = this.get("findingId");
    const findings = this.get("analysisDetails.findings");
    if(findings) {
      findings.forEach((finding) => {
        findingId = findingId + 1;
        finding.id = findingId;
        this.set("findingId", findingId);
      });
      return findings;
    }
  }).property("analysisDetails.findings"),


  confirmCallback() {
    const availableFindings = this.get("availableFindings");
    this.set("analysisDetails.findings", availableFindings);
    return this.set("showRemoveFindingConfirmBox", false);
  },

  availableFindings: Ember.computed.filter('allFindings', function(allFinding) {
    const deletedFinding = this.get("deletedFinding");
    return allFinding.id !== deletedFinding;
  }),

  updateCVSSScore() {
    const attackVector = this.get("analysisDetails.attackVector");
    const attackComplexity = this.get("analysisDetails.attackComplexity");
    const privilegesRequired = this.get("analysisDetails.privilegesRequired");
    const userInteraction = this.get("analysisDetails.userInteraction");
    const scope = this.get("analysisDetails.scope");
    const confidentialityImpact = this.get("analysisDetails.confidentialityImpact");
    const integrityImpact = this.get("analysisDetails.integrityImpact");
    const availabilityImpact = this.get("analysisDetails.availabilityImpact");
    const vector =`CVSS:3.0/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scope}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`;
    const url = `cvss?vector=${vector}`;
    this.get("ajax").request(url)
    .then((data) => {
      this.set("analysisDetails.cvssBase", data.cvss_base);
      this.set("analysisDetails.risk", data.risk);
    }, () => {
      this.get("notify").error("Sorry something went wrong, please try again");
    })
  },

  actions: {

    deleteFile(id) {
      const url = [ENV.endpoints.deleteAttachment, id].join('/');
      this.get("ajax").delete(url, {namespace: 'hudson-api'})
      .then(() => {
        this.get("notify").success("File Deleted Successfully");
      }, () => {
        this.get("notify").error("Sorry something went wrong, please try again");
      })

    },

    uploadImage(file) {
      this.set("isUploading", true);
      const fileName = file.blob.name;
      const userId = this.get("session.data.authenticated.user_id");
      const data = {
        file_name: fileName
      };
      this.get("ajax").post(ENV.endpoints.uploadFile,{namespace: 'hudson-api', data})
      .then((fileData) => {
        const analysisId= this.get("analysis.analysisId");
        const fileDetailsData = {
          file_uuid: fileData.file_uuid,
          file_name: fileName,
          user_id: userId,
          object_id: analysisId,
          content_type: "analysis"
        }
        this.get("ajax").post(ENV.endpoints.uploadedAttachment,{namespace: 'hudson-api', data: fileDetailsData})
        .then((data) => {
          const attachments = this.get("analysisDetails.attachments");
          const attachment = {
            id: data.id,
            name: data.name,
            user: data.user,
            created_on: data.created_on,
            file_key: data.file_key
          };
          attachments.push(attachment);
          this.set("analysisDetails.attachments", attachments);
          this.set("isUploading", false);

        }, () => {
          this.set("isUploading", false);
          this.get("notify").error("Sorry something went wrong, please try again");
        })
      }, () => {
        this.set("isUploading", false);
        this.get("notify").error("Sorry something went wrong, please try again");
      })
    },

    selectStatus(param) {
      this.set('analysisDetails.status', param);
    },

    selectAttackVector(param) {
      this.set('analysisDetails.attackVector', param.value);
      this.updateCVSSScore();
    },

    selectAttackComplexity(param) {
      this.set('analysisDetails.attackComplexity', param.value);
      this.updateCVSSScore();
    },

    selectRequiredPrevilege(param) {
      this.set('analysisDetails.privilegesRequired', param.value);
      this.updateCVSSScore();
    },

    selectUserInteraction(param) {
      this.set('analysisDetails.userInteraction', param.value);
      this.updateCVSSScore();
    },

    selectScope(param) {
      this.set('analysisDetails.scope', param.value);
      this.updateCVSSScore();
    },

    selectConfidentialityImpact(param) {
      this.set('analysisDetails.confidentialityImpact', param.value);
      this.updateCVSSScore();
    },

    selectIntegrityImpact(param) {
      this.set('analysisDetails.integrityImpact', param.value);
      this.updateCVSSScore();
    },

    selectAvailabilityImpact(param) {
      this.set('analysisDetails.availabilityImpact', param.value);
      this.updateCVSSScore();
    },

    selectOwaspCategory(param) {
      this.set('analysisDetails.owasp', param);
    },

    selectPcidssCategory(param) {
      const pcidssIDs = [];
      this.set('analysisDetails.pcidss', param);
      param.forEach((item) => {
        let id = item.split(" - ")[1];
        pcidssIDs.push(id);
        this.set("pcidssIDs", pcidssIDs);
      });
    },

    selectOverriddenRisk(param) {
      this.set('analysisDetails.overriddenRisk', param.value);
    },

    addFinding() {
      const findingTitle = this.get("findingTitle");
      const findingDescription = this.get("findingDescription");
      for (let inputValue of [findingTitle, findingDescription ]) {
        if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
      }
      let findingId = this.get("findingId");
      findingId = findingId + 1;
      const findings = this.get("analysisDetails.findings");
      const newFinding = {
        id: findingId,
        title: findingTitle,
        description: findingDescription
      };
      findings.addObject(newFinding);
      this.set("findingId", findingId);
      this.set("analysisDetails.findings", findings);
      this.get("notify").success("Finding Added");
      this.setProperties({
        findingTitle: "",
        findingDescription: ""
      });
    },

    openRemoveFindingConfirmBox(param) {
      this.set("deletedFinding", param);
      this.set("showRemoveFindingConfirmBox", true);
    },

    openRemoveFileConfirmBox(param) {
      this.set("deletedFile", param);
      this.set("showRemoveFileConfirmBox", true);
    },

    downloadAttachment(id) {
      const url = [ENV.endpoints.downloadAttachment, id].join('/');
      return this.get("ajax").post(url, {namespace: 'hudson-api'})
      .then((data) => {
        window.location = data.url;
      }, (error) => {
        for (error of error.errors) {
          this.get("notify").error(error.detail.error);
        }
      })
    },

    saveAnalysis() {
      const risk = this.get("analysisDetails.risk");
      const owasp = this.get("analysisDetails.owasp");
      const scope = this.get("analysisDetails.scope");
      const pcidss = this.get("pcidssIDs");
      const cvssBase = this.get("analysisDetails.cvssBase");
      const cvssVector = this.get("analysisDetails.cvssVector");
      const cvssVersion = this.get("analysisDetails.cvssVersion");
      const status = this.get("analysisDetails.status");
      const analysisId= this.get("analysis.analysisId");
      const findings = this.get("analysisDetails.findings");
      if (findings) {
        findings.forEach(finding => delete finding.id);
      }
      const attackVector = this.get("analysisDetails.attackVector");
      const overriddenRisk = this.get("analysisDetails.overriddenRisk");
      const integrityImpact = this.get("analysisDetails.integrityImpact");
      const userInteraction = this.get("analysisDetails.userInteraction");
      const attackComplexity = this.get("analysisDetails.attackComplexity");
      const privilegesRequired = this.get("analysisDetails.privilegesRequired");
      const availabilityImpact = this.get("analysisDetails.availabilityImpact");
      const confidentialityImpact = this.get("analysisDetails.confidentialityImpact");
      const overriddenRiskToProfile = this.get("analysisDetails.overriddenRiskToProfile");
      const data = {
        risk,
        status,
        owasp,
        pcidss,
        findings,
        scope,
        attack_vector: attackVector,
        attack_complexity: attackComplexity,
        privileges_required: privilegesRequired,
        user_interaction: userInteraction,
        confidentiality_impact: confidentialityImpact,
        integrity_impact: integrityImpact,
        overridden_risk: overriddenRisk,
        overridden_risk_to_profile: overriddenRiskToProfile,
        cvss_base: cvssBase,
        cvss_vector: cvssVector,
        cvss_version: cvssVersion
      };
      const url = [ENV.endpoints.analyses, analysisId].join('/');
      this.get("ajax").put(url,{ namespace: '/hudson-api', data: JSON.stringify(data), contentType: 'application/json' })
      .then(() => {
        this.get("notify").success("Analyses Updated");
      }, () => {
        this.get("notify").error("Sorry something went wrong, please try again");
      })
    }

  }
});


export default AnalysisDetailsComponent;
