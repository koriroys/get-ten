import Ember from 'ember';
import Location from '../models/location';
import Grid from '../models/grid';

const { Component, get, set, computed, isEqual, isPresent } = Ember

export default Component.extend({
  lastTapped: null,

  init() {
    this._super(...arguments);

    set(this, 'grid', Grid.create());
  },

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
