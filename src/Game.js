import { Ball } from './Ball.js';
import { BrickPool } from './Brick.js';
import { InputManager } from './InputManager.js';
import { Paddle } from './Paddle.js';
import { Stats } from './Stats.js';

export class Game {
  constructor(canvasId) {
    this.cvs = document.getElementById(canvasId);
    this.ctx = this.cvs.getContext('2d');
    this.width = this.cvs.width = 600;
    this.height = this.cvs.height = 600;

    this.lastTime = 0;
    this.running = false;
    this.animationId;

    this.input = new InputManager(this);

    this.paddle = new Paddle(this);
    this.bricks = new BrickPool();
    this.ball = new Ball(this);

    this.stats = new Stats(this);

    this.loop = this.loop.bind(this);
  }

  loop(timestamp) {
    if (!this.running) return;
    const dt = this.running === 0 ? 0 : (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.update(dt, this.input);
    this.draw(this.ctx);

    this.animationId = requestAnimationFrame(this.loop);
  }
  update(dt, input) {
    this.paddle.update(dt, input);
    this.bricks.update(dt);
    this.ball.update(dt);

    // ball to wall collisions
    // horizontal axis
    if (
      this.ball.x < this.ball.radius ||
      this.ball.x > this.width - this.ball.radius
    ) {
      this.ball.vx *= -1;
    }

    // vertical axis
    if (this.ball.y < this.ball.radius) {
      this.ball.vy *= -1;
    }

    //ball to paddle collision
    if (this.checkCollision(this.ball, this.paddle)) {
      this.ball.vy *= -1;
      this.stats.score++;
    }

    // ball to bricks collision
    for (let row = 0; row < this.bricks.brickArray.length; row++) {
      for (let col = 0; col < this.bricks.brickArray[row].length; col++) {
        let currentBrick = this.bricks.brickArray[row][col];
        if (
          currentBrick.visible === 1 &&
          this.checkCollision(this.ball, currentBrick)
        ) {
          this.ball.vy *= -1;
          currentBrick.visible = 0;
          break;
        }
      }
    }
    if (this.bricks.getActiveBrickCount() < 1) {
      //win - no more bricks to break
      console.log('Congrats, you won !');
      this.stop();
    }

    // game over
    if (this.ball.y > this.height - this.ball.radius) {
      this.stats.lives--;

      if (this.stats.lives < 1) {
        console.log('Game Over!');
        this.stats.lives = 'Game Over';
        this.stop();
        this.input.cleanUp();
      } else {
        // Only pause/reset ball position if there is still lives left
        this.ball.x = this.paddle.x + this.paddle.width / 2;
        this.ball.y = this.paddle.y - this.paddle.height;
        this.togglePause();
      }
    }
  }

  draw(ctx) {
    this.paddle.draw(ctx);
    this.bricks.draw(ctx);
    this.ball.draw(ctx);
    this.stats.draw(ctx);
  }

  checkCollision(ball, paddle) {
    return (
      ball.x + ball.radius > paddle.x &&
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.y + ball.radius >= paddle.y &&
      ball.y - ball.radius <= paddle.y + paddle.height
    );
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.loop);
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    this.lastTime = 0;
    cancelAnimationFrame(this.animationId);
  }
  togglePause() {
    if (this.running) {
      this.stop();
    } else {
      this.start();
    }
  }
}
