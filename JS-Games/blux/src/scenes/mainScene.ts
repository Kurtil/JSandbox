export default class MainScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: "mainScene"
    });
  }

  preload() {
    this.load.spritesheet("player", "assets/spriteSheets/BluxSpriteSheet.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.image("ground", "assets/spriteSheets/platform.png");
  }

  create() {

    this.cameras.main.setZoom(2);
    const platforms = this.physics.add.staticGroup();

    // refresh body to tell the physic world to take into account the scale up
    platforms
      .create(200, 284, "ground")
      .setScale(2)
      .refreshBody();

    platforms.create(300, 200, "ground");
    platforms.create(25, 125, "ground");
    platforms.create(375, 110, "ground");

    // create player
    // dynamic by default
    this.player = this.physics.add.sprite(50, 225, "player");

    this.cameras.main.startFollow(this.player);

    // This means when it lands after jumping it will bounce ever so slightly.
    this.player.setBounce(0.2);
    // collide with the limit of the world
    this.player.setCollideWorldBounds(true);

    // player.body.setGravityY(300);

    // add collider between player and the platforms group
    this.physics.add.collider(this.player, platforms);

    // Animations
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 47, end: 48 }),
      frameRate: 20
    });

    this.anims.create({
      key: "jump",
      frames: [{ key: "player", frame: 32 }],
      frameRate: 20
    });

    this.anims.create({
      key: "land",
      frames: [{ key: "player", frame: 34 }],
      frameRate: 20
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("player", { start: 14, end: 30 }),
      frameRate: 24
    });

    this.anims.create({
      key: "dye",
      frames: this.anims.generateFrameNumbers("player", { start: 35, end: 45 }),
      frameRate: 24,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Controlls
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.setFlipX(true);
      this.player.anims.play("attack", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.setFlipX(false);
      this.player.anims.play("walk", true);
    } else if (this.cursors.down.isDown) {
        this.player.anims.play('dye');
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle");
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-200);
      this.player.anims.play("jump");
    }
  }
}
