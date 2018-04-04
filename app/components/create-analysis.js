/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import ENV from 'hudson/config/environment';

const isEmpty = inputValue=> Ember.isEmpty(inputValue);

const CreateAnalysisComponent = Ember.Component.extend({

  actions: {

    addAnalysis() {},

    openAnalysisModal() {
        return this.set("showAnalysisModal", true);
      }
  }
});

export default CreateAnalysisComponent;
