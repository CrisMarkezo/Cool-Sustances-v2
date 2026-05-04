import Phaser from 'phaser';

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super('start-menu');
    }

    create() {
        var image = this.add.image(500, 350, 'startMenu');
        image.setScale(1.50);

        const empezarBtn = this.add.rectangle(500, 250, 320, 70, 0x000000, 0.55)
            .setStrokeStyle(2, 0xffffff, 0.5)
            .setInteractive({ useHandCursor: true });
        this.add.text(500, 250, 'Empezar', { fontFamily: '"Toonway"', fontSize: '25px', color: '#ffffff' })
            .setOrigin(0.5);

        empezarBtn.on('pointerdown', () => {
            image = this.add.image(490, 350, 'comic_1');
            image.setScale(0.65);
            this.time.delayedCall(5000, () => {
                this.scene.start('level');
            })
        });

        const continuarBtn = this.add.rectangle(500, 350, 320, 70, 0x000000, 0.55)
            .setStrokeStyle(2, 0xffffff, 0.5)
            .setInteractive({ useHandCursor: true });
        this.add.text(500, 350, 'Continuar', { fontFamily: '"Toonway"', fontSize: '25px', color: '#ffffff' })
            .setOrigin(0.5);

        const ajustesBtn = this.add.rectangle(500, 450, 320, 70, 0x000000, 0.55)
            .setStrokeStyle(2, 0xffffff, 0.5)
            .setInteractive({ useHandCursor: true });
        this.add.text(500, 450, 'Ajustes', { fontFamily: '"Toonway"', fontSize: '25px', color: '#ffffff' })
            .setOrigin(0.5);

        ajustesBtn.on('pointerdown', () => {
            this.scene.start('settings'); // Escena ajustes
        });
    }
}