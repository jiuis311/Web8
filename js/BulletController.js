class BulletController {
  constructor (x, y)
  {
    this.sprite =  Nakama.game.add.sprite(x ,y,'assets','BulletType1.png');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.bulletSpeed = 800;
    this.sprite.body.velocity.y = -this.sprite.bulletSpeed;
  }

  update() {}

}
