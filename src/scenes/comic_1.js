import Phaser from 'phaser';
import Comic_1_jpeg  from '../../assets/comic1.jpeg';

export default class Comic_1 extends Phaser.Scene {
    constructor() {
        super('comic_1');
    }

    preload(){
        this.load.image('comic_1', Comic_1_jpeg);
    }

    create() {
        var image = this.add.image(490, 350, 'comic_1');
        image.setScale(0.65);
        this.time.delayedCall(5000, () => {
            this.scene.start('level');
        })
    }
}