import DS from 'ember-data';
import ENV from 'hudson/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const AnalysisAdapter = DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:hudson',
  host: ENV.host,
  namespace: "hudson-api",
  headers: {
    'Accept': 'application/json'
  },
});

export default AnalysisAdapter;
