import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(KeyboardShortcuts, {
  x: 1,
  y: 2,
  squareSize: 40,
  screenWidth: Ember.computed(function() {
    return this.get('grid.firstObject.length');
  }),
  screenHeight: Ember.computed(function() {
    return this.get('grid.length');
  }),

  grid:
  [
    [2, 2, 2, 2, 2, 2, 2, 1],
    [2, 1, 2, 1, 2, 2, 2, 1],
    [2, 2, 1, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
  ],

  ctx: Ember.computed(function() {
    let canvas = document.getElementById("myCanvas");
    return canvas.getContext("2d");
  }),

  screenPixelWidth: Ember.computed(function() {
    return this.get('screenWidth') * this.get('squareSize');
  }),

  screenPixelHeight: Ember.computed(function() {
    return this.get('screenHeight') * this.get('squareSize');
  }),

  didInsertElement: function() {
    this.drawGrid();
    this.drawCircle();
  },

  drawGrid() {
    let squareSize = this.get('squareSize');
    let ctx = this.get('ctx');
    ctx.fillStyle = '#000';

    let grid = this.get('grid');
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell == 1) {
          this.drawWall(columnIndex, rowIndex);
        } else if (cell == 2) {
          this.drawPellet(columnIndex, rowIndex);
        }
      });
    });
  },

  drawPellet(x, y) {
    let ctx = this.get('ctx');
    let squareSize = this.get('squareSize');
    let pixelX = (x + 1/2) * squareSize;
    let pixelY = (y + 1/2) * squareSize;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, squareSize/6, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },

  drawWall(x, y) {
    let ctx = this.get('ctx');
    let squareSize = this.get('squareSize');

    ctx.fillStyle = '#000';
    ctx.fillRect(
      x * squareSize,
      y * squareSize,
      squareSize,
      squareSize);
  },

  drawCircle: function() {
    let ctx = this.get('ctx');
    let x = this.get('x');
    let y = this.get('y');
    let squareSize = this.get('squareSize');
    let radius = this.get('squareSize') / 2;

    let pixelX = (x + 1/2) * squareSize;
    let pixelY = (y + 1/2) * squareSize

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },

  clearScreen() {
    let ctx = this.get('ctx');
    let screenPixelWidth = this.get('screenPixelWidth');
    let screenPixelHeight = this.get('screenPixelHeight');

    ctx.clearRect(0, 0, screenPixelWidth, screenPixelHeight);
  },

  movePacMan(direction, amount) {
    this.incrementProperty(direction, amount);

    if (this.offTheMap() || this.collideWithWall()) {
      this.decrementProperty(direction, amount);
    }

    this.clearScreen();
    this.drawGrid();
    this.drawCircle();
  },

  collideWithWall() {
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    return grid[y][x] == 1;
  },

  offTheMap() {
    let x = this.get('x');
    let y = this.get('y');
    let screenHeight = this.get('screenHeight');
    let screenWidth = this.get('screenWidth');

    return x < 0
      || y < 0
      || x >= screenWidth
      || y >= screenHeight;
  },

  keyboardShortcuts: {
    up() {
      this.movePacMan('y', -1);
    },
    down() {
      this.movePacMan('y', 1);
    },
    left() {
      this.movePacMan('x', -1);
    },
    right() {
      this.movePacMan('x', 1);
    }
  }
});
