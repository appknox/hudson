/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Takes two parameters: container and application
const initialize = function(application) {

  // injecting ajax service

  application.inject('route', 'ajax', 'service:ajax');
  application.inject('component', 'ajax', 'service:ajax');

  // injecting notification-messages service

  application.inject('route', 'notify', 'service:notification-messages');
  application.inject('component', 'notify', 'service:notification-messages');
  application.inject('authenticator', 'notify', 'service:notification-messages');

  // Inject realtime
  application.inject('component', 'realtime', 'service:realtime');

  // Inject Store
  return application.inject('component', 'store', 'service:store');
};

const HudsonInitializer = {
  name: 'hudson',
  initialize
};

export {initialize};
export default HudsonInitializer;
