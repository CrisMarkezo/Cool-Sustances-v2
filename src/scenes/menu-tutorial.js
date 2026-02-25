import Phaser from 'phaser'
import onlyMenuImg from '../../assets/sprites/menu/onlyMenu.png'
import dialogoMenuImg from '../../assets/sprites/menu/dialogoMenu_50.png'
import tiendaMenuImg from '../../assets/sprites/menu/tiendaMenu_50.png'
import accionMenuImg from '../../assets/sprites/menu/accionMenu_50.png'

export default class MenuTutorial extends Phaser.Scene {

    constructor(){
        super({key: 'phone'});
    }

    preload(){
        this.load.image('onlyMenu', onlyMenuImg);
        this.load.image('dialogoMenu', dialogoMenuImg);
        this.load.image('tiendaMenu', tiendaMenuImg);
        this.load.image('accionMenu', accionMenuImg);
    }

    create(){
        // mostrar onlyMenu de fondo manteniendo proporción
        const menuImg = this.add.image(500, 300, 'onlyMenu');
        const texture = this.textures.get('onlyMenu');
        const originalWidth = texture.source[0].width;
        const originalHeight = texture.source[0].height;
        const scale = Math.min(1000 / originalWidth, 600 / originalHeight);
        menuImg.setScale(scale);
        
        // boton de escena de dialogo
        const dialogoBtn = this.add.image(500, 300, 'dialogoMenu').setInteractive();
        dialogoBtn.on('pointerdown', () => {
            console.log('Diálogo clickeado');
            this.scene.start('dialogoTutorial');
        });

        // boton de tienda
        const tiendaBtn = this.add.image(500, 450, 'tiendaMenu').setInteractive();
        tiendaBtn.on('pointerdown', () => {
            console.log('Tienda clickeada');
            this.scene.start('tiendaTutorial');
        });
        

        // boton de escena de accion
        const accionBtn = this.add.image(500, 600, 'accionMenu').setInteractive();
        accionBtn.on('pointerdown', () => {
            console.log('Acción clickeada');
            this.scene.start('accionTutorial');
        });
        
    }
}