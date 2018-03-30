`import Ember from 'ember'`
`import ENV from 'hudson/config/environment'`

GenerateReportComponent = Ember.Component.extend

  actions:
    generateReport: ->
      fileId = @$('#file-number').val()
      emailIds = @$('#email-ids').val()
      data =
        file_id: fileId
        email_ids: emailIds
      that = @
      @get("ajax").post ENV.endpoints.generateReport, data:data
      .then (data) ->
        that.get("notify").success "Report Generated and sent to the Email ID(s)"
      .catch (error) ->
        for error in error.errors
          that.get("notify").error error.detail?.message

`export default GenerateReportComponent`
