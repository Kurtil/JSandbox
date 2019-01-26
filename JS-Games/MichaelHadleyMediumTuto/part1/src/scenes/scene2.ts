export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2',
        });
    }

    private controls: Phaser.Cameras.Controls.FixedKeyControl;

    preload() {
        this.load.image("tiles", "assets/tilesets/catastrophi_tiles_16_blue.png");
        this.load.tilemapCSV("map", "assets/tilemaps/catastrophi_level3.csv");
    }

    create() {
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage("tiles");
        const layer = map.createStaticLayer(0, tiles, 0, 0); // layer index, tileset, x, y

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
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Help text that has a "fixed" position on the screen
        this.add
            .text(16, 16, "Arrow keys to scroll", {
                font: "18px monospace",
                fill: "#ffffff",
                padding: { x: 20, y: 10 },
                backgroundColor: "#000000"
            })
            .setScrollFactor(0);
    }

    update(time, delta) {
        // Apply the controls to the camera each update tick of the game
        this.controls.update(delta);
    }
}
