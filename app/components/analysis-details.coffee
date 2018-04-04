`import Ember from 'ember'`
`import ENUMS from 'hudson/enums'`

isEmpty = (inputValue)->
  return Ember.isEmpty inputValue

AnalysisDetailsComponent = Ember.Component.extend

  findingId: 0,
  findings: []
  findingTitle: ""
  findingDescription: ""

  scopes: ENUMS.SCOPE.CHOICES.slice(0, -1)
  statuses: ENUMS.ANALYSIS_STATUS.CHOICES.slice(0)
  owasps: ENUMS.OWASP_CATEGORIES.CHOICES.slice(0, -1)
  attackVectors: ENUMS.ATTACK_VECTOR.CHOICES.slice(0, -1)
  integrityImpacts: ENUMS.INTEGRITY_IMPACT.CHOICES.slice(0, -1)
  userInteractions: ENUMS.USER_INTERACTION.CHOICES.slice(0, -1)
  attackComplexities: ENUMS.ATTACK_COMPLEXITY.CHOICES.slice(0, -1)
  requiredPrevileges: ENUMS.PRIVILEGES_REQUIRED.CHOICES.slice(0, -1)
  availabilityImpacts: ENUMS.AVAILABILITY_IMPACT.CHOICES.slice(0, -1)
  confidentialityImpacts: ENUMS.CONFIDENTIALITY_IMPACT.CHOICES.slice(0, -1)

  allFindings: (->
    findingId = @get "findingId"
    findings = @get "findings"
    that = @
    findings.forEach (finding) ->
      findingId = findingId + 1
      finding.id = findingId
      that.set("findingId", findingId);
    findings
  ).property "findings"

  confirmCallback: ->
    availableFindings = this.get "availableFindings"
    @set "findings", availableFindings
    @set "showRemoveFindingConfirmBox", false

  availableFindings: Ember.computed.filter 'allFindings', (allFinding) ->
    deletedFinding = @get "deletedFinding"
    return allFinding.id != deletedFinding

  actions:
    selectScope: (param) ->
      this.set 'selectedScope', param

    selectStatus: (param) ->
      this.set 'selectedStatus', param

    selectAttackVector: (param) ->
      this.set 'selectedAttackVector', param

    selectOwaspCategory: (param) ->
      this.set 'selectedOwaspCategory', param

    selectIntegrityImpact: (param) ->
      this.set 'selectedIntegrityImpact', param

    selectUserInteraction: (param) ->
      this.set 'selectedUserInteraction', param

    selectAttackComplexity: (param) ->
      this.set 'selectedAttackComplexity', param

    selectRequiredPrevilege: (param) ->
      this.set 'selectedRequiredPrevilege', param
    selectAvailabilityImpact: (param) ->
      this.set 'selectedAvailabilityImpact', param

    selectConfidentialityImpact: (param) ->
      this.set 'selectedConfidentialityImpact', param

    addFinding: ->
      findingTitle = @get "findingTitle"
      findingDescription = @get "findingDescription"
      for inputValue in [findingTitle, findingDescription ]
        return @get("notify").error "Please fill all the details" if isEmpty inputValue
      findingId = @get "findingId"
      findingId = findingId + 1
      findings = @get "findings"
      newFinding = {
        id: findingId
        title: findingTitle
        description: findingDescription
      }
      findings.addObject(newFinding)
      @set "findingId", findingId
      @set "findings", findings
      this.get("notify").success "Finding Added"
      @setProperties
        findingTitle: ""
        findingDescription: ""

    openRemoveFindingConfirmBox: (param) ->
      @set "deletedFinding", param
      @set "showRemoveFindingConfirmBox", true

    openRemoveFileConfirmBox: (param) ->
      @set "deletedFile", param
      @set "showRemoveFileConfirmBox", true


`export default AnalysisDetailsComponent`
