import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import Location from '../models/location';

const { Component, get, set, computed, isEqual } = Ember

export default Component.extend(KeyboardShortcuts, {
  init() {
    this._super(...arguments);

    let grid = [
      [Location.create({ value: 1 }), Location.create({ value: 1 }), Location.create({ value: 1 })],
      [Location.create({ value: 1 }), Location.create({ value: 1 }), Location.create({ value: 1 })],
      [Location.create({ value: 2 }), Location.create({ value: 2 }), Location.create({ value: 2 })]
    ];

    set(this, 'grid', grid);
    // let game = Game.create();
    // set(this, 'game', game);
  },

  // restart() {
  //   this.get('game').restart();
  //   this.get('level').restart();
  // },

  restart() {
    let grid = get(this, 'grid');

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === 0) {
          set(grid[rowIndex][columnIndex], 'value', 1);
        }
      });
    });
  },

  actions: {
    tapped(location) {
      if ( isEqual(get(location, "isSelected"), true) ) {
        // combineMatchingNeighbors();
        // increment(location)
        //
      } else {
        console.log("clicked");
        let grid = get(this, "grid");
        get(this, "grid").deselectAll();
        get(this, "grid").selectMatchingNeighbors();
      }
    }
  }
});
