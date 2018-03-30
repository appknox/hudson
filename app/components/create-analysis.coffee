`import Ember from 'ember'`
`import ENV from 'hudson/config/environment'`

isEmpty = (inputValue)->
  return Ember.isEmpty inputValue

CreateAnalysisComponent = Ember.Component.extend

  actions:

    addAnalysis: ->

    openAnalysisModal: ->
        @set "showAnalysisModal", true

`export default CreateAnalysisComponent`
