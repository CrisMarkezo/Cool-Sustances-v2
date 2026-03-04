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
        // Inicializar el paso del tutorial si no existe
        if (!this.registry.has('tutorialStep')) {
            this.registry.set('tutorialStep', 0);
        }
        const currentStep = this.registry.get('tutorialStep');

        // mostrar onlyMenu de fondo manteniendo proporción
        const menuImg = this.add.image(500, 350, 'onlyMenu');
       
        // boton de escena de accion
        const accionBtn = this.add.image(485, 400, 'accionMenu').setInteractive();
        accionBtn.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Acción clickeada');
                this.registry.set('tutorialStep', 1);
                this.scene.start('accionTutorial');
            }
        });

        // boton de tienda
        const tiendaBtn = this.add.image(485, 300, 'tiendaMenu').setInteractive();
        tiendaBtn.on('pointerdown', () => {
            if (currentStep === 1) {
                console.log('Tienda clickeada');
                this.registry.set('tutorialStep', 2);
                this.scene.start('tiendaTutorial');
            }
        });
        
        // boton de escena de dialogo
        const dialogoBtn = this.add.image(485, 200, 'dialogoMenu').setInteractive();
        dialogoBtn.on('pointerdown', () => {
            if (currentStep === 2) {
                console.log('Diálogo clickeado');
                this.registry.set('tutorialStep', 3);
                this.scene.start('dialogoTutorial');
            }
        });

        //boton de dungeon pero es la continuación del lore en este caso
        const dungeonBtn = this.add.text(485, 150, 'FDI', { fontSize: '20px', fill: '#2b1515' }).setInteractive();
        dungeonBtn.on('pointerdown', () => {
            if (currentStep === 3) {
                console.log('Salir del tutorial clickeado');
                this.scene.start('storyScene2');
            }
        });
        
    }
}