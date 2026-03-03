import Phaser from 'phaser'

import tiendaDia from '../../../assets/sprites/dia/tienda_escena_tutorial.png'
import cubatita from '../../../assets/sprites/cubatita.png'

export default class TiendaTutorial extends Phaser.Scene {
    constructor(){
        super({key: 'tiendaTutorial'})
    }

    preload(){
        this.load.image('tienda_dia', tiendaDia)
        this.load.image('cubatita', cubatita)
    }

    create(){

        const bgImg = this.add.image(500, 350, 'tienda_dia');
        const player = this.add.image(200, 500, 'cubatita');
        const opcion1Bubble = this.add.rectangle(600, 500, 560, 60, 0x6969ec)
        opcion1Bubble.setStrokeStyle(3, 0x000000)
        const opcion1 = this.add.text(600, 500, 'Comprar filtros (2€)', { 
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5).setInteractive();
        const opcion2Bubble = this.add.rectangle(600, 550, 560, 60, 0x6969ec)
        opcion2Bubble.setStrokeStyle(3, 0x000000)
        const opcion2 = this.add.text(600, 550, 'Comprar litrona (1€)', { 
            fontSize: '20px', 
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();
        const opcion3Bubble = this.add.rectangle(600, 600, 560, 60, 0x6969ec)
        opcion3Bubble.setStrokeStyle(3, 0x000000)
        const opcion3 = this.add.text(600, 600, 'Dar yanotekomo (1)', {
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5).setInteractive();
        const opcion4Bubble = this.add.rectangle(600, 650, 560, 60, 0x6969ec)
        opcion4Bubble.setStrokeStyle(3, 0x000000)
        const opcion4 = this.add.text(600, 650, 'Salir de la tienda', { 
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5).setInteractive();


        const mostrarRecompensa = (mensaje) => {
            opcion1.destroy()
            opcion2.destroy()
            opcion3.destroy()
            opcion4.destroy()
            opcion1Bubble.destroy()
            opcion2Bubble.destroy()
            opcion3Bubble.destroy()
            opcion4Bubble.destroy()

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
            mostrarRecompensa('¡Has comprado filtros!')
        })
        opcion2.on('pointerdown', () => {
            mostrarRecompensa('¡Has comprado una litrona!')
        })
        opcion3.on('pointerdown', () => {
            mostrarRecompensa('¡Has dado 1 yanotekomo!')
        })  
        opcion4.on('pointerdown', () => {
            mostrarRecompensa('¡Has salido de la tienda!')
        })
    }
}