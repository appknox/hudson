/* jshint node: true */

var url = require('url');

module.exports = function(environment) {
  var devicefarmEnv = process.env.HUDSON_DEVICEFARM_URL || "wss://devicefarm.appknox.com";
  var deviceFarmWebsockifyHost = url.parse(devicefarmEnv);
  var deviceFarmSsl = deviceFarmWebsockifyHost.protocol == "wss:";
  var deviceFarmPort = deviceFarmWebsockifyHost.port || (deviceFarmSsl ? 443:80);
  var deviceFarmHost = deviceFarmWebsockifyHost.hostname;
  var host = process.env.HUDSON_API_HOST || 'https://api.appknox.com';
  var socketPath = process.env.HUDSON_API_SOCKET_PATH || 'https://socket.appknox.com';
  var ireneHost = process.env.HUDSON_IRENE_HOST || 'https://secure.appknox.com';

  var ENV = {
    rootURL: '/',
    locationType: 'auto',
    modulePrefix: 'hudson',
    environment: environment,
    notifications: {
      autoClear: true,
      duration: 4000 // Milliseconds
    },
    paginate: {
      perPageLimit: 10,
      pagePadding: 5
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    namespace: "hudson",
    host: host,
    ireneHost,
    'ember-cli-mirage': {
      enabled: false
    },
    emblemOptions: {
      blueprints: false
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth': {
      loginEndPoint: '/login',
      checkEndPoint: '/check',
      logoutEndPoint: '/logout',
      routeAfterAuthentication: 'authenticated.index',
      routeIfAlreadyAuthenticated: 'authenticated.index'
    },
    endpoints: {
      changePassword: 'change_password',
      subscription: 'subscriptions',
      namespace: 'namespace',
      recover: 'recover',
      reset: 'reset',
      apps: 'apps',
      reports: 'reports',
      downloadReport: 'download_report',
      downloadApp: 'download_app',
      uploadedFile: 'uploaded_file',
      signedUrl: 'signed_url',
      purgeAPIAnalyses: 'purge_api_analyses',
      dynamicScan: 'dynamic_scan',
      apiScan: 'api_scan',
      startApiScan: 'start_api_scan',
      generateReport: 'generate_report',
      downloadAttachment: 'download_attachment',
      owasps: 'owasps',
      analyses: 'analyses',
      uploadFile: 'signed_attachment_upload_url',
      uploadedAttachment: 'uploaded_attachment',
      deleteAttachment: 'delete_attachment',
    }
  };

  if (environment === 'mirage') {
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV['host'] = "http://0.0.0.0:8000";
  }

  if (environment === 'testing') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    ENV['host'] = "http://localhost:8000";
  }

  if (environment === 'development') {

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
