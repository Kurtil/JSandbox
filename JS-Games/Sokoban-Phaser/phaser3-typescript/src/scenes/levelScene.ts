import * as Phaser from 'phaser';
import Crate from '../sprites/crate';
import Player from '../sprites/player';

class LevelScene extends Phaser.Scene {

    private player: Player;
    private crates: Phaser.GameObjects.Group;

    // tilemap
    private tileSet: Phaser.Tilemaps.Tileset;
    private tileMap: Phaser.Tilemaps.Tilemap;

    // layers
    private floorLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private wallLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private spawnLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private goalLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private crateLayer: Phaser.Tilemaps.StaticTilemapLayer; // ? DynamicTilemapLayer

    constructor() {
        super({
            key: 'LevelScene',
        });
    }

    preload() {
        this.load.atlas('assets', './src/assets/assets.png', './src/assets/assets.json');
        this.load.tilemapTiledJSON('level01', `./src/assets/levels/level01.json`);
    }

    create() {
        this.tileMap = this.make.tilemap({ key: 'level01' });
        this.tileSet = this.tileMap.addTilesetImage('assets');
        this.createLevel();
        this.createPlayer();
        this.centerCamera()
    }

    private createLevel() {
        this.createLayers();
        this.createCrates();
        this.createGridLines();
    }

    private createLayers() {
        const x = 0;
        const y = 0;
        this.spawnLayer = this.tileMap.createStaticLayer('Spawn', this.tileSet, x, y);
        this.spawnLayer.setVisible(false);
        this.crateLayer = this.tileMap.createStaticLayer('Crates', this.tileSet, x, y);
        this.crateLayer.setVisible(false);
        this.floorLayer = this.tileMap.createStaticLayer('Floors', this.tileSet, x, y);
        this.wallLayer = this.tileMap.createStaticLayer('Walls', this.tileSet, x, y);
        this.goalLayer = this.tileMap.createStaticLayer('Goals', this.tileSet, x, y);
    }

    private createCrates() {
        const crateTiles = this.getTiles((tile) => {
            return tile.index > -1;
        }, this.crateLayer);
        const crateSprites = crateTiles.map((tile) => {
            const { x, y } = this.tileMap.tileToWorldXY(tile.x, tile.y);
            const { type } = tile.properties as { type: number };
            const crate = new Crate(this, x + 32, y + 32); // new Crate(this, x, y, type);
            this.add.existing(crate);
            return crate;
        });
        this.crates = this.add.group(crateSprites);
    }

    private createPlayer() {
        const playerSpawn = this.getSpawn();
        const { x, y } = this.tileMap.tileToWorldXY(playerSpawn.x, playerSpawn.y);
        this.player = new Player(this, x + 32, y + 32);
        this.add.existing(this.player);
    }

    private getSpawn() {
        const spawns = this.getTiles((tile) => {
            return tile.index > - 1
        }, this.spawnLayer);
        if (spawns.length !== 1) {
            throw new Error(`[LevelScene] Expected single spawn`);
        }
        return spawns[0];
    }

    private getTiles(
        test: (tile: Phaser.Tilemaps.Tile) => boolean,
        layer?: Phaser.Tilemaps.StaticTilemapLayer
    ): Phaser.Tilemaps.Tile[] {
        this.tileMap.setLayer(layer || this.floorLayer);
        return this.tileMap.filterTiles((tile: Phaser.Tilemaps.Tile) => {
            return test(tile);
        }, this, 0, 0, this.tileMap.width, this.tileMap.height);
    }

    private createGridLines() {
        const lineLength = 6;
        const skipLength = 2;
        this.addVerticalLines(lineLength, skipLength);
        this.addHorizontalLines(lineLength, skipLength);
    }

    private addVerticalLines(lineLength: number, skipLength: number) {
        let currentX = 0;
        const stopX = this.tileMap.widthInPixels;
        const stopY = this.tileMap.heightInPixels;
        const next = (x: number, y: number) => ({ x: x, y: y + lineLength });
        const skip = (x: number, y: number) => ({ x: x, y: y + skipLength });
        const stop = (x: number, y: number) => y >= stopY;
        while (currentX <= stopX) {
            this.addGridLine(currentX, 0, next, skip, stop);
            currentX += this.tileMap.tileWidth;
        }
    }

    private addHorizontalLines(lineLength: number, skipLength: number) {
        let currentY = 0;
        const stopX = this.tileMap.widthInPixels;
        const stopY = this.tileMap.heightInPixels;
        const next = (x: number, y: number) => ({ x: x + lineLength, y: y });
        const skip = (x: number, y: number) => ({ x: x + skipLength, y: y });
        const stop = (x: number, y: number) => x >= stopX;
        while (currentY <= stopY) {
            this.addGridLine(0, currentY, next, skip, stop);
            currentY += this.tileMap.tileHeight;
        }
    }
    private addGridLine(
        startX: number,
        startY: number,
        next: (x: number, y: number) => { x: number, y: number },
        skip: (x: number, y: number) => { x: number, y: number },
        stop: (x: number, y: number) => boolean,
    ) {
        let currentX = startX;
        let currentY = startY;
        const line = this.add.graphics({
            x: 0, y: 0,
            lineStyle: { width: 1, alpha: 0.5, color: 0x000000 },
            fillStyle: { color: 0x000000, alpha: 1 },
        });
        line.beginPath();
        line.moveTo(startX, startY);
        while (!stop(currentX, currentY)) {
            const { x: nextX, y: nextY } = next(currentX, currentY);
            line.lineTo(nextX, nextY);
            const { x: skipX, y: skipY } = skip(nextX, nextY);
            line.moveTo(skipX, skipY);
            currentX = skipX;
            currentY = skipY;
        }
        line.closePath();
        line.strokePath();
        line.fillPath();
    }

    private centerCamera() {
        const bounds = this.physics.world.bounds;
        const x = bounds.width / 2 - this.tileMap.widthInPixels / 2;
        const y = bounds.height / 2 - this.tileMap.heightInPixels / 2;
        this.cameras.remove(this.cameras.main);
        const camera = this.cameras.add(x, y, this.tileMap.widthInPixels, this.tileMap.heightInPixels, true);
        camera.setOrigin(0, 0);
        camera.setScroll(0, 0);
    }
}

export default LevelScene;