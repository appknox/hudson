import Ember from 'ember';
import ENUMS from 'hudson/enums';
import { task } from 'ember-concurrency';
import ENV from 'hudson/config/environment';

const { get, set } = Ember;

const isEmpty = inputValue=> Ember.isEmpty(inputValue);

const AnalysisDetailsComponent = Ember.Component.extend({

  findingId: 0,
  findings: [],
  findingTitle: "",
  findingDescription: "",

  risks: ENUMS.RISK.CHOICES,
  scopes: ENUMS.SCOPE.CHOICES.slice(0, 2),
  statuses: ENUMS.ANALYSIS_STATUS.CHOICES.slice(0),
  attackVectors: ENUMS.ATTACK_VECTOR.CHOICES.slice(0, 4),
  integrityImpacts: ENUMS.INTEGRITY_IMPACT.CHOICES.slice(0, 3),
  userInteractions: ENUMS.USER_INTERACTION.CHOICES.slice(0, 2),
  attackComplexities: ENUMS.ATTACK_COMPLEXITY.CHOICES.slice(0, 4),
  requiredPrevileges: ENUMS.PRIVILEGES_REQUIRED.CHOICES.slice(0, 4),
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

  uploadPhoto: task(function * (file) {
    let product = this.modelFor('product');
    let photo = this.store.createRecord('photo', {
      product,
      filename: get(file, 'name'),
      filesize: get(file, 'size')
    });

    try {
      file.readAsDataURL().then(function (url) {
        if (get(photo, 'url') == null) {
          set(photo, 'url', url);
        }
      });

      let response = yield file.upload('/api/images/upload');
      set(photo, 'url', response.headers.Location);
      yield photo.save();
    } catch (e) {
      photo.rollback();
    }
  }).maxConcurrency(3).enqueue(),

  actions: {

    uploadImage(file) {
      get(this, 'uploadPhoto').perform(file);
    },

    selectStatus(param) {
      this.set('analysisDetails.status', param);
    },

    selectAttackVector(param) {
      this.set('analysisDetails.attackVector', param);
    },

    selectAttackComplexity(param) {
      this.set('analysisDetails.attackComplexity', param);
    },

    selectRequiredPrevilege(param) {
      this.set('analysisDetails.privilegesRequired', param);
    },

    selectUserInteraction(param) {
      this.set('analysisDetails.userInteraction', param);
    },

    selectScope(param) {
      this.set('analysisDetails.scope', param);
    },

    selectConfidentialityImpact(param) {
      this.set('analysisDetails.confidentialityImpact', param);
    },

    selectIntegrityImpact(param) {
      this.set('analysisDetails.integrityImpact', param);
    },

    selectAvailabilityImpact(param) {
      this.set('analysisDetails.availabilityImpact', param);
    },

    selectOwaspCategory(param) {
      this.set('analysisDetails.owasp', param);
    },

    selectPcidssCategory(param) {
      this.set('analysisDetails.pcidss', param);
    },

    selectOverriddenRisk(param) {
      this.set('analysisDetails.overriddenRisk', param);
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

    saveAnalysis() {
      const owasp = this.get("analysisDetails.owasp");
      const scope = this.get("analysisDetails.scope");
      const pcidss = this.get("analysisDetails.pcidss");
      const status = this.get("analysisDetails.status");
      const analysisId= this.get("analysis.analysisId");
      const findings = this.get("analysisDetails.findings");
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
        status,
        attackVector,
        attackComplexity,
        privilegesRequired,
        userInteraction,
        scope,
        owasp,
        pcidss,
        overriddenRisk,
        overriddenRiskToProfile,
        confidentialityImpact,
        integrityImpact,
        findings
      };
      const url = [ENV.endpoints.analyses, analysisId].join('/');
      this.get("ajax").put(url, data)
      .then(() => {
        this.get("notify").success("Analyses Updated");
      }, () => {
        this.get("notify").error("Sorry something went wrong, please try again");
      })
    }

  }
});


export default AnalysisDetailsComponent;
