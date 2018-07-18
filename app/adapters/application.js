import DS from 'ember-data';
import ENV from 'hudson/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const ApplicationAdapter = DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:hudson',
  host: ENV.host,
  namespace: ENV.namespace
});

export default ApplicationAdapter;
