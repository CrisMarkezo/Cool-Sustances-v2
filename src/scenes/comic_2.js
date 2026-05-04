import Phaser from 'phaser';
import Comic_2_jpeg from '../../assets/comic2.jpeg';

export default class Comic_2 extends Phaser.Scene {
    constructor() {
        super('comic_2');
    }

    preload(){
        this.load.image('comic_2', Comic_2_jpeg);
    }

    create() {
        var image = this.add.image(497, 350, 'comic_2');
        image.setScale(0.64);
        this.time.delayedCall(5000, () => {
            this.scene.start('phone');
        })
    }
}