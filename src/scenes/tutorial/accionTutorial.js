import Phaser from 'phaser'

import InventorySprite from '../../game-objects/inventorySprite.js'
import RuedaSprite from '../../game-objects/ruedaSprite.js'
import dialogTextSprite from '../../game-objects/dialogTextSprite.js'
import nextDialogSprite from '../../game-objects/nextDialogSprite.js'
import IconSprite from '../../game-objects/iconSprite.js'
import { addMoney, createMoneyHud } from '../../utils/money.js'

export default class AccionTutorial extends Phaser.Scene {
    constructor(){
        super({key: 'accionTutorial'})
        
        // Game state
        this.contextComplete = false;
        this.opcionesVisibles = false;
        this.opcionElegida = false;
        this.opcion1 = null;
        this.opcion2 = null;
        this.opcion1Bubble = null;
        this.opcion2Bubble = null;
        this.nextDialogHint = null;
        
        // Keyboard keys
        this.keyA = null;
        this.keyB = null;
        this.keySpace = null;
        this.keyS = null;
        this.keyI = null;
    }

    create(){
        // Setup keyboard keys
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        createMoneyHud(this)
        this.add.image(500, 350, 'dia')
        const inventoryBtn = InventorySprite.create(this, 50, 60)
        RuedaSprite.create(this, 920, 85, 'rueda')
        IconSprite.create(this, 920, 85, 'accion', 1200)
        
        const settingsBtn = this.add.image(20, 670, 'settings').setInteractive().setScale(0.7);

        this.add.text(680, 75, 'TUTORIAL: Accion', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5)
        this.add.text(700, 110, 'POR EL DIA CUBATITA', {
            fontFamily: '"ToonwayEmpty", sans-serif',
            fontSize: '20px',
            color: '#ffe2f9'
        }).setOrigin(0.5)

        this.add.image(690, 620, 'bin')

        this.contextoBubble = this.add.rectangle(325, 250, 500, 150, 0xE2007C)
        this.contextoBubble.setStrokeStyle(3, 0Xe76d2c)
        this.contexto = dialogTextSprite.create(this, 325, 250, [
            'Siguiendo a la dueña te encuentras con una moneda brillante',
            'en el suelo, pero tu gran olfato huele algo delicioso en lo que parece ser un cubo con muchas cosas. ¿Qué haces?'
        ], {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 500 },
            align: 'center'
        })

        this.contexto.once('complete', () => {
            this.contextComplete = true;
            this.nextDialogHint = nextDialogSprite.create(this, 550, 300)
        })
    }

    update(){
        
        // Show options when space is pressed (after hint is shown)
        if (this.contextComplete && !this.opcionesVisibles && this.nextDialogHint && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.mostrarOpciones();
        }

        // Handle option selection with A or B keys
        if (this.opcionesVisibles && !this.opcionElegida) {
            if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
                this.opcionElegida = true
                addMoney(this, 2)
                this.mostrarRecompensa('¡Has conseguido 2€!')
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyB)) {
                this.opcionElegida = true
                this.mostrarRecompensa('¡Has conseguido 1 yanotekomo!')
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            this.add.image(20, 670, 'settings2').setScale(0.7);
            this.scene.pause();
            this.scene.launch('settings', { from: this.scene.key });
            this.scene.bringToTop('settings');
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyI)){
            this.scene.pause()
            this.scene.launch('inventory', { from: this.scene.key })
            this.scene.bringToTop('inventory')
        }
    }

    mostrarOpciones() {
        this.contexto.destroy()
        this.contextoBubble.destroy()
        if (this.nextDialogHint) {
            this.nextDialogHint.destroy()
            this.nextDialogHint = null
        }

        this.opcionesVisibles = true;

        this.opcion1Bubble = this.add.rectangle(650, 320, 360, 60, 0Xe76d2c)
        this.opcion1Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion1 = this.add.text(650, 320, '(A) Recoger dinero del suelo (+2€)', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive()

        this.opcion2Bubble = this.add.rectangle(650, 380, 360, 60, 0Xe76d2c)
        this.opcion2Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion2 = this.add.text(650, 380, '(B) Buscar en la basura (+1 yanotekomo)', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive()
    }

    mostrarRecompensa = (mensaje) => {
        this.opcion1.destroy()
        this.opcion2.destroy()
        this.opcion1Bubble.destroy()
        this.opcion2Bubble.destroy()

        const bubble = this.add.rectangle(650, 350, 300, 110, 0xffffff)
        bubble.setStrokeStyle(4, 0x000000)

        this.add.text(650, 350, mensaje, {
            fontFamily: '"PixelAE-Regular", monospace',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 280 }, 
            border: 4
        }).setOrigin(0.5)

        this.time.delayedCall(2000, () => {
            const continuar = this.add.text(650, 430, 'Presiona espacio para continuar', {
                fontFamily: '"PixelAE-Bold", monospace',
                fontSize: '20px',
                color: '#ff028d'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true })

            this.input.keyboard.once('keydown-SPACE', () => {
                    this.scene.start('phone-tutorial')
            })
        })
    }
}
