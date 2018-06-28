import DRFSerializer from './drf';

export default DRFSerializer.extend({
  normalizeResponse: function (store, primaryModelClass, payload) {
    return {
      data: {
        id: payload.id,
        type: 'user',
        attributes: {
          username: payload.username,
          email: payload.email
        }
      }
    };
  }
});
