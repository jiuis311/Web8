class BulletType2Controller extends BulletController {
  constructor (x, y, configs) {
    super (x, y, 'BulletType2.png', configs);
    this.sprite.BULLET_SPEED = 500;
    this.sprite.TURN_SPEED = 5;
  }

  update() {
    this.targetEnemy = Nakama.enemyGroup.getFirstAlive();
    if (this.targetEnemy == null) {
      this.targetEnemy = {
        x : this.sprite.x,
        y : 0
      }
    }

    var targetAngle = Nakama.game.math.angleBetween(
      this.sprite.position.x,
      this.sprite.position.y,
      this.targetEnemy.x,
      this.targetEnemy.y
    );

    if (this.sprite.rotation != targetAngle + Math.PI/2) {
      //get delta angle between 2 pointer
      var delta = targetAngle + Math.PI/2 - this.sprite.rotation;
      //set delta from -180 to 180
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;

      //turn
      if (delta > 0) {
        this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.TURN_SPEED);
      }
      if (delta < 0) {
        this.sprite.rotation -= Nakama.game.math.degToRad(this.sprite.TURN_SPEED);
      }

      //if angle is too small then turn straight
      if (Math.abs(delta) < Nakama.game.math.degToRad(this.sprite.TURN_SPEED)) {
        this.sprite.rotation = targetAngle + Math.PI/2;
      }

      //set SPEED
      this.sprite.body.velocity.x = Math.cos(this.sprite.rotation - Math.PI/2) * this.sprite.BULLET_SPEED;
      this.sprite.body.velocity.y = Math.sin(this.sprite.rotation - Math.PI/2) * this.sprite.BULLET_SPEED;
    }
  }
}
