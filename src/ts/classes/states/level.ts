import SpriteInput from '../sprite-input';
import Pickup from '../pickup';
import Progress from '../progress';
import Factory from '../factory';
import Player from '../player';
import Enemy from '../enemy';
import Ghost from '../enemies/ghost';
import Utility from '../utility';
import Game from '../game';
import { dimensions, sprites, frames } from '../../config';

export default class Level extends Phaser.State {
    constructor(public tileMap: string, public levelID: number) {
        super();
    }

    get tileMapPath(): string {
        return `/maps/${this.tileMap}.json`;
    }

    public pickups: Pickup[];
    public map: Phaser.Tilemap;
    public baseLayer: any;
    public subGroundLayer: any;
    public superGroundLayer: any;
    public subCollisionLayer: any;
    public superCollisionLayer: any;
    public objects: any;
    public player: Player;
    public enemies: Phaser.Group;

    preload() {
        this.game.load.tilemap(this.tileMap, this.tileMapPath, null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        let playerData: any;

        this.pickups = [];

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.game.add.tilemap(this.tileMap);

        this.map.addTilesetImage(sprites.tileSet.name, sprites.tileSet.key);

        this.baseLayer = this.map.createLayer('baseLayer');
        this.subGroundLayer = this.map.createLayer('subGroundLayer');
        this.superGroundLayer = this.map.createLayer('superGroundLayer');
        this.subCollisionLayer = this.map.createLayer('subCollisionLayer');
        this.superCollisionLayer = this.map.createLayer('superCollisionLayer');

        this.map.setCollisionByExclusion([], true, this.subCollisionLayer);
        this.map.setCollisionByExclusion([], true, this.superCollisionLayer);

        this.baseLayer.resizeWorld();

        this.objects = Factory.getObjectsFromMapLayer(this.map, 0);

        this.enemies = this.game.add.physicsGroup();
        this.enemies.z = 1000;

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].type != 'Player') {
                let object: any,
                    classType: any,
                    objectInstance: any

                object = this.objects[i];
                classType = Factory.getObjectFromString(object.type);

                objectInstance = classType.instantiateFromMapData(this.game, object);

                objectInstance.create();

                if (isEnemy(object)) {
                    this.enemies.add(objectInstance);
                }
            }
        }

        playerData = Utility.filterArray(this.objects, 'type', 'Player')[0];

        this.player = new Player(
            new SpriteInput(
                this.game,
                playerData.x,
                playerData.y,
                sprites.tileSet.key),
            playerData.direction);

        this.player.create();
        this.player.z = 2000;

        this.time.reset();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.subCollisionLayer);
        this.game.physics.arcade.collide(this.player, this.superCollisionLayer);
    }

    shutdown() {
        Progress.updateProgress(this.levelID, this.time.totalElapsedSeconds(), this.pickups);
    }
}

function isEnemy(object: any) {
    return (object instanceof Enemy);
}
