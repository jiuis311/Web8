var Nakama = {};
Nakama.configs = {
  GAME_WIDTH : 640,
  GAME_HEIGHT : 960
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

//size
var playerx, playery;

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

  Nakama.background = Nakama.game.add.sprite(0,-960,'background');
  Nakama.player = Nakama.game.add.sprite(400,700,'assets','Spaceship1-Player.png');
  Nakama.partner = Nakama.game.add.sprite(200,700,'assets','Spaceship1-Partner.png');
  playerx = Nakama.player.width;
  playery = Nakama.player.height;
}

// update game state each frame
var update = function(){
  Nakama.player.width = playerx;
  Nakama.player.height = playery;
  Nakama.background.position.y += 5;
  if (Nakama.background.position.y > 0) Nakama.background.position.y = -960;
  if (Nakama.keyboard.isDown(Phaser.Keyboard.LEFT) && Nakama.player.position.x > 0) {
    Nakama.player.position.x -= 10;
    Nakama.player.width *= 0.75;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.RIGHT) && Nakama.player.position.x < Nakama.configs.GAME_WIDTH-Nakama.player.width) {
    Nakama.player.position.x += 10;
    Nakama.player.width *= 0.75;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.UP) && Nakama.player.position.y > 0) {
    Nakama.player.position.y -= 10;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.DOWN) && Nakama.player.position.y < Nakama.configs.GAME_HEIGHT-Nakama.player.height) {
    Nakama.player.position.y += 10;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.A) && Nakama.partner.position.x > 0) {
    Nakama.partner.position.x -= 10;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.D) && Nakama.partner.position.x < Nakama.configs.GAME_WIDTH-Nakama.partner.width) {
    Nakama.partner.position.x += 10;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.W) && Nakama.partner.position.y > 0) {
    Nakama.partner.position.y -= 10;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.S) && Nakama.partner.position.y < Nakama.configs.GAME_HEIGHT-Nakama.partner.height) {
    Nakama.partner.position.y += 10;
  }
}

// before camera render (mostly for debug)
var render = function(){}
