export default class MarioScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'marioScene',
        });
    }

    controls;
    player;

    preload() {
        // For 2D ARRAY
        this.load.image('mario-tiles', 'assets/tilesets/super-mario-tiles.png');
        // For CSV
        this.load.image("tiles", "assets/tilesets/catastrophi_tiles_16_blue.png");
        this.load.tilemapCSV("map", "assets/tilemaps/catastrophi_level3.csv");
        // For Tiled
        this.load.tilemapTiledJSON('tiled-map', 'assets/tilemaps/tiled-map.json');
        this.load.image('tileset-tiled', 'assets/tilesets/tuxmon-sample-32px.png');
        // For player
        this.load.atlas('atlas', 'assets/atlases/atlas.png', 'assets/atlases/atlas.json');
    }

    create() {

        // MAP from 2D ARRAY
        const level = [
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0,   0,   0,   0,   0 ],
            [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   2,   3,   0 ],
            [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0,   5,   6,   7,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15,  15,   0,   0,   0 ],
            [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15,  15,  15,  15,   0 ],
            [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
        ];
        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ data: level, tileHeight: 16, tileWidth: 16, });
        const tiles = map.addTilesetImage('mario-tiles');
        const layer = map.createStaticLayer(0, tiles, 0, 0);

        // MAP FROM CSV
        const mapFromCSV = this.make.tilemap({ key: 'map', tileHeight: 16, tileWidth: 16, });
        const tiles2 = mapFromCSV.addTilesetImage('tiles');
        const layer2 = mapFromCSV.createStaticLayer(0, tiles2, 240, 0);

        // MAP from Tiled
        const mapFromTiled = this.make.tilemap({ key: 'tiled-map' });
        // WARNING : the first argument is the name in the JSON file, the second is from Phaser cache...
        const tileset = mapFromTiled.addTilesetImage("tuxmon-sample-32px", 'tileset-tiled');
        const groundLayerTiled = mapFromTiled.createStaticLayer('Ground', tileset, 0, - mapFromTiled.heightInPixels);
        const wallsLayerTiled = mapFromTiled.createStaticLayer('Walls', tileset, 0, - mapFromTiled.heightInPixels);
        const topLayerTiled = mapFromTiled.createStaticLayer('Top', tileset, 0, - mapFromTiled.heightInPixels);

        wallsLayerTiled.setCollisionByProperty({ collides: true });

        const spawnPoint: any = mapFromTiled.findObject("Objects", obj => obj.name === 'spawn');

        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y - mapFromTiled.heightInPixels, 'atlas', 'misa-front').setSize(30, 40).setOffset(0, 24);

        this.physics.add.collider(this.player, wallsLayerTiled);

        this.player.body.setAcceleration(10, 1);
        // DEBUG GRAPHICS
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        wallsLayerTiled.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48),
            faceColor: new Phaser.Display.Color(40, 39, 37),
        });
        // #region
        // Camera setttings
        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Set up the arrows to control the camera
        const cursors = this.input.keyboard.createCursorKeys();
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        });

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, - mapFromTiled.heightInPixels, map.widthInPixels + mapFromCSV.widthInPixels, Math.max(map.heightInPixels, mapFromCSV.heightInPixels));

        // Help text that has a "fixed" position on the screen
        this.add
            .text(16, 16, "Arrow keys to scroll", {
                font: "18px monospace",
                fill: "#ffffff",
                padding: { x: 20, y: 10 },
                backgroundColor: "#000000"
            })
            .setScrollFactor(0);
        // #endregion
    }

    update(time, delta) {
        this.controls.update(delta);
        // this.player.body.setAcceleration(0, 0);
    }
}