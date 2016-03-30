import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(KeyboardShortcuts, {
  x: 20,
  y: 60,
  squareSize: 40,

  didInsertElement: function() {
    this.drawCircle();
  },

  ctx: Ember.computed(function() {
    let canvas = document.getElementById("myCanvas");
    return canvas.getContext("2d");
  }),

  drawCircle: function() {
    let ctx = this.get('ctx');
    let x = this.get('x');
    let y = this.get('y');
    let radius = this.get('squareSize') / 2;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },

  clearScreen() {
    let ctx = this.get('ctx');
    let screenWidth = 800;
    let screenHeight = 600;

    ctx.clearRect(0, 0, screenWidth, screenHeight);
  },

  movePacMan(direction, amount) {
    this.incrementProperty(direction, amount);
    this.clearScreen();
    this.drawCircle();
  },

  keyboardShortcuts: {
    up() {
      this.movePacMan('y', -1 * this.get('squareSize'));
    },
    down() {
      this.movePacMan('y', this.get('squareSize'));
    },
    left() {
      this.movePacMan('x', -1 * this.get('squareSize'));
    },
    right() {
      this.movePacMan('x', this.get('squareSize'));
    }
  }
});