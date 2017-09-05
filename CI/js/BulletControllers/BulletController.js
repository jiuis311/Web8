class BulletController {
  /*constructor (x, y, VelX, VelY, spriteName)
  {
    this.sprite =  Nakama.game.add.sprite(x ,y,'assets',spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.bulletSpeedX = VelX;
    this.sprite.bulletSpeedY = VelY;
    this.sprite.body.velocity.y = -this.sprite.bulletSpeedY;
    this.sprite.body.velocity.x = this.sprite.bulletSpeedX;
  }

  update() {
    if (this.sprite.y < 0) {
      this.sprite.destroy();
    }
  }*/

  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.bulletGroup.create(x, y, 'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    this.sprite.body.velocity.y = -1500;
  }

  update() {}
}
