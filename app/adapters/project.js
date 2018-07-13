import DS from 'ember-data';
import ENV from 'hudson/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const ProjectAdapter = DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:hudson',
  host: ENV.host,
  namespace: "hudson-api",
  headers: {
    'Accept': 'application/json'
  },
  query: function query(store, type, query) {
    let url = `${this.get('host')}/${this.get('namespace')}/projects?limit=${query.limit}&offset=${query.offset}&query=${query.query}`;
    if(query.next) {
      url = query.next;
    }
    return this.ajax(url, 'GET');
  }
});

export default ProjectAdapter;
