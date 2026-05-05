import Phaser from 'phaser';
import bossAudio from '../../assets/sprites/sound/tecnoKitty.mp3';

export default class BossAudio extends Phaser.Scene {
    constructor() {
        super({ key: 'BossAudioScene' });
    }

    preload(){
        this.load.audio('bossAudio', bossAudio);
    }

    create() {
        this.music = this.sound.add('bossAudio', {
            loop: true,
            volume: 0.2
        });
        this.registry.set('bossAudio', this.music);
    }
}