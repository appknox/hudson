`import Ember from 'ember'`

SecuritySplitComponent = Ember.Component.extend

  isGenerateReportClass: true
  isUploadReportClass: false
  isDowloadReportClass: false
  isSearchClass: false
  isPurgeAnalysisClass: false

  generateReportClass: Ember.computed "isGenerateReportClass", ->
    if this.get 'isGenerateReportClass'
      return 'is-active'

  uploadReportClass: Ember.computed "isUploadReportClass", ->
    if this.get 'isUploadReportClass'
      return 'is-active'

  downloadReportClass: Ember.computed "isDowloadReportClass", ->
    if this.get 'isDowloadReportClass'
      return 'is-active'

  searchClass: Ember.computed "isSearchClass", ->
    if this.get 'isSearchClass'
      return 'is-active'

  purgeAnalysisClass: Ember.computed "isPurgeAnalysisClass", ->
    if this.get 'isPurgeAnalysisClass'
      return 'is-active'

  actions:
    displayGenerateReport: ->
      @set "isGenerateReportClass", true
      @set "isUploadReportClass", false
      @set "isDowloadReportClass", false
      @set "isSearchClass", false
      @set "isPurgeAnalysisClass", false

    displayUploadReport: ->
      @set "isGenerateReportClass", false
      @set "isUploadReportClass", true
      @set "isDowloadReportClass", false
      @set "isSearchClass", false
      @set "isPurgeAnalysisClass", false

    displayDownloadReport: ->
      @set "isGenerateReportClass", false
      @set "isUploadReportClass", false
      @set "isDowloadReportClass", true
      @set "isSearchClass", false
      @set "isPurgeAnalysisClass", false

    displaySearch: ->
      @set "isGenerateReportClass", false
      @set "isUploadReportClass", false
      @set "isDowloadReportClass", false
      @set "isSearchClass", true
      @set "isPurgeAnalysisClass", true

    displayPurgeAnalysis: ->
      @set "isGenerateReportClass", false
      @set "isUploadReportClass", false
      @set "isDowloadReportClass", false
      @set "isSearchClass", false
      @set "isPurgeAnalysisClass", true




`export default SecuritySplitComponent`
