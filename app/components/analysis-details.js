import Ember from 'ember';
import ENUMS from 'hudson/enums';
import { task } from 'ember-concurrency';

const { get, set } = Ember;

const isEmpty = inputValue=> Ember.isEmpty(inputValue);

const AnalysisDetailsComponent = Ember.Component.extend({

  findingId: 0,
  findings: [],
  findingTitle: "",
  findingDescription: "",

  pcis: [],
  risks: ENUMS.RISK.CHOICES.slice(0, -1),
  scopes: ENUMS.SCOPE.CHOICES.slice(0, -1),
  statuses: ENUMS.ANALYSIS_STATUS.CHOICES.slice(0),
  owasps: ENUMS.OWASP_CATEGORIES.CHOICES.slice(0, -1),
  attackVectors: ENUMS.ATTACK_VECTOR.CHOICES.slice(0, -1),
  integrityImpacts: ENUMS.INTEGRITY_IMPACT.CHOICES.slice(0, -1),
  userInteractions: ENUMS.USER_INTERACTION.CHOICES.slice(0, -1),
  attackComplexities: ENUMS.ATTACK_COMPLEXITY.CHOICES.slice(0, -1),
  requiredPrevileges: ENUMS.PRIVILEGES_REQUIRED.CHOICES.slice(0, -1),
  availabilityImpacts: ENUMS.AVAILABILITY_IMPACT.CHOICES.slice(0, -1),
  confidentialityImpacts: ENUMS.CONFIDENTIALITY_IMPACT.CHOICES.slice(0, -1),

  allFindings: (function() {
    let findingId = this.get("findingId");
    const findings = this.get("findings");
    const that = this;
    findings.forEach(function(finding) {
      findingId = findingId + 1;
      finding.id = findingId;
      that.set("findingId", findingId);
    });
    return findings;
  }).property("findings"),

  confirmCallback() {
    const availableFindings = this.get("availableFindings");
    this.set("findings", availableFindings);
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

    selectScope(param) {
      this.set('selectedScope', param);
    },

    selectStatus(param) {
      this.set('selectedStatus', param);
    },

    selectAttackVector(param) {
      this.set('selectedAttackVector', param);
    },

    selectOwaspCategory(param) {
      this.set('selectedOwaspCategory', param);
    },

    selectIntegrityImpact(param) {
      this.set('selectedIntegrityImpact', param);
    },

    selectUserInteraction(param) {
      this.set('selectedUserInteraction', param);
    },

    selectAttackComplexity(param) {
      this.set('selectedAttackComplexity', param);
    },

    selectRequiredPrevilege(param) {
      this.set('selectedRequiredPrevilege', param);
    },

    selectAvailabilityImpact(param) {
      this.set('selectedAvailabilityImpact', param);
    },

    selectConfidentialityImpact(param) {
      this.set('selectedConfidentialityImpact', param);
    },

    addFinding() {
      const findingTitle = this.get("findingTitle");
      const findingDescription = this.get("findingDescription");
      for (let inputValue of [findingTitle, findingDescription ]) {
        if (isEmpty(inputValue)) { return this.get("notify").error("Please fill all the details"); }
      }
      let findingId = this.get("findingId");
      findingId = findingId + 1;
      const findings = this.get("findings");
      const newFinding = {
        id: findingId,
        title: findingTitle,
        description: findingDescription
      };
      findings.addObject(newFinding);
      this.set("findingId", findingId);
      this.set("findings", findings);
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
    }
  }
});


export default AnalysisDetailsComponent;
