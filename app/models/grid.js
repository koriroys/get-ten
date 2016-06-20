import Ember from 'ember';
import Location from './location';

const { get, set, isEqual, Object, computed } = Ember;
const MAX_ROW_INDEX = 4;
const MAX_COL_INDEX = 4;

export default Object.extend({
  // required properties
  value: null,
  row: null,
  col: null,
  // end required properties

  elements: [
    [Location.create({ value: 1, row: 0, col: 0 }), Location.create({ value: 1, row: 0, col: 1 }), Location.create({ value: 1, row: 0, col: 2 }), Location.create({ value: 1, row: 0, col: 3 }), Location.create({ value: 1, row: 0, col: 4 })],
    [Location.create({ value: 1, row: 1, col: 0 }), Location.create({ value: 1, row: 1, col: 1 }), Location.create({ value: 1, row: 1, col: 2 }), Location.create({ value: 1, row: 1, col: 3 }), Location.create({ value: 1, row: 1, col: 4 })],
    [Location.create({ value: 2, row: 2, col: 0 }), Location.create({ value: 2, row: 2, col: 1 }), Location.create({ value: 2, row: 2, col: 2 }), Location.create({ value: 1, row: 2, col: 3 }), Location.create({ value: 1, row: 2, col: 4 })],
    [Location.create({ value: 1, row: 3, col: 0 }), Location.create({ value: 1, row: 3, col: 1 }), Location.create({ value: 1, row: 3, col: 2 }), Location.create({ value: 1, row: 3, col: 3 }), Location.create({ value: 1, row: 3, col: 4 })],
    [Location.create({ value: 1, row: 4, col: 0 }), Location.create({ value: 1, row: 4, col: 1 }), Location.create({ value: 1, row: 4, col: 2 }), Location.create({ value: 1, row: 4, col: 3 }), Location.create({ value: 1, row: 4, col: 4 })]
  ],

  // utilities functions
  deselectAll() {
    let elements = get(this, 'elements');

    elements.forEach((row) => {
      row.forEach((element) => {
        set(element, 'isSelected', false);
      });
    });
  },

  selectLocation(location) {
    set(location, 'isSelected', true);
  },

  selectMatchingNeighbors(location) {
    let row = get(location, 'row');
    let col = get(location, 'col');
    let value = get(location, 'value');
    let elements = get(this, 'elements');

    // if ( isEqual(row, 0) {
    //   // don't check north
    // } else {
    //   set(elements[row - 1][col], 'isSelected', true);
    // }
    let north = this.northNeighbor(row, col, elements);
    let south = this.southNeighbor(row, col, elements);

    if ( north && get(north, 'value') == value ) {
      set(north, 'isSelected', true);
    }
    if ( south && get(south, 'value') == value ) {
      set(south, 'isSelected', true);
    }

    // if ( isEqual(row, MAX_ROW_INDEX) ) {
    //   // don't check south
    // } else {
    //   set(elements[row + 1][col], 'isSelected', true);
    // }

  },

  northNeighbor(row, col, elements) {
    if ( isEqual(row, 0) ) {
      return null
    } else {
      return elements[row - 1][col];
    }
  },

  southNeighbor(row, col, elements) {
    if ( isEqual(row, MAX_ROW_INDEX) ) {
      return null
    } else {
      return elements[row + 1][col];
    }
  },

  restart() {
    let elements = get(this, 'elements');

    elements.forEach((row) => {
      row.forEach((element) => {
        set(element, 'value', 1);
      });
    });
  }

});
