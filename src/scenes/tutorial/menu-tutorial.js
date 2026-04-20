import Phaser from 'phaser'
import MenuSprite from '../../game-objects/menuSprite.js'
import WidgetSprite from '../../game-objects/widgetSprite.js'
import nextDialogSprite from './../../game-objects/nextDialogSprite';
import dialogTextSprite from '../../game-objects/dialogTextSprite.js';

export default class MenuTutorial extends Phaser.Scene {

    constructor(){
        super({key: 'phone-tutorial'});
        this.currentStep = 0;
        this.menuItems = [];
        this.selectedIndex = 0;
        this.keyUp = null;
        this.keyDown = null;
        this.keyEnter = null;
        this.keySpace = null;
        this.tutorialBubble = null;
        this.tutorialText = null;
        this.tutorialTextComplete = false;
        this.nextDialogSprite = null;
        this.tutorialOverlayVisible = false;
    }

    create(){
        // Inicializar el paso del tutorial si no existe
        if (!this.registry.has('tutorialStep')) {
            this.registry.set('tutorialStep', 0);
        }

        this.currentStep = this.registry.get('tutorialStep');

        // mostrar onlyMenu de fondo
        this.menuSprite = new MenuSprite(this, 500, 350);

        // Configurar teclas de navegación
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Crear items de menú 
        const mazmorraBtn = new WidgetSprite(this, 485, 125).setInteractive({ useHandCursor: true });
        const dialogoBtn = this.add.image(485, 250, 'dialogoMenu').setInteractive({ useHandCursor: true });
        const tiendaBtn = this.add.image(485, 350, 'tiendaMenu').setInteractive({ useHandCursor: true });
        const accionBtn = this.add.image(485, 450, 'accionMenu').setInteractive({ useHandCursor: true });

        this.menuItems = [
            {
                key: 'mazmorra',
                displayName: 'Mazmorra',
                requiredStep: 3,
                object: mazmorraBtn,
                pez: this.add.image(485, 125, 'pez').setScale(0.5).setAngle(-15),
                action: () => {
                    this.scene.start('phone');
                }
            },
            {
                key: 'dialogo',
                displayName: 'Dialogo',
                requiredStep: 2,
                object: dialogoBtn,
                pez: this.add.image(485, 250, 'pez').setScale(0.5).setAngle(-15),
                action: () => {
                    this.registry.set('tutorialStep', 3);
                    this.scene.start('dialogoTutorial');
                }
            },
            {
                key: 'tienda',
                displayName: 'Tienda',
                requiredStep: 1,
                object: tiendaBtn,
                pez: this.add.image(485, 350, 'pez').setScale(0.5).setAngle(-15),
                action: () => {
                    this.registry.set('tutorialStep', 2);
                    this.scene.start('tiendaTutorial');
                }
            },
            {
                key: 'accion',
                displayName: 'Accion',
                requiredStep: 0,
                object: accionBtn,
                pez: this.add.image(485, 450, 'pez').setScale(0.5).setAngle(-15),
                action: () => {
                    this.registry.set('tutorialStep', 1);
                    this.scene.start('accionTutorial');
                }
            }
        ];

        this.selectedIndex = this.menuItems.findIndex((item) => item.requiredStep === this.currentStep);
        if (this.selectedIndex < 0) {
            this.selectedIndex = 0;
        }

        this.updateSelectionVisuals();
        
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

        this.tutorialBubble = this.add.rectangle(200, 100, 400, 200, 0x00C4FF).setOrigin(0.5).setStrokeStyle(4, 0x000000);
        this.tutorialOverlayVisible = true;
        this.tutorialText = dialogTextSprite.create(this, 200, 100, ['Bienvenido a tu nuevo telefono! Aquí podrás elegir a donde ir durante el dia.', 'Como ves hay algunas partes más oscuras que otras, ese se debe a que primero tienes que elegir las que vienen antes para poder acceder a ellas.', 
            'Se usa W/S para navegar y E para seleccionar. Vamos a elegir la primera escena!'], {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: 380 }
        });

        this.tutorialText.once('complete', () => {
            this.nextDialogSprite = nextDialogSprite.create(this, 370, 170).setScale(0.8);
            this.tutorialTextComplete = true;
        })
    }

    update() {
        if (this.tutorialOverlayVisible) {
            if (this.tutorialTextComplete && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
                if (this.tutorialBubble) this.tutorialBubble.destroy();
                if (this.tutorialText) this.tutorialText.destroy();
                if (this.nextDialogSprite) this.nextDialogSprite.destroy();

                this.tutorialBubble = null;
                this.tutorialText = null;
                this.nextDialogSprite = null;
                this.tutorialOverlayVisible = false;
            }

            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {
            this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
            this.updateSelectionVisuals();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {
            this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
            this.updateSelectionVisuals();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            this.tryActivateSelection();
        }
    }

    updateSelectionVisuals() {
        this.menuItems.forEach((item, index) => {
            const isUnlocked = item.requiredStep <= this.currentStep;
            const isSelected = index === this.selectedIndex;
            const isCompleted = item.requiredStep < this.currentStep;

            item.pez.setVisible(isCompleted);

            if (isUnlocked && isSelected && !isCompleted) {
                item.object.setScale(1.4);
            } else if (isUnlocked) {
                item.object.clearTint();
                item.object.setScale(1);

            } else {
                item.object.setTint(0x212121);
                item.object.setScale(1);
            }
        });
    }

    tryActivateSelection() {
        const item = this.menuItems[this.selectedIndex];
        if (!item) return;

        const isUnlocked = item.requiredStep === this.currentStep;
        if (!isUnlocked) return;

        item.action();
    }
}