import Phaser from 'phaser';
import menuTheme from '../../assets/sprites/sound/mainTheme.mp3';

export default class AudioScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuAudioScene' });
    }

    preload(){
        this.load.audio('menuTheme', menuTheme);
    }

    create() {
        this.music = this.sound.add('menuTheme', {
            loop: true,
            volume: 0.5
        });
        this.music.play();
    }
}
