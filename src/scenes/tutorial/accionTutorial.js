import Phaser from 'phaser'

import accionDia from '../../../assets/sprites/dia/accion_escena_tutorial.jpeg'
import cubatita from '../../../assets/sprites/cubatita.png'

export default class AccionTutorial extends Phaser.Scene {
    constructor(){
        super({key: 'accionTutorial'})
    }

    preload(){
        this.load.image('accion_dia', accionDia)
        this.load.image('cubatita', cubatita)
    }

    create(){

        this.add.image(500, 350, 'accion_dia')
        this.add.image(200, 500, 'cubatita')

        const opcion1Bubble = this.add.rectangle(600, 500, 560, 60, 0Xe76d2c)
        opcion1Bubble.setStrokeStyle(3, 0x000000)
        const opcion1 = this.add.text(600, 500, 'Recoger dinero del suelo (+2€)', {
            fontSize: '22px',
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive()

        const opcion2Bubble = this.add.rectangle(600, 580, 560, 60, 0Xe76d2c)
        opcion2Bubble.setStrokeStyle(3, 0x000000)
        const opcion2 = this.add.text(600, 580, 'Buscar en la basura (+1 yanotekomo)', {
            fontSize: '22px',
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive()


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
            mostrarRecompensa('¡Has conseguido 2€!')
        })

        opcion2.on('pointerdown', () => {
            mostrarRecompensa('¡Has conseguido 1 yanotekomo!')
        })

    }
}
