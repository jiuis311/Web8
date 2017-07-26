class BulletController {
  constructor (x, y, VelX, VelY, spriteName)
  {
    this.sprite =  Nakama.game.add.sprite(x ,y,'assets',spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.bulletSpeedX = VelX;
    this.sprite.bulletSpeedY = VelY;
    this.sprite.body.velocity.y = -this.sprite.bulletSpeedY;
    this.sprite.body.velocity.x = this.sprite.bulletSpeedX;
  }

  update() {}

}
