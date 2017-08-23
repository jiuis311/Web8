class BulletType4Controller {
  constructor (x, y, configs, ship) {
    //add ship
    this.ship = ship;

    //sprite 1
    this.sprite = Nakama.bulletGroup.create(x - this.ship.sprite.width/6, y, 'assets', 'bulletType1.png');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.velocity.y = -800;

    //sprite2
    this.sprite2 = Nakama.bulletGroup.create(x + this.ship.sprite.width/6, y, 'assets', 'bulletType1.png');
    Nakama.game.physics.arcade.enable(this.sprite2);
    this.sprite2.update = this.update.bind(this);
    this.sprite2.checkWorldBounds = true;
    this.sprite2.outOfBoundsKill = true;
    this.sprite2.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite2.body.velocity.y = -800;

    //sprite3
    this.sprite3 = Nakama.bulletGroup.create(x - this.ship.sprite.width/3, y, 'assets', 'bulletType1.png');
    Nakama.game.physics.arcade.enable(this.sprite3);
    this.sprite3.update = this.update.bind(this);
    this.sprite3.checkWorldBounds = true;
    this.sprite3.outOfBoundsKill = true;
    this.sprite3.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite3.body.velocity.y = -800;
    this.sprite3.body.velocity.x = -10;

    //sprite 4
    this.sprite4 = Nakama.bulletGroup.create(x - this.ship.sprite.width/3, y, 'assets', 'bulletType1.png');
    Nakama.game.physics.arcade.enable(this.sprite4);
    this.sprite4.update = this.update.bind(this);
    this.sprite4.checkWorldBounds = true;
    this.sprite4.outOfBoundsKill = true;
    this.sprite4.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite4.body.velocity.y = -800;
    this.sprite4.body.velocity.x = 10;
  }
}
