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
  query: function query() {
    let url = `${this.get('host')}/${this.get('namespace')}/projects`;
    return this.ajax(url, 'GET');
  }
});

export default ProjectAdapter;
