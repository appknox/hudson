import DRFAdapter from './drf';
import ENV from 'hudson/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const AttachmentAdapter = DRFAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:hudson',
  host: ENV.host,
  namespace: "hudson-api"
});

export default AttachmentAdapter;
