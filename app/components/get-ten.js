import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import Location from '../models/location';
import Grid from '../models/grid';

const { Component, get, set, computed, isEqual, isPresent } = Ember

export default Component.extend(KeyboardShortcuts, {
  lastTapped: null,

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



  actions: {
    restart() {
      get(this, 'grid').restart();
    },

    tapped(location) {
      let grid = get(this, "grid");

      let lastTapped = get(this, "lastTapped");

      if ( isPresent(lastTapped) && isEqual(get(location, "isSelected"), true) ) {
        // second tap
        set(this, "lastTapped", null);
        let matchingNeighbors = grid.matchingNeighbors(location);
        if ( matchingNeighbors.length > 0 ) {
          grid.combineMatchingNeighbors(matchingNeighbors);
          location.incrementProperty("value");
          grid.settle();
          grid.randomFillEmptySpaces();
        }
        grid.deselectAll();
      } else {
        // first tap
        grid.deselectAll();
        grid.selectMatchingNeighbors(location);
        let matchingNeighbors = grid.matchingNeighbors(location);
        if ( matchingNeighbors.length > 0 ) {
          grid.selectLocation(location);
        }
        set(this, "lastTapped", location);
      }
    }
  }
});
