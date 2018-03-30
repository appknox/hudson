`import Ember from 'ember'`
`import ENV from 'hudson/config/environment'`

Router = Ember.Router.extend
  location: ENV.locationType
  rootURL: ENV.rootURL


Router.map ->

  @route 'login'
  @route 'recover'
  @route 'authenticated', path: '/', ->
    @route 'index', path: '/',
    @route 'users', path: '/users',
    @route 'user', path: '/user/:userId',
    @route 'pricings', path: '/pricings',
    @route 'pricing', path: '/pricing/:pricingId',
    @route 'coupons', path: '/coupons',
    @route 'coupon', path: '/coupon/:couponId',
    @route 'files', path: '/files',
    @route 'invoices', path: '/invoices',
    @route 'invoice', path: '/invoice/:invoiceId',
    @route 'reports', path: 'reports'
    @route 'scans', path: '/scans'
    @route 'analyses', path: '/analyses'
    @route 'apps', path: '/apps'
    @route 'security', path: '/security', ->
      @route 'users'
      @route 'projects', path: '/:username/projects'
      @route 'files', path: '/:packageName/files'
      @route 'file', path: '/file/:fileId'
      @route 'analyses', path: '/:fileId/analyses'
      @route 'generatereport'
      @route 'uploadreport'
      @route 'downloadreport'
    @route 'projects', path: '/projects'
  @route 'reset'

`export default Router;`
