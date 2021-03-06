import Player from "../entities/player";
import GunShip from "../entities/gunShip";
import ChaserShip from "../entities/chaserShip";
import CarrierShip from "../entities/carrierShip";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene"
    });
  }

  sfx: { laser, explosions };
  player: Player;
  keys: any = {};
  enemies: any;
  enemyLasers: any;
  playerLasers: any;

  preload() {
    this.load.image("sprBg0", "assets/sprBg0.png");
    this.load.image("sprBg1", "assets/sprBg1.png");
    this.load.spritesheet("sprExplosion", "assets/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("sprEnemy0", "assets/sprEnemy0.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprEnemy1", "assets/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "assets/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprLaserEnemy0", "assets/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "assets/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "assets/sprPlayer.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.audio("sndExplode0", "assets/sndExplode0.wav");
    this.load.audio("sndExplode1", "assets/sndExplode1.wav");
    this.load.audio("sndLaser", "assets/sndLaser.wav");
  }

  create() {
    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0", null),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2", null),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion", null),
      frameRate: 20,
      repeat: 0
    });
    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer", null),
      frameRate: 20,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };

    this.player = new Player(
      this,
      <number>this.game.config.width * 0.5,
      <number>this.game.config.height * 0.5,
      "sprPlayer"
    );

    this.keys.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keys.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keys.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.generateEnemy();
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerLasers, this.enemies, this.onEnemyHitted);

    this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
      if (!player.getData("isDead") &&
        !enemy.getData("isDead")) {
        (<any>player).explode(false);
        (<any>enemy).explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
      if (!player.getData("isDead") &&
        !laser.getData("isDead")) {
        (<any>player).explode(false);
        laser.destroy();
      }
    });
  }

  update() {

    this.enemies.getChildren().forEach(enemy => {
      enemy.update();
      // frustum culling : eliminate each entity that is not in the render screen
      if (enemy.x > (<number>this.game.config.width + enemy.displayWidth) ||
        enemy.x < -enemy.displayWidth ||
        enemy.y > <number>this.game.config.height + enemy.displayHeight ||
        enemy.y < - enemy.displayHeight * 2) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.destroy();
      }
    });

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    if (!this.player.getData("isDead")) {
      this.player.update();

      if (this.keys.keyZ.isDown) {
        this.player.moveUp();
      }
      else if (this.keys.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keys.keyQ.isDown) {
        this.player.moveLeft();
      }
      else if (this.keys.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keys.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }
  }

  private generateEnemy() {
    var enemy = null;
    if (Phaser.Math.Between(0, 10) >= 3) {
      enemy = new GunShip(
        this,
        Phaser.Math.Between(0, <number>this.game.config.width),
        0
      );
    }
    else if (Phaser.Math.Between(0, 10) >= 5) {
      if (this.getEnemiesByType("ChaserShip").length < 5) {
        enemy = new ChaserShip(
          this,
          Phaser.Math.Between(0, <number>this.game.config.width),
          0
        );
      }
    }
    else {
      enemy = new CarrierShip(
        this,
        Phaser.Math.Between(0, <number>this.game.config.width),
        0
      );
    }
    if (enemy !== null) {
      enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
      this.enemies.add(enemy);
    }
  }

  private getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  private onEnemyHitted(playerLaser, enemy) {
    if (enemy) {
      if (enemy.onDestroy !== undefined) {
        enemy.onDestroy();
      }
      enemy.explode(true);
      playerLaser.destroy();
    }
  }
}
