export class Brick {
  constructor(x, y, width, height, visible = 1) {
    //visible (1) == visible, (0) == invisible
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = visible;
    this.colors = [
      'red',
      'green',
      'blue',
      'white',
      'purple',
      'yellow',
      'cyan',
      'indigo',
    ];
    this.randomColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  update(dt) {}

  draw(ctx) {
    ctx.fillStyle = this.randomColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class BrickPool {
  constructor() {
    this.config = {
      width: 60,
      height: 20,
      padding: 20,
      offSetX: 30,
      offSetY: 30,
      row: 4,
      col: 7,
    };

    this.brickArray = [];
    this.initBricks();
    this.activeBricks = 0;
  }

  initBricks() {
    for (let row = 0; row < this.config.row; row++) {
      this.brickArray[row] = [];

      for (let col = 0; col < this.config.col; col++) {
        let x =
          col * (this.config.padding + this.config.width) + this.config.offSetX;
        let y =
          row * (this.config.padding + this.config.height) +
          this.config.offSetY;

        this.brickArray[row][col] = new Brick(
          x,
          y,
          this.config.width,
          this.config.height,
          1,
        );
      }
    }
  }

  getActiveBrickCount() {
    for (let row = 0; row < this.brickArray.length; row++)
      for (let col = 0; col < this.brickArray[row].length; col++) {
        let currentBrick = this.brickArray[row][col];
        if (currentBrick.visible === 1) {
          this.activeBricks++;
        }
      }
    return this.activeBricks;
  }

  update(dt) {}

  draw(ctx) {
    for (let row = 0; row < this.brickArray.length; row++) {
      for (let col = 0; col < this.brickArray[row].length; col++) {
        let currentBrick = this.brickArray[row][col];
        if (currentBrick.visible === 1) currentBrick.draw(ctx);
      }
    }
  }
}
