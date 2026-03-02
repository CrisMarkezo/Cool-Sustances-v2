import Phaser from 'phaser'
import onlyMenuImg from '../../../assets/sprites/menu/onlyMenu700.png'
import dialogoMenuImg from '../../../assets/sprites/menu/dialogoMenu_50.png'
import tiendaMenuImg from '../../../assets/sprites/menu/tiendaMenu_50.png'
import accionMenuImg from '../../../assets/sprites/menu/accionMenu_50.png'

export default class MenuTutorial extends Phaser.Scene {

    constructor(){
        super({key: 'phone-tutorial'});
    }

    preload(){
        this.load.image('onlyMenu', onlyMenuImg);
        this.load.image('dialogoMenu', dialogoMenuImg);
        this.load.image('tiendaMenu', tiendaMenuImg);
        this.load.image('accionMenu', accionMenuImg);
    }

    create(){
        // mostrar onlyMenu de fondo manteniendo proporción
        const menuImg = this.add.image(500, 350, 'onlyMenu');
       
        
        // boton de escena de dialogo
        const dialogoBtn = this.add.image(485, 200, 'dialogoMenu').setInteractive();
        dialogoBtn.on('pointerdown', () => {
            console.log('Diálogo clickeado');
            this.scene.start('dialogoTutorial');
        });

        // boton de tienda
        const tiendaBtn = this.add.image(485, 300, 'tiendaMenu').setInteractive();
        tiendaBtn.on('pointerdown', () => {
            console.log('Tienda clickeada');
            this.scene.start('tiendaTutorial');
        });

        // boton de escena de accion
        const accionBtn = this.add.image(485, 400, 'accionMenu').setInteractive();
        accionBtn.on('pointerdown', () => {
            console.log('Acción clickeada');
            this.scene.start('accionTutorial');
        });
        //boton de dungeon pero es la continuación del lore en este caso
        const dungeonBtn = this.add.text(485, 150, 'FDI', { fontSize: '20px', fill: '#2b1515' }).setInteractive();
        dungeonBtn.on('pointerdown', () => {
            console.log('Salir del tutorial clickeado');
            this.scene.start('storyScene2');
        });
        
    }
}