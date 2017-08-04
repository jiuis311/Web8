class ShipType3Controller extends ShipController {
  constructor(x, y, spriteSuffix, configs) {
    super(
      x,
      y,
      `Spaceship1${spriteSuffix}.png`,
      configs
    );

    this.bullets = [];
    this.configs.SHIP_SPEED = 200;
    this.configs.FIRE_SPEED = 0;
  }


  fire() {
    if (this.bullets.length < 1) {
      this.bullets.push(new BulletType3Controller(
        this.sprite.position.x,
        this.sprite.position.y,
        {},
        this
      ));
    }
  }

  destroyBullet() {
    for (var bullet of this.bullets){
      bullet.sprite.kill();
    }
    this.bullets = [];
  }
}
