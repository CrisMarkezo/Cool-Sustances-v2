import Phaser from 'phaser';
import Player from '../game-objects/night/player';

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super('start-menu');
    }

    create() {
        if (!this.scene.isActive('StartAudioScene')) {
            this.scene.launch('StartAudioScene');
        }

        // Guardamos el centro real y dinámico de la pantalla
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // --- IMAGEN DE FONDO ---
        // Se posiciona exactamente en el centro de la pantalla
        var image = this.add.image(centerX, centerY, 'startMenu');
        
        // --- BOTÓN EMPEZAR ---
        // Situado en el centro horizontal (centerX) y un poco más arriba del vertical (centerY - 100)
        const empezarBtn = this.add.rectangle(centerX, centerY - 100, 320, 70, 0x000000, 0.55)
            .setStrokeStyle(2, 0xffffff, 0.5)
            .setInteractive({ useHandCursor: true });
        
        this.add.text(centerX, centerY - 100, 'Empezar', { fontFamily: '"Toonway"', fontSize: '25px', color: '#ffffff' })
            .setOrigin(0.5);

        empezarBtn.on('pointerdown', () => {
            this.scene.start('comic_1');
        });

        // --- BOTÓN CONTINUAR ---
        // Situado exactamente en el centro absoluto (centerY)
        const continuarBtn = this.add.rectangle(centerX, centerY, 320, 70, 0x000000, 0.55)
            .setStrokeStyle(2, 0xffffff, 0.5)
            .setInteractive({ useHandCursor: true });
            
        this.add.text(centerX, centerY, 'Continuar', { fontFamily: '"Toonway"', fontSize: '25px', color: '#ffffff' })
            .setOrigin(0.5);

        continuarBtn.on('pointerdown', () => {
            const audioScene = this.scene.get('StartAudioScene');
            audioScene.music.stop();
            this.scene.stop(this.scene.key);
            this.scene.launch('phone');
        });

        // --- BOTÓN PANTALLA COMPLETA ---
        // Situado en el centro horizontal y un poco más abajo del vertical (centerY + 100)
        const fullScreenBtn = this.add.rectangle(centerX, centerY + 100, 320, 70, 0x000000, 0.55)
            .setStrokeStyle(2, 0xffffff, 0.5)
            .setInteractive({ useHandCursor: true });
        
        const txtAjustes = this.add.text(centerX, centerY + 100, 'Pantalla Completa', { fontFamily: '"Toonway"', fontSize: '25px', color: '#ffffff' })
            .setOrigin(0.5);

        // Evento para alternar la pantalla completa en todo el juego de forma segura
        fullScreenBtn.on('pointerdown', () => {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
                txtAjustes.setText('Salir Pantalla Completa');
            } else {
                this.scale.stopFullscreen();
                txtAjustes.setText('Pantalla Completa');
            }
        });
        this.player = new Player(this, 0, 0);
    }
}