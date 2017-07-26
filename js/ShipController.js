class ShipController {
  //var SHIP_SPEED = 300;
  constructor(x, y, spriteName, configs, fireStyle) {
    this.sprite =  Nakama.game.add.sprite(x , y,'assets',spriteName);
    this.fireStyle = fireStyle;
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.sprite.update = this.update.bind(this);
    this.configs.SHIP_SPEED = 300;

    //bullets
    Nakama.bullets = [];
    this.fireTimer = 0;
  }

  update() {
    if (Nakama.keyboard.isDown(this.configs.left)) {
      this.sprite.body.velocity.x = -this.configs.SHIP_SPEED;
    }
    else if (Nakama.keyboard.isDown(this.configs.right)) {
      this.sprite.body.velocity.x = this.configs.SHIP_SPEED;
    }
    else {
      this.sprite.body.velocity.x = 0;
    }
    if (Nakama.keyboard.isDown(this.configs.up)) {
      this.sprite.body.velocity.y = -this.configs.SHIP_SPEED;
    }
    else if (Nakama.keyboard.isDown(this.configs.down)) {
      this.sprite.body.velocity.y = this.configs.SHIP_SPEED;
    }
    else {
      this.sprite.body.velocity.y = 0;
    }

    //bullet create
    this.fireTimer++;
    if (Nakama.keyboard.isDown(this.configs.fire)) {
      if (this.fireTimer > 5) {
        if (this.fireStyle == 1) {
          Nakama.bullets.push(new BulletController(this.sprite.position.x ,
          this.sprite.position.y));
          Nakama.bullets.push(new BulletController(this.sprite.position.x + this.sprite.width/2,
          this.sprite.position.y));
        }
        //fireStyle1();
        this.fireTimer = 0;
      }
    }
  }
}
