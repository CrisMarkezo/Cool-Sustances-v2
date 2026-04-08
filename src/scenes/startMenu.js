import phaser from 'phaser';

export default class StartMenu extends phaser.Scene {

    constructor() {
        super('startMenu');
    }

    create(){
        this.add.image(500, 350, 'startMenu');
        this.add.text(670, 77, 'Empezar', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '25px',
            color: '#ffffff'
        }).setOrigin(0.5)
        this.add.text(670, 127, 'Continuar ', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '25px',
            color: '#ffffff'
        }).setOrigin(0.5)
        this.add.text(670, 177, 'Ajustes', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '25px',
            color: '#ffffff'
        }).setOrigin(0.5)
    }
}