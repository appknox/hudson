`import DS from 'ember-data'`
`import ENUMS from 'hudson/enums'`

File = DS.Model.extend
  uuid: DS.attr 'string'
  name: DS.attr 'string'
  dynamicStatus: DS.attr 'number'

  statusText: (->
    switch @get "dynamicStatus"
      when ENUMS.DYNAMIC_STATUS.BOOTING then "Booting"
      when ENUMS.DYNAMIC_STATUS.DOWNLOADING then "Downloading"
      when ENUMS.DYNAMIC_STATUS.INSTALLING then "Installing"
      when ENUMS.DYNAMIC_STATUS.LAUNCHING then "Launching"
      when ENUMS.DYNAMIC_STATUS.HOOKING then "Hooking"
      when ENUMS.DYNAMIC_STATUS.SHUTTING_DOWN then "Shutting Down"
      else "Unknown Status"

  ).property "dynamicStatus"

`export default File`