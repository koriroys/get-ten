import Ember from 'ember';
const { Object, get, computed } = Ember;

export default Object.extend({
  // 0 is a blank space
  // number is the value at that location


  restart() {
    let grid = get(this, 'grid');

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === 0) {
          grid[rowIndex][columnIndex] = 1;
        }
      });
    });
  },

});
