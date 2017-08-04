class BulletType3Controller extends BulletController {
  constructor (x, y, configs, ship) {
    super(x, y, "BulletType3.png", configs);
    this.sprite.anchor = new Phaser.Point(0.5, 1);
    this.sprite.body.velocity.y = 0;
    this.ship = ship;
    this.sprite.position.y = this.ship.sprite.position.y - this.ship.sprite.height/3;
  }

  update() {
    this.sprite.position.x = this.ship.sprite.position.x;
  }
}
