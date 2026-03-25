import Phaser from 'phaser'
import InventorySprite from '../../game-objects/inventorySprite.js'
import RuedaSprite from '../../game-objects/ruedaSprite.js'
import dialogTextSprite from './../../game-objects/dialogTextSprite';
import nextDialogSprite from './../../game-objects/nextDialogSprite';

export default class DialogoTutorial extends Phaser.Scene {
    constructor(){
        super({key: 'dialogoTutorial'})
    }

    create(){

        let opcion1, opcion2, opcion1Bubble, opcion2Bubble;

        this.add.image(500, 350, 'dia');
        InventorySprite.create(this, 50, 60)
        RuedaSprite.create(this, 920, 85, 'rueda')
        //this.add.image(200, 500, 'cubatita');

        const contextoBubble = this.add.rectangle(325, 250, 500, 150, 0xC8006E)
        contextoBubble.setStrokeStyle(3, 0Xe76d2c)
        const contexto = dialogTextSprite.create(this, 325, 250, [
            'Aparece una señora preguntandote que hace una cosa tan bonita en medio de la calle, ofreciendote una loncha de jamón. ¿Qué haces?'
        ], {       
            fontFamily: '"Toonway", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 500 },
            align: 'center'
        });

        let nextDialogHint = null;

        contexto.once('complete', () => {
            nextDialogHint = nextDialogSprite.create(this, 550, 300)
            
            this.input.once('pointerdown', () => {
            contexto.destroy()
            contextoBubble.destroy()
            if (nextDialogHint) {
                nextDialogHint.destroy()
            }
            opcion1Bubble = this.add.rectangle(650, 550, 360, 60, 0Xe76d2c)
            opcion1Bubble.setStrokeStyle(3, 0x1F2A44)
            opcion1 = this.add.text(650, 550, 'Bufar y seguir con tu camino', { 
                fontFamily: '"Keneric", sans-serif',
                fontSize: '20px', 
                fill: '#ffffff', 
                wordWrap: { width: 300 },
                align: 'center'
            }).setOrigin(0.5).setInteractive();
            opcion2Bubble = this.add.rectangle(650, 600, 360, 60, 0Xe76d2c)
            opcion2Bubble.setStrokeStyle(3, 0x1F2A44)
            opcion2 = this.add.text(650, 600, 'Aceptar la loncha de jamón para seguir con tu camino', { 
                fontFamily: '"Keneric", sans-serif',
                fontSize: '20px', 
                fill: '#ffffff',
                wordWrap: { width: 300 },
                align: 'center'
            }).setOrigin(0.5).setInteractive();

            opcion1.on('pointerdown', () => {
            mostrarRecompensa('¡Has conseguido dar miedo!')
            })
            opcion2.on('pointerdown', () => {
                mostrarRecompensa('¡Has conseguido loncha de jamón!')
            })
        })
        })

        const mostrarRecompensa = (mensaje) => {
            opcion1.destroy()
            opcion2.destroy()
            opcion1Bubble.destroy()
            opcion2Bubble.destroy()

            const bubble = this.add.rectangle(650, 580, 300, 110, 0xffffff)
            bubble.setStrokeStyle(4, 0x000000)

            this.add.text(650, 580, mensaje, {
                fontFamily: '"PixelAE-Regular", monospace',
                fontSize: '28px',
                color: '#000000',
                wordWrap: { width: 280 },
                align: 'center'
            }).setOrigin(0.5)

            this.time.delayedCall(2000, () => {
                const continuar = this.add.text(650, 660, 'Presiona aquí para continuar', {
                    fontFamily: '"PixelAE-Bold", monospace',
                    fontSize: '20px',
                    color: '#0066cc'
                }).setOrigin(0.5).setInteractive()

                continuar.on('pointerdown', () => {
                    this.scene.start('phone-tutorial')
                })
            })
        }
    }
}