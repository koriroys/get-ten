import Ember from 'ember';

const { get, isEqual } = Ember;

export default Ember.Object.extend({
  // required properties
  value: null,
  row: null,
  col: null,
  isSelected: false
});
