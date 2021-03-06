import Ember from 'ember';
import ENV from 'hudson/config/environment';

const Router = Ember.Router.extend({
  location: ENV.locationType,
  rootURL: ENV.rootURL
});


Router.map(function() {

  this.route('login');
  this.route('recover');
  this.route('authenticated', {path: '/'}, function() {
    this.route('index', {path: '/'});
    this.route('users', {path: '/users'});
    this.route('user', {path: '/user/:userId'});
    this.route('pricings', {path: '/pricings'});
    this.route('pricing', {path: '/pricing/:pricingId'});
    this.route('coupons', {path: '/coupons'});
    this.route('coupon', {path: '/coupon/:couponId'});
    this.route('files', {path: '/files'});
    this.route('invoices', {path: '/invoices'});
    this.route('invoice', {path: '/invoice/:invoiceId'});
    this.route('reports', {path: 'reports'});
    this.route('scans', {path: '/scans'});
    this.route('analyses', {path: '/analyses'});
    this.route('apps', {path: '/apps'});
    this.route('security', {path: '/security'}, function() {
      this.route('users');
      this.route('projects', {path: '/project-list'});
      this.route('files', {path: '/:projectId/files'});
      this.route('file', {path: '/file/:fileId'});
      this.route('downloadreport');
      this.route('purgeanalysis');
      this.route('downloadapp');
      this.route('analysis', {path: '/analysis/:analysisId'});
    });
    this.route('projects', {path: '/projects'});
  });
  this.route('reset');
});

export default Router;
