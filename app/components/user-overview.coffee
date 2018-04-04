`import Ember from 'ember'`
`import ENV from 'hudson/config/environment'`

UserOverviewComponent = Ember.Component.extend

  tagName: ['tr']
  classNames: ['table-content']

  actions:
    deleteUser: ->
      user = @get 'user'
      userName = @get "user.username"
      deletedUser = prompt "Enter the username which you want to delete ", ""
      if deletedUser is null
        return
      else if deletedUser isnt userName
        return @get("notify").error "Enter the right username to delete it"
      that = @
      user.destroyRecord()
      .then (data) ->
        that.get("notify").success "User " + userName + " has been deleted"
      .catch (error) ->
        for error in error.errors
          that.get("notify").error error.detail?.message

`export default UserOverviewComponent`
