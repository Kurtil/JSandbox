// export class MainScene extends Phaser.Scene {
//   private phaserSprite: Phaser.GameObjects.Sprite;

//   constructor() {
//     super({
//       key: "MainScene"
//     });
//   }

//   preload(): void {
//     this.load.image("logo", "./src/assets/phaser.png");
//   }

//   create(): void {
//     this.phaserSprite = this.add.sprite(400, 300, "logo");
//   }
// }

export class MainScene extends Phaser.Scene {
  private tileSet: Phaser.Tilemaps.Tileset;
  private tileMap: Phaser.Tilemaps.Tilemap;

  // the position of the scene... may be changed later
  private x = 200;
  private y = 200;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.atlas('assets', './src/assets/assets.png', './src/assets/assets.json');
    this.load.tilemapTiledJSON('level', `./src/assets/levels/level.json`);
  }

  create(): void {
    this.tileMap = this.make.tilemap({ key: 'level' });
    this.tileSet = this.tileMap.addTilesetImage('assets');
    this.tileMap.createStaticLayer('Tile Layer 1', this.tileSet, this.x, this.y);
  }
}
