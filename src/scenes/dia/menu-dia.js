import Phaser from 'phaser'
import MenuSprite from '../../game-objects/menuSprite.js'
import widgetSprite from '../../game-objects/widgetSprite.js'
import dialogoMenuImg from '../../../assets/sprites/menu/dialogoMenu_50.png'
import tiendaMenuImg from '../../../assets/sprites/menu/tiendaMenu_50.png'
import accionMenuImg from '../../../assets/sprites/menu/accionMenu_50.png'

export default class Menu extends Phaser.Scene {

    constructor(){
        super({key: 'phone'});
    }

    preload(){
        MenuSprite.preload(this);
        widgetSprite.preload(this);
        this.load.image('dialogoMenu', dialogoMenuImg);
        this.load.image('tiendaMenu', tiendaMenuImg);
        this.load.image('accionMenu', accionMenuImg);
    }

    create(){
        // Inicializar el paso del tutorial si no existe
        if (!this.registry.has('step')) {
            this.registry.set('step', 0);
        }
        const currentStep = this.registry.get('step');
        if(!this.registry.has('position')){
            this.registry.set('position', 1);
        }

        // mostrar onlyMenu de fondo 
        this.menuSprite = new MenuSprite(this, 500, 350);

        //PRIMERA LINEA 
        // boton de accion 
        const accionBtnPrimer1 = this.add.image(410, 450, 'accionMenu').setInteractive();
        accionBtnPrimer1.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Acción clickeada');
                this.registry.set('step', 1);
                this.scene.start('accion-primera-1');
                this.registry.set('position', 0);
            }
        });

        // boton de dialogo
        const dialogoBtnPrimer1 = this.add.image(500, 450, 'dialogoMenu').setInteractive();
        dialogoBtnPrimer1.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Dialogo clickead0');
                this.registry.set('step', 1);
                this.scene.start('dialogo-primera-1');
                this.registry.set('position', 1);
            }
        });
        
        // boton de accion
        const accionBtnPrimer2 = this.add.image(590, 450, 'accionMenu').setInteractive();
        accionBtnPrimer2.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Acción clickeada');
                this.registry.set('step', 1);
                this.scene.start('accion-primera-2');
                this.registry.set('position', 2);
            }
        });

        //SEGUNDA LINEA

        // boton de dialogo
        const dialogoBtnSegun1 = this.add.image(410, 390, 'dialogoMenu').setInteractive();
        dialogoBtnSegun1.on('pointerdown', () => {
            if (currentStep === 1 && (this.registry.get('position') === 1 || this.registry.get('position') === 0)) {
                console.log('Dialogo clickead0');
                this.registry.set('step', 2);
                this.scene.start('dialogo-segunda-1');
                this.registry.set('position', 0);
            }
        });

        const accionBtnSegun1 = this.add.image(500, 390, 'accionMenu').setInteractive();
        accionBtnSegun1.on('pointerdown', () => {
            if (currentStep === 1) {
                console.log('Acción clickeada');
                this.registry.set('step', 2);
                this.scene.start('accion-segunda-1');
                this.registry.set('position', 1);
            }
        });

        
        // boton de escena de dialogo
        const accionBtnSegun2 = this.add.image(590, 390, 'accionMenu').setInteractive();
        accionBtnSegun2.on('pointerdown', () => {
            if (currentStep === 1 && (this.registry.get('position') === 1 || this.registry.get('position') === 2)) {
                console.log('Acción clickeada');
                this.registry.set('step', 2);
                this.scene.start('accion-segunda-2');
                this.registry.set('position', 2);
            }
        });

        //TERCERA LINEA
        // boton de dialogo
        const tiendaBtnTercer1 = this.add.image(410, 330, 'tiendaMenu').setInteractive();
        tiendaBtnTercer1.on('pointerdown', () => {
            if (currentStep === 2 && (this.registry.get('position') === 1 || this.registry.get('position') === 0)) {
                console.log('Dialogo clickead0');
                this.registry.set('step', 3);
                this.scene.start('tienda-tercera-1');
                this.registry.set('position', 0);
            }
        });

        const tiendaBtnTercer2 = this.add.image(500, 330, 'tiendaMenu').setInteractive();
        tiendaBtnTercer2.on('pointerdown', () => {
            if (currentStep === 2) {
                console.log('Acción clickeada');
                this.registry.set('step', 3);
                this.scene.start('tienda-tercera-2');
                this.registry.set('position', 1);
            }
        });

        
        // boton de escena de dialogo
        const dialogoBtnTercer1 = this.add.image(590, 330, 'dialogoMenu').setInteractive();
        dialogoBtnTercer1.on('pointerdown', () => {
            if (currentStep === 2 && (this.registry.get('position') === 1 || this.registry.get('position') === 2)) {
                console.log('Acción clickeada');
                this.registry.set('step', 3);
                this.scene.start('dialogo-tercera-1');
                this.registry.set('position', 2)
            }
        });

        //CUARTA LINEA
        // boton de dialogo
        const accionBtnCuart1 = this.add.image(410, 260, 'accionMenu').setInteractive();
        accionBtnCuart1.on('pointerdown', () => {
            if (currentStep === 3 && (this.registry.get('position') === 0 || this.registry.get('position') === 1)) {
                console.log('Acción clickeada');
                this.registry.set('step', 4);
                this.scene.start('accion-cuarta-1');
                this.registry.set('position', 0);
            }
        });

        const dialogoBtnCuart1 = this.add.image(500, 260, 'dialogoMenu').setInteractive();
        dialogoBtnCuart1.on('pointerdown', () => {
            if (currentStep === 3) {
                console.log('Dialogo clickeado');
                this.registry.set('step', 4);
                this.scene.start('dialogo-cuarta-1');
                this.registry.set('position', 1);
            }
        });

        
        // boton de escena de dialogo
        const tiendaBtnCuart1 = this.add.image(590, 260, 'tiendaMenu').setInteractive();
        tiendaBtnCuart1.on('pointerdown', () => {
            if (currentStep === 3 && (this.registry.get('position') === 2 || this.registry.get('position') === 1)) {
                console.log('Tienda clickeada');
                this.registry.set('step', 4);
                this.scene.start('tienda-cuarta-1');
                this.registry.set('position', 2);
            }
        });

        //QUINTA LINEA
        const dialogoBtnQuint1 = this.add.image(410, 200, 'dialogoMenu').setInteractive();
        dialogoBtnQuint1.on('pointerdown', () => {
            if (currentStep === 4 && (this.registry.get('position') === 0 || this.registry.get('position') === 1)) {
                console.log('Dialogo clickeado');
                this.registry.set('step', 5);
                this.scene.start('dialogo-quinta-1');
                this.registry.set('position', 0);
            }
        });

        // boton de accion
        const accionBtnQuint1 = this.add.image(500, 200, 'accionMenu').setInteractive();
        accionBtnQuint1.on('pointerdown', () => {
            if (currentStep === 4) {
                console.log('Acción clickeada');
                this.registry.set('step', 5);
                this.scene.start('accion-quinta-1');
                this.registry.set('position', 1);
            }
        });

        const dialogoBtnQuint2 = this.add.image(590, 200, 'dialogoMenu').setInteractive();
        dialogoBtnQuint2.on('pointerdown', () => {
            if (currentStep === 4 && (this.registry.get('position') === 2 || this.registry.get('position') === 1)) {
                console.log('Dialogo clickeado');
                this.registry.set('step', 5);
                this.scene.start('dialogo-quinta-2');
                this.registry.set('position', 2);
            }
        });


        //boton de dungeon pero es la continuación del lore en este caso
        this.widgetSprite = new widgetSprite(this, 500, 120).setInteractive({ useHandCursor: true });
        this.widgetSprite.on('pointerdown', () => {
            if (currentStep === 5) {
                console.log('Salir del tutorial clickeado');
                this.scene.start('mazmorra');
            }
        });
        
    }
}