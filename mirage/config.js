import config from 'hudson/config/environment';
export default function() {

   this.namespace = config.host + "/" +  config.namespace;

   this.get('users', 'user');
   this.get('users/:id', 'user');
   this.get('/pricings', 'pricing');
   this.get('/pricings/:id', 'pricing');
   this.get('/coupons', 'coupon');
   this.get('/subscriptions', 'subscription');
   this.get('/coupons/:id', 'coupon');
   this.get('/files', 'file');
   this.get('/invoices', 'invoice');
   this.get('/invoices/:id', 'invoice');
   this.get('/devices', 'device');

   this.get('/stats/1', 'invoice');

   this.post('/login', () => {
    return {user_id: '1', token: 'secret'};
   });

   this.post('/check', () => {
    return {user_id: '1', token: 'secret'};
   });

   this.post('/logout', () => {
    return;
   });

   this.post('/users', () => {
    return;
   });

   this.post('/api_scan', () => {
    return;
   });

   this.post('/dynamic_scan', () => {
    return;
   });

   this.post('/start_api_scan', () => {
    return;
   });

   this.post('/generate_report', () => {
    return;
   });

   this.post('/subscriptions', 'subscription');

   this.patch('/user/:id', 'user');
}
