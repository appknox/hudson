import DS from 'ember-data';
import ENV from 'hudson/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const OwaspAdapter = DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:hudson',
  host: ENV.host,
  namespace: "api",
  findAll: function findAll() {
    let url = `${this.get('host')}/${this.get('namespace')}/owasps`;
    return this.ajax(url, 'GET');
  }
});

export default OwaspAdapter;
