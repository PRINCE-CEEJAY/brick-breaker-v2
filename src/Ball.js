export class Ball {
  constructor(game) {
    this.game = game;
    this.radius = 10;
    this.x = this.game.paddle.x + this.game.paddle.width / 2;
    this.y = this.game.paddle.y - this.game.paddle.height;

    this.vx = 250;
    this.vy = 250;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y -= this.vy * dt;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
