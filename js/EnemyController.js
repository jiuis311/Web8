class EnemyController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.configs = configs;
    this.sprite.health = this.configs.health;
    //this.sprite.body.velocity.x = 200;

  }

  update() {
    /*if (this.sprite.position.x <= this.sprite.width/2)
      this.sprite.body.velocity.x = 200;
    if (this.sprite.position.x >= Nakama.configs.GAME_WIDTH - this.sprite.width/2)
      this.sprite.body.velocity.x = -200;*/
    this.sprite.position.x = (Nakama.configs.GAME_WIDTH/2-this.sprite.width/2)*Math.sin(Nakama.game.time.time/1000) + Nakama.configs.GAME_WIDTH/2;
  }
}
