// @flow
import GameObject from '../gameObject/GameObject';
import Vector2 from '../core/Vector2';
import { tileToWorld } from '../core/isometricProjection';
import Map from '../map/Map';

export default class StateHandler {
    map: Map;

    constructor() {
        this.map = null;
        this.gamesObjects = [];
    }

    setMap(map: Map) {
        this.map = map;
    }

    spawn(gameObject,x,y) {
        gameObject.setPosition(...tileToWorld(x, y));
        this.gamesObjects.push(gameObject);
    }

    getState() {
        return {
            map: this.map,
            gameObjects:this.gamesObjects
        };
    }

}