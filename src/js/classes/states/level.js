import { Factory } from '../factory';
import { Player } from '../player';
import { Ghost } from '../ghost';
import { Timer } from '../timer';
import { Utility } from '../utility';
import { dimensions, sprites, frames } from '../../config';

export class Level extends Phaser.State {
    constructor(tileMap, levelID) {
        super();

        this.tileMap = tileMap;
        this.tileMapPath = '/maps/' + tileMap + '.json';
        this.levelID = levelID;
    }

    preload() {
        this.game.load.tilemap(this.tileMap, this.tileMapPath, null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
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

        this.objects = Factory.getObjectsFromMapLayer(this.map, 'objectLayer');

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].type != 'Player' && this.objects[i].type != 'Ghost') {
                let object,
                    classType,
                    objectInstance;

                object = this.objects[i];
                classType = Factory.getObjectFromString(object.type);

                objectInstance = classType.instantiateFromMapData(this.game, object);

                objectInstance.create();
            }
        }

        let playerData,
            ghostData;

        playerData = Utility.filterArray(this.objects, 'type', 'Player')[0];
        ghostData = Utility.filterArray(this.objects, 'type', 'Ghost');

        this.game.player = new Player(this.game, playerData.x, playerData.y, sprites.tileSet.key, playerData.direction);

        this.game.player.create();

        if (ghostData.length) {
            this.game.ghosts = [];

            for (let i = 0; i < ghostData.length; i++) {
                this.game.ghosts.push(new Ghost(this.game, ghostData[i].x, ghostData[i].y, sprites.tileSet.key, ghostData[i].direction))
                ;
                this.game.ghosts[i].create();
            }
        }

        this.time.reset();
    }

    update() {
        this.game.physics.arcade.collide(this.game.player, this.subCollisionLayer);
        this.game.physics.arcade.collide(this.game.player, this.superCollisionLayer);

        if (this.game.ghosts) {
            for (let i = 0; i < this.game.ghosts.length; i++) {
                this.game.physics.arcade.collide(this.game.ghosts[i], this.subCollisionLayer, this.game.ghosts[i].changeDirection, null, this.game.ghosts[i]);
                this.game.physics.arcade.collide(this.game.ghosts[i], this.superCollisionLayer, this.game.ghosts[i].changeDirection, null, this.game.ghosts[i]);
            }
        }
    }

    shutdown() {
        this.game.updateProgress(this.levelID, this.time.totalElapsedSeconds(), this.pickups);
    }
}
