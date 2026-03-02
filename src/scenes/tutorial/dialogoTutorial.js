import Phaser from 'phaser'

import dialogoDia from '../../../assets/sprites/dia/accion_escena_tutorial.jpeg'
import cubatita from '../../../assets/sprites/cubatita.png'

export default class DialogoTutorial extends Phaser.Scene {
    constructor(){
        super({key: 'dialogoTutorial'})
    }

    preload(){
        this.load.image('dialogo_dia', dialogoDia)
        this.load.image('cubatita', cubatita)
    }

    create(){

        const bgImg = this.add.image(500, 350, 'dialogo_dia');
        const player = this.add.image(200, 500, 'cubatita');
        const contextoBubble = this.add.rectangle(500, 100, 800, 150, 0xE1AD01)
        contextoBubble.setStrokeStyle(3, 0x000000)
        const contexto = this.add.text(500, 100, 'Aparece una señora preguntandote que hace una cosa tan bonita en medio de la calle, ofreciendote una loncha de jamón. ¿Qué haces?', { 
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 700 },
            align: 'center'
        }).setOrigin(0.5).setInteractive();
        const opcion1Bubble = this.add.rectangle(600, 550, 560, 60, 0x7B002C)
        opcion1Bubble.setStrokeStyle(3, 0x000000)
        const opcion1 = this.add.text(600, 550, 'Bufar y seguir con tu camino', { 
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5).setInteractive();
        const opcion2Bubble = this.add.rectangle(600, 600, 560, 60, 0x7B002C)
        opcion2Bubble.setStrokeStyle(3, 0x000000)
        const opcion2 = this.add.text(600, 600, 'Aceptar la loncha de jamón para seguir con tu camino', { 
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 500 },
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        const mostrarRecompensa = (mensaje) => {
            opcion1.destroy()
            opcion2.destroy()
            opcion1Bubble.destroy()
            opcion2Bubble.destroy()

            const bubble = this.add.rectangle(600, 580, 580, 110, 0xffffff)
            bubble.setStrokeStyle(4, 0x000000)

            this.add.text(600, 580, mensaje, {
                fontSize: '28px',
                color: '#000000',
                align: 'center'
            }).setOrigin(0.5)

            this.time.delayedCall(2000, () => {
                const continuar = this.add.text(600, 660, 'Presiona aquí para continuar', {
                    fontSize: '20px',
                    color: '#0066cc'
                }).setOrigin(0.5).setInteractive()

                continuar.on('pointerdown', () => {
                    this.scene.start('phone-tutorial')
                })
            })
        }

        opcion1.on('pointerdown', () => {
            mostrarRecompensa('¡Has conseguido dar miedo!')
        })
        opcion2.on('pointerdown', () => {
            mostrarRecompensa('¡Has conseguido loncha de jamón!')
        })
    }
}