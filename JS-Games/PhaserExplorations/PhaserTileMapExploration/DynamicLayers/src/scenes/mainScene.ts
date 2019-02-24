export default class MainScene extends Phaser.Scene {

    private shiftKey: Phaser.Input.Keyboard.Key = null;
    private marker: Phaser.GameObjects.Graphics = null;
    private marker2: Phaser.GameObjects.Graphics = null;
    private text: Phaser.GameObjects.Text = null;
    private map: Phaser.Tilemaps.Tilemap = null;
    private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer = null;

    constructor() {
        super({
            key: 'mainScene',
        });
    }

    preload() {
        this.load.image('tiles', 'assets/tilesets/0x72-industrial-tileset-32px-extruded.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/platformer-simple.json');
        // this.load.spritesheet('player', 'assets/spritesheets/0x72-industrial-player-32px-extruded.png')
    }

    create() {
        this.map = this.make.tilemap({ key: 'map' });
        const tileset = this.map.addTilesetImage('0x72-industrial-tileset-32px-extruded', 'tiles');
        const backgroundLayer = this.map.createStaticLayer('Background', tileset, 0, 0);
        const forgroundLayer = this.map.createStaticLayer('Foreground', tileset, 0, 0);
        this.groundLayer = this.map.createDynamicLayer('Ground', tileset, 0, 0);

        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.marker2 = this.add.graphics()
            .lineStyle(5, 0xffffff)
            .strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight)
            .lineStyle(3, 0xff4f78)
            .strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight)
            .setVisible(false);

        this.marker = this.add.graphics()
            .lineStyle(5, 0xffffff)
            .strokeCircle(0 + this.map.tileWidth / 2, 0 + this.map.tileHeight / 2, this.map.tileWidth / 2)
            .lineStyle(3, 0x00ff00)
            .strokeCircle(0 + this.map.tileWidth / 2, 0 + this.map.tileHeight / 2, this.map.tileWidth / 2)
            .setVisible(true);

        // Help text that has a "fixed" position on the screen
        this.text = this.add
            .text(16, 16, "PositionX: 0\nPositionY: 0\nTileX: 0\nTileY: 0\n", {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
            })
            .setScrollFactor(0);
    }

    update(delta, time) {
        const worldPoint: any = this.input.activePointer.positionToCamera(this.cameras.main);

        const tilePoint = this.groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = this.groundLayer.tileToWorldXY(tilePoint.x, tilePoint.y);

        this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
        this.marker2.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
        this.text.setText(`PositionX: ${worldPoint.x}\nPositionY: ${worldPoint.y}\nTileX: ${tilePoint.x}\nTileY: ${tilePoint.y}\n`);

        if (this.input.activePointer.isDown) {
            if (this.shiftKey.isDown) {
                this.groundLayer.removeTileAtWorldXY(snappedWorldPoint.x, snappedWorldPoint.y);
            } else {
                this.groundLayer.putTileAtWorldXY(1, snappedWorldPoint.x, snappedWorldPoint.y);
            }
        }

        this.marker.setVisible(!this.shiftKey.isDown);
        this.marker2.setVisible(this.shiftKey.isDown);
    }
}