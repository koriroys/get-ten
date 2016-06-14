import Ember from 'ember';
import Location from './location';

const { get, isEqual, Object } = Ember;

export default Object.extend({
  // required properties
  value: null,
  row: null,
  col: null,
  // end required properties

  elements: [
    [Location.create({ value: 1, row: 0, col: 0 }), Location.create({ value: 1, row: 0, col: 1 }), Location.create({ value: 1, row: 0, col: 2 })],
    [Location.create({ value: 1, row: 1, col: 0 }), Location.create({ value: 1, row: 1, col: 1 }), Location.create({ value: 1, row: 1, col: 2 })],
    [Location.create({ value: 2, row: 2, col: 0 }), Location.create({ value: 2, row: 2, col: 1 }), Location.create({ value: 2, row: 2, col: 2 })]
  ],

  // utilities functions
  deselectAll() {

  },

  selectMatchingNeighbors(location) {

  }
});

