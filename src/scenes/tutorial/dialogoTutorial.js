import Phaser from 'phaser'

import dialogoDia from '../../../assets/sprites/dia/UIday.png'
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

        let opcion1, opcion2, opcion1Bubble, opcion2Bubble;

        this.add.image(500, 350, 'dialogo_dia');
        this.add.image(200, 500, 'cubatita');
        const contextoBubble = this.add.rectangle(400, 250, 500, 150, 0xC8006E)
        contextoBubble.setStrokeStyle(3, 0Xe76d2c)
        const contexto = this.add.text(400, 250, 'Aparece una señora preguntandote que hace una cosa tan bonita en medio de la calle, ofreciendote una loncha de jamón. ¿Qué haces?', { 
            fontSize: '15px', 
            fill: '#ffffff',
            wordWrap: { width: 500 },
            align: 'center'
        }).setOrigin(0.5).setInteractive();
        this.input.on('pointerdown', () => {
            contexto.destroy()
            contextoBubble.destroy()
            opcion1Bubble = this.add.rectangle(600, 550, 360, 60, 0Xe76d2c)
            opcion1Bubble.setStrokeStyle(3, 0x1F2A44)
            opcion1 = this.add.text(600, 550, 'Bufar y seguir con tu camino', { 
                fontSize: '20px', 
                fill: '#ffffff', 
                wordWrap: { width: 300 },
                align: 'center'
            }).setOrigin(0.5).setInteractive();
            opcion2Bubble = this.add.rectangle(600, 600, 360, 60, 0Xe76d2c)
            opcion2Bubble.setStrokeStyle(3, 0x1F2A44)
            opcion2 = this.add.text(600, 600, 'Aceptar la loncha de jamón para seguir con tu camino', { 
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

        const mostrarRecompensa = (mensaje) => {
            opcion1.destroy()
            opcion2.destroy()
            opcion1Bubble.destroy()
            opcion2Bubble.destroy()

            const bubble = this.add.rectangle(600, 580, 300, 110, 0xffffff)
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
    }
}