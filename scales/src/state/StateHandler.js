// @flow
import GameObject from '../gameObject/GameObject';
import Vector2 from '../core/Vector2';
import worldToScreen from '../rendering/isometricToTile';
import Map from '../map/Map';

export default class StateHandler {
    map: Map;

    constructor({config}) {
        this.map = null;
        this.gamesObjects = [];
        this.tileSize = config.tiles.size;
    }

    setMap(map: Map) {
        this.map = map;
    }

    spawn(gameObject,x,y) {
        const coords = worldToScreen(this.tileSize * .5,this.tileSize * .25, x, y);
        gameObject.setPosition(...coords);
        this.gamesObjects.push(gameObject);
    }

    getState() {
        return {
            map: this.map,
            gameObjects:this.gamesObjects
        };
    }

}