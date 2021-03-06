import Ember from 'ember';
import Location from './location';

const { get, computed, isEqual, isPresent, observer, set } = Ember;
const MAX_ROW_INDEX = 4;
const MAX_COL_INDEX = 4;

export default Ember.Object.extend({
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

  flattenedElements: computed('elements', function() {
    let elements = get(this, "elements");

    let flattenedElements = [];
    elements.forEach((row) => {
      flattenedElements.pushObjects(row);
    });
    return flattenedElements;
  }),

  allValues: computed.mapBy('flattenedElements', 'value'),

  currentMax: computed.max('allValues'),

  gameOver: observer('currentMax', function() {
    let currentMax = get(this, "currentMax");
    if ( isEqual(currentMax, 10) ) {
      alert("You did it! You got 10!");
      this.restart();
    }
  }),

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

    if ( isPresent(north) ) {
      this.checkNorth(north, value);
    }

    if ( isPresent(east) ) {
      this.checkEast(east, value);
    }

    if ( isPresent(west) ) {
      this.checkWest(west, value);
    }

    if ( isPresent(south) ) {
      this.checkSouth(south, value);
    }
  },

  checkNorth(location, value) {
    let row = get(location, 'row');
    let col = get(location, 'col');
    let elements = get(this, 'elements');

    if ( this.neighborMatches(location, value) ) {
      set(location, 'isSelected', true);

      let west = this.westNeighbor(row, col, elements);
      if ( isPresent(west) && isEqual(get(west, 'isSelected'), false) ) {
        this.checkWest(west, value);
      }

      let north = this.northNeighbor(row, col, elements);
      if ( isPresent(north) && isEqual(get(north, 'isSelected'), false) ) {
        this.checkNorth(north, value);
      }

      let east = this.eastNeighbor(row, col, elements);
      if ( isPresent(east) && isEqual(get(east, 'isSelected'), false) ) {
        this.checkEast(east, value);
      }
    }
  },

  checkSouth(location, value) {
    let row = get(location, 'row');
    let col = get(location, 'col');
    let elements = get(this, 'elements');

    if ( this.neighborMatches(location, value) ) {
      set(location, 'isSelected', true);

      let east = this.eastNeighbor(row, col, elements);
      if ( isPresent(east) && isEqual(get(east, 'isSelected'), false)) {
        this.checkEast(east, value);
      }

      let south = this.southNeighbor(row, col, elements);
      if ( isPresent(south) && isEqual(get(south, 'isSelected'), false) ) {
        this.checkSouth(south, value);
      }

      let west = this.westNeighbor(row, col, elements);
      if ( isPresent(west) && isEqual(get(west, 'isSelected'), false)) {
        this.checkWest(west, value);
      }
    }
  },

  checkEast(location, value) {
    let row = get(location, 'row');
    let col = get(location, 'col');
    let elements = get(this, 'elements');

    if ( this.neighborMatches(location, value) ) {
      set(location, 'isSelected', true);

      let north = this.northNeighbor(row, col, elements);
      if ( isPresent(north) && isEqual(get(north, 'isSelected'), false) ) {
        this.checkNorth(north, value);
      }

      let east = this.eastNeighbor(row, col, elements);
      if ( isPresent(east) && isEqual(get(east, 'isSelected'), false) ) {
        this.checkEast(east, value);
      }

      let south = this.southNeighbor(row, col, elements);
      if ( isPresent(south) && isEqual(get(south, 'isSelected'), false) ) {
        this.checkSouth(south, value);
      }
    }
  },

  checkWest(location, value) {
    let row = get(location, 'row');
    let col = get(location, 'col');
    let elements = get(this, 'elements');

    if ( this.neighborMatches(location, value) ) {
      set(location, 'isSelected', true);

      let south = this.southNeighbor(row, col, elements);
      if ( isPresent(south) && isEqual(get(south, 'isSelected'), false) ) {
        this.checkSouth(south, value);
      }

      let west = this.westNeighbor(row, col, elements);
      if ( isPresent(west) && isEqual(get(west, 'isSelected'), false) ) {
        this.checkWest(west, value);
      }

      let north = this.northNeighbor(row, col, elements);
      if ( isPresent(north) && isEqual(get(north, 'isSelected'), false) ) {
        this.checkNorth(north, value);
      }
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
      return null;
    } else {
      return elements[row - 1][col];
    }
  },

  southNeighbor(row, col, elements) {
    if ( isEqual(row, MAX_ROW_INDEX) ) {
      return null;
    } else {
      return elements[row + 1][col];
    }
  },

  eastNeighbor(row, col, elements) {
    if ( isEqual(col, MAX_COL_INDEX) ) {
      return null;
    } else {
      return elements[row][col + 1];
    }
  },

  westNeighbor(row, col, elements) {
    if ( isEqual(col, 0) ) {
      return null;
    } else {
      return elements[row][col - 1];
    }
  },

  settle() {
    let columnNumbers = [...Array(MAX_COL_INDEX + 1).keys()];

    columnNumbers.forEach((columnNumber) => {
      this.settleColumn(columnNumber);
    });
  },

  settleColumn(columnNumber) {
    let elements = get(this, "elements");

    // should probably extract this to an elements method
    let column = [...Array(MAX_COL_INDEX + 1).keys()].map((rowNumber) => {
      return elements[rowNumber][columnNumber];
    });

    let values = column.mapBy("value").filter((value) => {
      return value !== 0
    });

    let numberOfBlankSpaces = MAX_COL_INDEX + 1 - values.length;
    let blankSpaces = [...Array(numberOfBlankSpaces).keys()].map(() => { return 0 });

    // have zero leading array of the values, e.g. [0, 0, 1, 1, 2]
    blankSpaces.pushObjects(values);

    // shift all location values down and zero fill values above
    blankSpaces.forEach((boo, rowNumber) => {
      set(elements[rowNumber][columnNumber], "value", boo);
    });
  },

  randomFillEmptySpaces() {
    let elements = get(this, "elements");
    let currentMax = get(this, "currentMax");

    elements.forEach((row) => {
      row.forEach((element) =>{
        let value = get(element, "value");
        if ( value === 0 ) {
          let fillerNumber = this.randomInclusive(1, currentMax);

          set(element, "value", fillerNumber);
        }
      });
    });
  },

  combineMatchingNeighbors(matchingNeighbors) {
    if ( isEqual(matchingNeighbors.length, 0) ) {
      return; // don't combine if it's a single element
    }

    matchingNeighbors.forEach((element) => {
      set(element, "value", 0);
    });
  },

  matchingNeighbors(location) {
    let elements = get(this, "elements");
    let value = get(location, "value");
    let selected = [];

    elements.forEach((row) => {
      row.forEach((element) => {
        let isSelected = get(element, 'isSelected');
        if ( isEqual(location, element) ) {
          // don't select the clicked on element
        } else if ( isEqual(value, get(element, "value")) && isSelected) {
          selected.pushObject(element);
        }
      });
    });
    return selected;
  },

  restart() {
    let elements = get(this, 'elements');

    elements.forEach((row) => {
      row.forEach((element) => {
        set(element, 'value', this.randomInclusive(1, 2));
        set(element, 'isSelected', false);
      });
    });
  },

  randomInclusive(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

});
