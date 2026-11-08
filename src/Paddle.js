export class Paddle {
  constructor(game) {
    this.game = game;
    this.width = 140;
    this.height = 15;
    this.speed = 340;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height - this.height;
  }

  update(dt, input) {
    if (input.isPressed('ArrowLeft')) this.x -= this.speed * dt;
    if (input.isPressed('ArrowRight')) this.x += this.speed * dt;

    //restrain paddle to the horizontal screen
    this.x = Math.max(0, Math.min(this.x, this.game.width - this.width));
  }

  draw(ctx) {
    ctx.fillStyle = 'darkblue';
    ctx.strokeStyle = 'lightgreen';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
