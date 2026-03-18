import Phaser from 'phaser'
import MenuSprite from '../../game-objects/menuSprite.js'
import WidgetSprite from '../../game-objects/widgetSprite.js'
import dialogoMenuImg from '../../../assets/sprites/menu/dialogoMenu_50.png'
import tiendaMenuImg from '../../../assets/sprites/menu/tiendaMenu_50.png'
import accionMenuImg from '../../../assets/sprites/menu/accionMenu_50.png'

export default class MenuTutorial extends Phaser.Scene {

    constructor(){
        super({key: 'phone-tutorial'});
    }

    preload(){
        MenuSprite.preload(this);
        WidgetSprite.preload(this);
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

        // mostrar onlyMenu de fondo
        this.menuSprite = new MenuSprite(this, 500, 350);
       
        // boton de escena de accion
        const accionBtn = this.add.image(485, 450, 'accionMenu').setInteractive();
        accionBtn.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Acción clickeada');
                this.registry.set('tutorialStep', 1);
                this.scene.start('accionTutorial');
            }
        });

        // boton de tienda
        const tiendaBtn = this.add.image(485, 350, 'tiendaMenu').setInteractive();
        tiendaBtn.on('pointerdown', () => {
            if (currentStep === 1) {
                console.log('Tienda clickeada');
                this.registry.set('tutorialStep', 2);
                this.scene.start('tiendaTutorial');
            }
        });
        
        // boton de escena de dialogo
        const dialogoBtn = this.add.image(485, 250, 'dialogoMenu').setInteractive();
        dialogoBtn.on('pointerdown', () => {
            if (currentStep === 2) {
                console.log('Diálogo clickeado');
                this.registry.set('tutorialStep', 3);
                this.scene.start('dialogoTutorial');
            }
        });

        //boton de dungeon pero es la continuación del lore en este caso
        this.WidgetSprite = new WidgetSprite(this, 485, 125).setInteractive({ useHandCursor: true });
        this.WidgetSprite.on('pointerdown', () => {
            if (currentStep === 3) {
                console.log('Salir del tutorial clickeado');
                this.scene.start('phone');   
            }
        });
        
    }
}