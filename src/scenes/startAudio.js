import Phaser from 'phaser';
import pajaros from '../../assets/sprites/sound/pajaros_piando.mp3';

export default class StartAudio extends Phaser.Scene {
    constructor() {
        super({ key: 'StartAudioScene' });
    }

    preload(){
        this.load.audio('startAudio', pajaros);
    }

    create() {
        this.music = this.sound.add('startAudio', {
            loop: true,
            volume: 0.7
        });
        this.music.play();
        this.registry.set('startAudio', this.music);
    }
}