import Phaser from 'phaser';

class AudioScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuAudioScene' });
    }

    create() {
        this.music = this.sound.add('menuTheme', {
            loop: true,
            volume: 0.5
        });
        this.music.play();
    }
}