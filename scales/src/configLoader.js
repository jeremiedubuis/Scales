import config from '../config';
import Scales from './Scales';

const getImageFromSrc = (src, images) => {
    for (let i = 0, iLength = images.length; i<iLength; i++ ) {
        if (images[i].src.split('/').pop() === src.split('/').pop()) return images[i];
    }
};

export default {

    loaded: {
        config
    },
    toLoad: 0,
    load(api) {

        if (config.tiles) {
            this.loadTiles(config.tiles, api);
        }

    },

    loadTiles({types, size}, api) {
        this.toLoad++;
        api.load(
            Object.keys(types).map( type => types[type].src ).filter((item,index,self) => self.indexOf(item)===index)
        ).then((images) => {
            const halfSize = size * .5;

            const tiles = Object.keys(types).map(type => {

                return api.createSprite(
                    getImageFromSrc(types[type].src, images),
                    [size, halfSize],
                    types[type].coords
                );
            });

            this.loaded.tiles = api.createTiles(...tiles);
            this.toLoad--;
            this.done();
        });

    },

    done() {
        if (!this.toLoad) {
            Scales.trigger('load', this.loaded);
        }
    }

};