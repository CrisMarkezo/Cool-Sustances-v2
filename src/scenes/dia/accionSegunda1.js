import Phaser from 'phaser'

import InventorySprite from '../../game-objects/inventorySprite.js'
import RuedaSprite from '../../game-objects/ruedaSprite.js'
import dialogTextSprite from '../../game-objects/dialogTextSprite.js'
import nextDialogSprite from '../../game-objects/nextDialogSprite.js'
import IconSprite from '../../game-objects/iconSprite.js'
import { addMoney, createMoneyHud } from '../../utils/money.js'

export default class AccionSegunda1 extends Phaser.Scene {
    constructor(){
        super({key: 'accion-segunda-1'})
        
        // Game state
        this.contextComplete = false;
        this.opcionesVisibles = false;
        this.opcionElegida = false;
        this.opcion1 = null;
        this.opcion2 = null;
        this.opcion1Bubble = null;
        this.opcion2Bubble = null;
        this.nextDialogHint = null;
        this.selectedOption = 0;
        this.optionBubbles = [];
        
        // Keyboard keys
        this.keyA = null;
        this.keyB = null;
        this.keyE = null;
        this.keySpace = null;
        this.keyR = null;
        this.keyW = null;
        this.keyS = null;
        this.keyQ = null;
    }

    create(){
        // Setup keyboard keys
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        createMoneyHud(this)
        this.add.image(500, 350, 'dia')
        const inventoryBtn = InventorySprite.create(this, 50, 60)
        RuedaSprite.create(this, 920, 85, 'rueda')
        IconSprite.create(this, 920, 85, 'accion', 1200)
        
        const settingsBtn = this.add.image(20, 670, 'settings').setInteractive().setScale(0.7);

        this.add.text(680, 75, 'Accion', {
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
            'Sigues caminando por el campus, sigues un camino que te lleva a un bosque. Te pierdes un poco hasta que ves unos humanos y decides seguirles hasat llegar al lado de una gran carretera.',
            'Ves que uno de ellos se le cae una cosa brillante, parece una moneda. Al mismo tiempo, ves en la esquina algo que huele delicioso. ¿Qué haces?'
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

        // Handle option selection with W/S and confirm with E
        if (this.opcionesVisibles && !this.opcionElegida) {
            if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
                this.moverSeleccion(-1)
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
                this.moverSeleccion(1)
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                this.confirmarSeleccion()
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.add.image(20, 670, 'settings2').setScale(0.7);
            this.scene.pause();
            this.scene.launch('settings', { from: this.scene.key });
            this.scene.bringToTop('settings');
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyQ)){
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
        this.selectedOption = 0;

        this.opcion1Bubble = this.add.rectangle(650, 320, 360, 60, 0Xe76d2c)
        this.opcion1Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion1 = this.add.text(650, 320, 'Recoger la moneda', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive()

        this.opcion2Bubble = this.add.rectangle(650, 380, 360, 60, 0Xe76d2c)
        this.opcion2Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion2 = this.add.text(650, 380, 'Recoger el yanotekomo', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive()

        this.optionBubbles = [this.opcion1Bubble, this.opcion2Bubble]
        this.actualizarSeleccionVisual()
    }

    moverSeleccion(direction) {
        if (!this.optionBubbles.length) return

        const total = this.optionBubbles.length
        this.selectedOption = (this.selectedOption + direction + total) % total
        this.actualizarSeleccionVisual()
    }

    actualizarSeleccionVisual() {
        this.optionBubbles.forEach((bubble, index) => {
            const isSelected = index === this.selectedOption
            bubble.setFillStyle(isSelected ? 0x8a3a00 : 0xE76d2c)
            bubble.setStrokeStyle(isSelected ? 5 : 3, isSelected ? 0xffde59 : 0x000000)
        })
    }

    confirmarSeleccion() {
        if (this.selectedOption === 0) {
            this.opcionElegida = true
            this.mostrarRecompensa('¡Has conseguido 2€!')
            return
        }
        this.opcionElegida = true
        this.mostrarRecompensa('¡Has conseguido 1 yanotekomo!')
    }

    mostrarRecompensa = (mensaje) => {
        this.opcion1.destroy()
        this.opcion2.destroy()
        this.opcion1Bubble.destroy()
        this.opcion2Bubble.destroy()
            this.optionBubbles = []

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
                    this.scene.launch('phone');
                    this.scene.stop(this.scene.key);
            })
        })
    }
}
