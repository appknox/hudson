`import Ember from 'ember'`
`import PaginateMixin from 'hudson/mixins/paginate'`

FileSearchListComponent = Ember.Component.extend PaginateMixin,

  query: ""
  targetObject: "file"

  sortProperties: ["id"]

  newFileObserver: Ember.observer "realtime.FileCount", ->
    @incrementProperty "version"

  resetOffset: ->
    @set "offset", 0

  offsetResetter: Ember.observer "query", ->
    for property in ["query"]
      propertyOldName = "_#{property}"
      propertyNewValue = @get property
      propertyOldValue = @get propertyOldName
      propertyChanged = propertyOldValue isnt propertyNewValue
      if propertyChanged
        @set propertyOldName, propertyNewValue
        Ember.run.once @, 'resetOffset'

  extraQueryStrings: Ember.computed "query", ->
    query =
      query: @get "query"
    JSON.stringify query, Object.keys(query).sort()

`export default FileSearchListComponent`
