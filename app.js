import { Game } from './src/Game.js';

window.addEventListener('load', () => {
  const game = new Game('breaker');
  game.start();
});
