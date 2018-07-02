import DRFSerializer from './drf';

export default DRFSerializer.extend({
  normalizeResponse: function (store, primaryModelClass, payload) {
    if(payload.id) {
      return {
        data: {
          id: payload.id,
          type: 'file',
          attributes: {
            name: payload.name,
            analyses: payload.analyses
          }
        }
      };
    }
    else {
      return {
        data: payload.results.map((item)=> {
          return {
            id: item.id,
            type: 'file',
            attributes: {
              name: item.name
            }
          };
        })
      };
    }
  }
});
