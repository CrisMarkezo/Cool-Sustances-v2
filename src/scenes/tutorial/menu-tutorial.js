import Phaser from 'phaser'
import MenuSprite from '../../game-objects/menuSprite.js'
import WidgetSprite from '../../game-objects/widgetSprite.js'
import dialogoMenuImg from '../../../assets/sprites/menu/dialogoMenu_50.png'
import tiendaMenuImg from '../../../assets/sprites/menu/tiendaMenu_50.png'
import accionMenuImg from '../../../assets/sprites/menu/accionMenu_50.png'
import pezImg from '../../../assets/sprites/menu/pez.png'

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
        this.load.image('pez', pezImg);
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
       
        if(currentStep !== 0) {
            this.add.image(485, 450, 'accionMenu').setTint(0x999999); // Deshabilitar el botón de accion
            this.add.image(485, 450, 'pez'); // Añadir pez para indicar que es el que has elegido
        } 
        accionBtn.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Acción clickeada');
                this.registry.set('tutorialStep', 1);
                this.scene.start('accionTutorial');
            }
        });

        // boton de tienda

        const tiendaBtn = this.add.image(485, 350, 'tiendaMenu').setInteractive();
        if (currentStep !== 1) {
            this.add.image(485, 350, 'tiendaMenu').setTint(0x999999); // Deshabilitar el botón de tienda
            this.add.image(485, 350, 'pez'); // Añadir pez para indicar que es el que has elegido
        }
        tiendaBtn.on('pointerdown', () => {
            if (currentStep === 1) {
                console.log('Tienda clickeada');
                this.registry.set('tutorialStep', 2);
                this.scene.start('tiendaTutorial');
            }
        });
        
        // boton de escena de dialogo
        const dialogoBtn = this.add.image(485, 250, 'dialogoMenu').setInteractive();
        if (currentStep !== 2) {
            this.add.image(485, 250, 'dialogoMenu').setTint(0x999999); // Deshabilitar el botón de dialogo
            this.add.image(485, 250, 'pez'); // Añadir pez para indicar que es el que has elegido
        }
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
        
        //anuncio en el menú de decoracion, pero podría usarse para otra cosa, como un easter egg o algo así
        this.add.text(520, 550, 'Do not fret if you want to hurt yourself!', {
            fontFamily: '"pixelAE-Bold", monospace',
            fontSize: '10px',
            fill: '#000000',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(520, 570, 'Call or text the number 667 if you need asistance', {
            fontFamily: '"pixelAE-Regular", monospace',
            fontSize: '9px',
            fill: '#000000',
            align: 'center',
            wordWrap: { width: 200 },
        }).setOrigin(0.5);
    }
}