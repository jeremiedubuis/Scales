export default class Loader {

    constructor() {
        this.images = {};
    }

    loadImages(sources, cb) {
        return new Promise( (resolve, reject) => {

            let loaded = 0;
            const toLoad = sources.length;
            sources.forEach(src => {
                this.loadImage(src, () => {
                    loaded++;
                    if (loaded === toLoad) {
                        let imagesArray = sources.map(src => this.images[src]);
                        resolve(imagesArray);
                        if (typeof cb === 'function') cb( imagesArray );
                    }
                })
            })

        });
    }

    loadImage(src, cb) {

        return new Promise( (resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this.images[src] = img;
                resolve(img);
                if (typeof cb === 'function') cb(img);
            };

            img.src = src;
        });
    }

}