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
    [Location.create({ value: 0, row: 0, col: 0 }), Location.create({ value: 0, row: 0, col: 1 }), Location.create({ value: 0, row: 0, col: 2 }), Location.create({ value: 0, row: 0, col: 3 }), Location.create({ value: 0, row: 0, col: 4 })],
    [Location.create({ value: 0, row: 1, col: 0 }), Location.create({ value: 0, row: 1, col: 1 }), Location.create({ value: 0, row: 1, col: 2 }), Location.create({ value: 0, row: 1, col: 3 }), Location.create({ value: 0, row: 1, col: 4 })],
    [Location.create({ value: 0, row: 2, col: 0 }), Location.create({ value: 0, row: 2, col: 1 }), Location.create({ value: 0, row: 2, col: 2 }), Location.create({ value: 0, row: 2, col: 3 }), Location.create({ value: 0, row: 2, col: 4 })],
    [Location.create({ value: 0, row: 3, col: 0 }), Location.create({ value: 0, row: 3, col: 1 }), Location.create({ value: 0, row: 3, col: 2 }), Location.create({ value: 0, row: 3, col: 3 }), Location.create({ value: 0, row: 3, col: 4 })],
    [Location.create({ value: 0, row: 4, col: 0 }), Location.create({ value: 0, row: 4, col: 1 }), Location.create({ value: 0, row: 4, col: 2 }), Location.create({ value: 0, row: 4, col: 3 }), Location.create({ value: 0, row: 4, col: 4 })]
  ],

  init() {
    this.restart();
    this._super(...arguments);
  },

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

    let north = this.northNeighbor(row, col, elements);
    let south = this.southNeighbor(row, col, elements);
    let east = this.eastNeighbor(row, col, elements);
    let west = this.westNeighbor(row, col, elements);

    if ( this.neighborMatches(north, value) ) {
      set(north, 'isSelected', true);
    }
    if ( this.neighborMatches(south, value) ) {
      set(south, 'isSelected', true);
    }
    if ( this.neighborMatches(east, value) ) {
      set(east, 'isSelected', true);
    }
    if ( this.neighborMatches(west, value) ) {
      set(west, 'isSelected', true);
    }
  },

  neighborMatches(neighbor, value) {
    let isMatch = false;
    if ( neighbor ) {
      let neighborValue = get(neighbor, 'value');
      isMatch = neighbor && isEqual(neighborValue, value);
    }
    return isMatch;
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

  eastNeighbor(row, col, elements) {
    if ( isEqual(col, MAX_COL_INDEX) ) {
      return null
    } else {
      return elements[row][col + 1];
    }
  },

  westNeighbor(row, col, elements) {
    if ( isEqual(col, 0) ) {
      return null
    } else {
      return elements[row][col - 1];
    }
  },

  restart() {
    let elements = get(this, 'elements');

    elements.forEach((row) => {
      row.forEach((element) => {
        set(element, 'value', this.randomInclusive(1, 3));
        set(element, 'isSelected', false);
      });
    });
  },

  randomInclusive(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

});
