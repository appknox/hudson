import DS from 'ember-data';
import ENV from 'hudson/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const FileAdapter = DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:hudson',
  host: ENV.host,
  namespace: "hudson-api",
  headers: {
    'Accept': 'application/json'
  },
  query: function query(store, type, q) {
    let url = `${this.get('host')}/${this.get('namespace')}/projects/${q.projectId}/files`;
    return this.ajax(url, 'GET');
  },
  findRecord: function findRecord(store, type, q) {
    let url = `${this.get('host')}/${this.get('namespace')}/projects/5/files/${q}`;
    return this.ajax(url, 'GET');
  }
});

export default FileAdapter;
