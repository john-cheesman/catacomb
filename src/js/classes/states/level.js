import { Factory } from '../factory';
import { Player } from '../player';
import { Timer } from '../timer';
import { Utility } from '../utility';
import { dimensions, sprites, frames } from '../../config';

export class Level extends Phaser.State {
    constructor(tileMap, levelID) {
        super();

        this.tileMap = tileMap;
        this.tileMapPath = '/maps/' + tileMap + '.json';
        this.levelID = levelID;
        this.pickups = [];
    }

    preload() {
        this.game.load.tilemap(this.tileMap, this.tileMapPath, null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
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

        this.objects = Factory.getObjectsFromMapLayer(this.map, 'objectLayer');

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].type != 'Player') {
                let object,
                    classType,
                    objectInstance;

                object = this.objects[i];
                classType = Factory.getObjectFromString(object.type);

                objectInstance = classType.instantiateFromMapData(this.game, object);

                objectInstance.create();
            }
        }

        let playerData;

        playerData = Utility.filterArray(this.objects, 'type', 'Player')[0];

        this.game.player = new Player(this.game, playerData.x, playerData.y, sprites.tileSet.key, playerData.direction);

        this.game.player.create();

        this.time.reset();
    }

    update() {
        this.game.physics.arcade.collide(this.game.player, this.subCollisionLayer);
        this.game.physics.arcade.collide(this.game.player, this.superCollisionLayer);
    }

    shutdown() {
        this.game.updateProgress(this.levelID, this.time.totalElapsedSeconds(), this.pickups);
    }
}
