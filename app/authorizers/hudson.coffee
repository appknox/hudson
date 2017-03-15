`import Base from 'ember-simple-auth/authorizers/base'`
`import ENV from 'hudson/config/environment';`


HudsonAuthorizer = Base.extend

  authorize: (data, block)->
    block 'Authorization', "Basic #{data.b64token}"
    block 'X-Product', ENV.product


`export default HudsonAuthorizer`
