import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import Location from '../models/location';
import Grid from '../models/grid';

const { Component, get, set, computed, isEqual } = Ember

export default Component.extend(KeyboardShortcuts, {
  init() {
    this._super(...arguments);

    set(this, 'grid', Grid.create());
    // let game = Game.create();
    // set(this, 'game', game);
  },

  // restart() {
  //   this.get('game').restart();
  //   this.get('level').restart();
  // },

  restart() {
    let elements = get(this, 'grid.elements');

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
        get(this, "grid").selectMatchingNeighbors(location);
      }
    }
  }
});
