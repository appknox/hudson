import DRFSerializer from './drf';

export default DRFSerializer.extend({
  normalizeResponse: function (store, primaryModelClass, payload) {
    return {
      data: payload.data.map((item)=> {
        return {
          id: item.id,
          type: 'owasp',
          attributes: {
            code: item.attributes.code,
            title: item.attributes.title,
            description: item.attributes.description,
            year: item.attributes.year
          }
        };
      })
    };
  }
});
