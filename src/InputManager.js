export class InputManager {
  constructor(game) {
    this.game = game;
    this.keys = new Set();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
  }

  handleKeyDown(e) {
    const gameKeys = [
      'Space',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];
    if (gameKeys.includes(e.code)) {
      e.preventDefault();
    }

    this.keys.add(e.code);

    if (e.code === 'Space') {
      this.game.togglePause();
    }
  }

  handleKeyUp(e) {
    this.keys.delete(e.code);
  }

  handleBlur() {
    this.keys.clear();
  }

  isPressed(key) {
    return this.keys.has(key);
  }

  cleanUp() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleBlur);
    this.keys.clear();
    console.log('Input listeners removed.');
  }
}
