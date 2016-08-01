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



  actions: {
    restart() {
      get(this, 'grid').restart();
    },

    tapped(location) {
      let grid = get(this, "grid");
      if ( isEqual(get(location, "isSelected"), true) ) {
        grid.combineMatchingNeighbors(location);
        location.incrementProperty("value");
        grid.replaceCombined();


        // increment(location)
        //
      } else {
        grid.deselectAll();
        grid.selectLocation(location);
        grid.selectMatchingNeighbors(location);
      }
    }
  }
});
