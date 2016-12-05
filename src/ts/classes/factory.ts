import Torch from './items/torch';
import Chest from './items/chest';
import Fire from './items/fire';
import Stairs from './items/stairs';
import Spikes from './items/spikes';
import Switch from './items/switch';
import Gem from './pickups/gem';
import Gold from './pickups/gold';
import SpeedBoost from './pickups/speed-boost';
import Ghost from './enemies/ghost';
import Skeleton from './enemies/skeleton';
import { dimensions } from '../config';

let objects: any;

objects = {
    Torch: Torch,
    Chest: Chest,
    Fire: Fire,
    Stairs: Stairs,
    Spikes: Spikes,
    Switch: Switch,
    Gem: Gem,
    Gold: Gold,
    SpeedBoost: SpeedBoost,
    Ghost: Ghost,
    Skeleton: Skeleton
};

export default class Factory {
    static getObjectFromString(objectName: string) {
        if (objects[objectName]) {
            return objects[objectName];
        }

        console.error(`Object not found: ${objectName}`);
    }

    static getObjectsFromMapLayer(map: Phaser.Tilemap, layer: number) {
        let objects: any[],
            i: number;

        objects = [];

        for (i = 0; i < map.objects[layer].length; i++) {
            let object: any,
                mapObject: any;

            mapObject = map.objects[layer][i];

            object = {
                name: mapObject.name,
                type: mapObject.type,
                properties: mapObject.properties,
                x: mapObject.x,
                y: (mapObject.y - dimensions.tileSize)
            };

            objects.push(object);
        }

        return objects;
    }
}
