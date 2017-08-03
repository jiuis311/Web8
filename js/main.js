var Nakama = {};
Nakama.configs = {
  GAME_WIDTH : 640,
  GAME_HEIGHT : 960,
  P1_START_POSITION : {
    x : 200,
    y : 700
  },
  P2_START_POSITION : {
    x : 400,
    y : 700
  },
  E1_START_POSITION : {
    x : 200,
    y : 320,
  }
};

window.onload = function(){
  Nakama.game = new Phaser.Game(
    Nakama.configs.GAME_WIDTH,
    Nakama.configs.GAME_HEIGHT,
    Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = Nakama.configs.GAME_WIDTH/2;
  Nakama.game.scale.minHeight = Nakama.configs.GAME_HEIGHT/2;
  Nakama.game.scale.maxWidth = Nakama.configs.GAME_WIDTH;
  Nakama.game.scale.maxHeight = Nakama.configs.GAME_HEIGHT;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  //player group
  Nakama.players = [];
  Nakama.enemies = [];
  Nakama.background = Nakama.game.add.sprite(0,-960,'background');
  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();

  Nakama.players.push(new ShipType1Controller(
    Nakama.configs.P1_START_POSITION.x,
    Nakama.configs.P1_START_POSITION.y,
    '-Player',
    {
      up : Phaser.Keyboard.UP,
      down : Phaser.Keyboard.DOWN,
      left : Phaser.Keyboard.LEFT,
      right : Phaser.Keyboard.RIGHT,
      fire : Phaser.Keyboard.SPACEBAR
    }, ));
  Nakama.players.push(new ShipType2Controller(
    Nakama.configs.P2_START_POSITION.x,
    Nakama.configs.P2_START_POSITION.y,
    '-Partner',
    {
      up : Phaser.Keyboard.W,
      down : Phaser.Keyboard.S,
      left : Phaser.Keyboard.A,
      right : Phaser.Keyboard.D,
      fire : Phaser.Keyboard.F
    }
  ));

    Nakama.enemies.push(new EnemyController(
      Nakama.configs.E1_START_POSITION.x,
      Nakama.configs.E1_START_POSITION.y,
      'EnemyType1.png',
      {
        health : 5
      }
    ));

    //Nakama.bullet = new BulletController(200,800,'BulletType1.png');
}

// update game state each frame
var update = function() {
  Nakama.background.position.y += 5;
  if (Nakama.background.position.y > 0) Nakama.background.position.y = -960;
  /*for(var player of Nakama.players)
  {
    player.update();
  }
  //player 1 controller*/

  Nakama.game.physics.arcade.overlap(
    Nakama.bulletGroup,
    Nakama.enemyGroup,
    onBulletHitEnemy
  )
}


// before camera render (mostly for debug)
var render = function(){}

var onBulletHitEnemy = function(bulletSprite, enemySprite) {
  bulletSprite.kill();
  //enemySprite.damage(1);
}
