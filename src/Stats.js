export class Stats {
  constructor(game) {
    this.game = game;
    this.x = this.game.width / 2 - 105;
    this.y = 25;

    this.score = 0;
    this.lives = 3;
  }

  draw(ctx) {
    ctx.font = '30px Changa One';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);

    ctx.font = '30px Changa One';
    ctx.fillStyle = 'green';
    ctx.fillText(`Lives: ${this.lives}`, this.x + 130, this.y);
  }
}
