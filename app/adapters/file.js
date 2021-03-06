import DRFAdapter from './drf';
import ENV from 'hudson/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const FileAdapter = DRFAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:hudson',
  host: ENV.host,
  namespace: "hudson-api",
  headers: {
    'Accept': 'application/json'
  },
  query: function query(store, type, q) {
    let url = `${this.get('host')}/${this.get('namespace')}/projects/${q.projectId}/files`;
    return this.ajax(url, 'GET');
  }
});

export default FileAdapter;
