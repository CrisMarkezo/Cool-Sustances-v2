import Phaser from 'phaser';
import mazmorraLooking from '../../assets/sprites/sound/mazmorraLooking.mp3';

export default class MazmorraAudio extends Phaser.Scene {
    constructor() {
        super({ key: 'MazmorraAudioScene' });
    }

    preload(){
        this.load.audio('mazmorraLooking', mazmorraLooking);
    }

    create() {
        this.music = this.sound.add('mazmorraLooking', {
            loop: true,
            volume: 0.5
        });
        this.music.play();
    }
}