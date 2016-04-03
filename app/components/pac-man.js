import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(KeyboardShortcuts, {
  x: 1,
  y: 2,
  squareSize: 40,
  score: 0,
  grid:
  [
    [2, 2, 2, 2, 2, 2, 2, 1],
    [2, 1, 2, 1, 2, 2, 2, 1],
    [2, 2, 1, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
  ],

  screenWidth: Ember.computed(function() {
    return this.get('grid.firstObject.length');
  }),
  screenHeight: Ember.computed(function() {
    return this.get('grid.length');
  }),

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
    this.drawPac();
  },

  drawGrid() {
    let ctx = this.get('ctx');
    ctx.fillStyle = '#000';

    let grid = this.get('grid');
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === 1) {
          this.drawWall(columnIndex, rowIndex);
        } else if (cell === 2) {
          this.drawPellet(columnIndex, rowIndex);
        }
      });
    });
  },

  processAnyPellets() {
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    if (grid[y][x] == 2) {
      grid[y][x] = 0;
      this.incrementProperty('score');
    }
  },

  drawPellet(x, y) {
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor);
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

  drawPac() {
    let x = this.get('x');
    let y = this.get('y');
    let radiusDivisor = 2;
    this.drawCircle(x, y, radiusDivisor);
  },

  drawCircle: function(x, y, radiusDivisor) {
    let ctx = this.get('ctx');
    let squareSize = this.get('squareSize');

    let pixelX = (x + 1/2) * squareSize;
    let pixelY = (y + 1/2) * squareSize;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, squareSize / radiusDivisor, 0, Math.PI * 2, false);
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

    if (this.collideWithBorder() || this.collideWithWall()) {
      this.decrementProperty(direction, amount);
    }

    this.processAnyPellets();

    this.clearScreen();
    this.drawGrid();
    this.drawPac();
  },

  collideWithWall() {
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    return grid[y][x] === 1;
  },

  collideWithBorder() {
    let x = this.get('x');
    let y = this.get('y');
    let screenHeight = this.get('screenHeight');
    let screenWidth = this.get('screenWidth');

    return x < 0 ||
      y < 0 ||
      x >= screenWidth ||
      y >= screenHeight;
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
