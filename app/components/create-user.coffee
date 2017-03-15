`import Ember from 'ember'`
`import ENV from 'hudson/config/environment'`

CreateUserComponent = Ember.Component.extend

  user: (->
    @get('store').createRecord('user')
  ).property()

  actions:

    addUser: ->
      that = @
      user = @get 'user'
      user.save()

    openUserModal: ->
        @set "showUserModal", true

    closeModal: ->
      @set "showUserModal", false

`export default CreateUserComponent`