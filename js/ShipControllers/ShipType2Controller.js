class ShipType2Controller extends ShipController {
  constructor(x, y, spriteSuffix, configs) {
    super(
      x,
      y,
      `Spaceship2${spriteSuffix}.png`,
      configs
    );

    this.configs.SHIP_SPEED = 150;
    this.configs.FIRE_SPEED = 20;
  }

  fire() {
    new BulletType2Controller(
      this.sprite.position.x,
      this.sprite.position.y
    );
  }
}
