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

        const bgImg = this.add.image(500, 350, 'accion_dia');
        const player = this.add.image(200, 500, 'cubatita');
        const opcion1 = this.add.text(400, 500, 'Opción 1: Ir a la tienda', { fontSize: '20px', fill: '#000' }).setInteractive();
    }
}
