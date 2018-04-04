import DS from 'ember-data';

const Device = DS.Model.extend({
  platform: DS.attr('number'),
  packageName: DS.attr('string'),
  appName: DS.attr('string'),
  platformVersion: DS.attr('string'),
  serialNumber: DS.attr('number'),
  isConnected: DS.attr('boolean'),
  isAvailable: DS.attr('boolean'),
  isTablet: DS.attr('boolean')
});

export default Device;
