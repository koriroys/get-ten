import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import Game from '../models/game';
import Grid from '../models/game';
import Level from '../models/level';

const { Component, get, set, computed } = Ember

export default Component.extend(KeyboardShortcuts, {
  init() {
    this._super(...arguments);

    let grid = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ];

    set(this, 'grid', grid);
    // let game = Game.create();
    // set(this, 'game', game);
  },

  // restart() {
  //   this.get('game').restart();
  //   this.get('level').restart();
  // },

  actions: {
    tapped(location) {
      if ( get(location, "isSelected", true) ) {

      } else {
        let grid = get(this, "grid");
        get(this, "grid").deselectAll();
        get(this, "grid").selectMatchingNeighbors();
      }
    }
  }
});
