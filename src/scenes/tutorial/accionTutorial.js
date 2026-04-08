import Phaser from 'phaser'

import InventorySprite from '../../game-objects/inventorySprite.js'
import RuedaSprite from '../../game-objects/ruedaSprite.js'
import dialogTextSprite from '../../game-objects/dialogTextSprite.js'
import nextDialogSprite from '../../game-objects/nextDialogSprite.js'
import IconSprite from '../../game-objects/iconSprite.js'

export default class AccionTutorial extends Phaser.Scene {
    constructor(){
        super({key: 'accionTutorial'})
    }


    create(){
        let opcion1, opcion2, opcion1Bubble, opcion2Bubble;

        this.add.image(500, 350, 'dia')
        //this.add.image(200, 500, 'cubatita')
        const inventoryBtn = InventorySprite.create(this, 50, 60)
        RuedaSprite.create(this, 920, 85, 'rueda')
        IconSprite.create(this, 920, 85, 'accion', 1200)

        inventoryBtn.on('pointerdown', () => {
            this.scene.pause()
            this.scene.launch('inventory', { from: this.scene.key })
            this.scene.bringToTop('inventory')
        })
        
        const settingsBtn = this.add.image(20, 670, 'settings').setInteractive().setScale(0.7);
        settingsBtn.on('pointerdown', () => {
            this.add.image(20, 670, 'settings2').setScale(0.7);
            this.scene.pause();
            this.scene.launch('settings', { from: this.scene.key });
            this.scene.bringToTop('settings');
        });

        this.add.text(680, 75, 'TUTORIAL: Accion', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5)
        this.add.text(700, 110, 'POR EL DIA CUBATITA', {
            fontFamily: '"ToonwayEmpty", sans-serif',
            fontSize: '20px',
            color: '#ffe2f9'
        }).setOrigin(0.5)
        const contextoBubble = this.add.rectangle(325, 250, 500, 150, 0xE2007C)
        contextoBubble.setStrokeStyle(3, 0Xe76d2c)
        const contexto = dialogTextSprite.create(this, 325, 250, [
            'Siguiendo a la dueña te encuentras con una moneda brillante',
            'en el suelo, pero tu gran olfato huele algo delicioso en lo que parece ser un cubo con muchas cosas. ¿Qué haces?'
        ], {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 500 },
            align: 'center'
        })

        let nextDialogHint = null;
        contexto.once('complete', () => {
            nextDialogHint = nextDialogSprite.create(this, 550, 300)

            this.input.once('pointerdown', () => {
                contexto.destroy()
                contextoBubble.destroy()
                if (nextDialogHint) {
                    nextDialogHint.destroy()
                }

                opcion1Bubble = this.add.rectangle(650, 500, 360, 60, 0Xe76d2c)
                opcion1Bubble.setStrokeStyle(3, 0x000000)
                opcion1 = this.add.text(650, 500, 'Recoger dinero del suelo (+2€)', {
                    fontFamily: '"Keneric", sans-serif',
                    fontSize: '22px',
                    color: '#ffffff',
                    wordWrap: { width: 300 },
                    align: 'center'
                }).setOrigin(0.5).setInteractive()

                opcion2Bubble = this.add.rectangle(650, 580, 360, 60, 0Xe76d2c)
                opcion2Bubble.setStrokeStyle(3, 0x000000)
                opcion2 = this.add.text(650, 580, 'Buscar en la basura (+1 yanotekomo)', {
                    fontFamily: '"Keneric", sans-serif',
                    fontSize: '22px',
                    color: '#ffffff',
                    wordWrap: { width: 300 },
                    align: 'center'
                }).setOrigin(0.5).setInteractive()

                opcion1.on('pointerdown', () => {
                    mostrarRecompensa('¡Has conseguido 2€!')
                })

                opcion2.on('pointerdown', () => {
                    mostrarRecompensa('¡Has conseguido 1 yanotekomo!')
                })
            })
        })

        


        const mostrarRecompensa = (mensaje) => {
            opcion1.destroy()
            opcion2.destroy()
            opcion1Bubble.destroy()
            opcion2Bubble.destroy()

            const bubble = this.add.rectangle(650, 550, 300, 110, 0xffffff)
            bubble.setStrokeStyle(4, 0x000000)

            this.add.text(650, 550, mensaje, {
                fontFamily: '"PixelAE-Regular", monospace',
                fontSize: '28px',
                color: '#000000',
                align: 'center'
            }).setOrigin(0.5)

            this.time.delayedCall(2000, () => {
                const continuar = this.add.text(650, 630, 'Presiona aquí para continuar', {
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
