import { Torch } from './items/torch';
import { Chest } from './items/chest';
import { Fire } from './items/fire';
import { Stairs } from './items/stairs';
import { Spikes } from './items/spikes';
import { Switch } from './items/switch';
import { Gem } from './pickups/gem';
import { dimensions } from '../config';

let objects;

objects = {
    Torch: Torch,
    Chest: Chest,
    Fire: Fire,
    Stairs: Stairs,
    Spikes: Spikes,
    Switch: Switch,
    Gem: Gem
};

export class Factory {
    static getObjectFromString(objectName) {
        if (objects[objectName]) {
            return objects[objectName];
        }

        console.error(`Object not found: ${objectName}`);
    }

    static getObjectsFromMapLayer(map, layer) {
        let objects;

        objects = [];

        for (let i = 0; i < map.objects[layer].length; i++) {
            let object,
                mapObject;

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
