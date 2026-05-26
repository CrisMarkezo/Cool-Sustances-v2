import Phaser from 'phaser'

import InventorySprite from '../../game-objects/inventorySprite.js'
import RuedaSprite from '../../game-objects/ruedaSprite.js'
import dialogTextSprite from '../../game-objects/dialogTextSprite.js'
import nextDialogSprite from '../../game-objects/nextDialogSprite.js'
import IconSprite from '../../game-objects/iconSprite.js'
import { addMoney, createMoneyHud } from '../../utils/money.js'
import Interactable from './../../interactable';

export default class AccionCuarta1 extends Phaser.Scene {
    constructor(){
        super({key: 'accion-cuarta-1'})
        
        // Game state
        this.contextComplete = false;
        this.opcionesVisibles = false;
        this.opcionElegida = false;
        this.opcion1 = null;
        this.opcion2 = null;
        this.opcion1Bubble = null;
        this.opcion2Bubble = null;
        this.nextDialogHint = null;
        this.retryDialogHint = null;
        this.selectedOption = 0;
        this.optionBubbles = [];
        this.waitingForRetry = false;
        this.character = null;
        this.character2 = null;
        this.cubatita = null;
        
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


        const inventory = this.registry.get('inventory');
        createMoneyHud(this)
        this.add.image(500, 350, 'dia')
        this.add.image(700, 450, 'barraBar').setScale(0.7);
        this.cubatita = this.add.image(80, 680, 'cubatita').setOrigin(0,1).setScale(0.8);
        const inventoryBtn = InventorySprite.create(this, 50, 60)
        RuedaSprite.create(this, 920, 85, 'rueda')
        IconSprite.create(this, 920, 85, 'accion', 1200)
        this.character = this.add.image(800, 500, 'pabloNeutro');
        this.character2 = this.add.image(900, 500, 'anaNeutro');
        
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

        this.contextoBubble = this.add.rectangle(325, 250, 500, 150, 0xE2007C)
        this.contextoBubble.setStrokeStyle(3, 0Xe76d2c)
        this.contexto = dialogTextSprite.create(this, 325, 250, [
            'Sales de la tienda y pasas por delante de un bar. Ves que está pablo y ana. Te acercas y cada uno te mira como si estuvieran esperando que les des algo. ¿Qué haces?',
        ], {
            fontFamily: '"PixelAE-Regular", monospace',
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

        if (this.waitingForRetry && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.cerrarMensajeCubatita()
        }

        // Handle option selection with W/S and confirm with E
        if (this.opcionesVisibles && !this.opcionElegida && !this.waitingForRetry) {
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

        this.opcion1Bubble = this.add.rectangle(350, 320, 360, 60, 0Xe76d2c)
        this.opcion1Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion1 = this.add.text(350, 320, 'Dar cigarros', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive()

        this.opcion2Bubble = this.add.rectangle(350, 380, 360, 60, 0Xe76d2c)
        this.opcion2Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion2 = this.add.text(350, 380, 'Acercarte y escuchar', {
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
        const inventory = this.registry.get('inventory');
         this.cubatita.setTexture('cubatita2');
        if (this.selectedOption === 0 && inventory?.hasItem('cigarros')) {
            this.opcionElegida = true
            this.character.setTexture('pabloTriste').setScale(1.2)
            this.character2.setTexture('anaFeliz').setScale(1.2)
            this.mostrarRecompensa('¡Has conseguido la amistad de Ana!')
            return
        }
        else if (this.selectedOption === 0 && !inventory?.hasItem('cigarros')) {
            this.waitingForRetry = true;
            this.cubatitaBubble = this.add.ellipse(500, 580, 300, 110, 0xffffff)
            this.cubatitaBubble.setStrokeStyle(4, 0x000000)
            this.cubatitaTexto = this.add.text(500, 580, 'No tengo cigarros...', {
                fontFamily: '"PixelAE-Regular", monospace',
                fontSize: '20px',
                color: '#000000',
                wordWrap: { width: 280 },
                align: 'center'
            }).setOrigin(0.5)
            this.retryDialogHint = nextDialogSprite.create(this, 650, 620)
            
            return
        }

        this.opcionElegida = true;
        if (this.selectedOption === 1) {
            this.character.setTexture('PabloAnaEnfadados').setScale(1.2)
            this.mostrarRecompensa('Parece que ana quiere cigarros desesperadamente...')
            return
        }
    }

    cerrarMensajeCubatita() {
        this.waitingForRetry = false
        this.opcionElegida = false

        if (this.cubatitaBubble) {
            this.cubatitaBubble.destroy()
            this.cubatitaBubble = null
        }

        if (this.cubatitaTexto) {
            this.cubatitaTexto.destroy()
            this.cubatitaTexto = null
        }

        if (this.retryDialogHint) {
            this.retryDialogHint.destroy()
            this.retryDialogHint = null
        }
    }

    mostrarRecompensa = (mensaje) => {
        this.opcion1.destroy()
        this.opcion2.destroy()
        this.opcion1Bubble.destroy()
        this.opcion2Bubble.destroy()
        this.optionBubbles = []
        this.character2.destroy();

        const bubble = this.add.rectangle(350, 350, 300, 110, 0xffffff)
        bubble.setStrokeStyle(4, 0x000000)

        this.add.text(350, 350, mensaje, {
            fontFamily: '"PixelAE-Regular", monospace',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 280 }, 
            border: 4
        }).setOrigin(0.5)

        this.time.delayedCall(2000, () => {
            this.cubatita.setTexture('cubatitaSit').setScale(0.8);
            const continuar = this.add.text(350, 430, 'Presiona espacio para continuar', {
                fontFamily: '"PixelAE-Bold", monospace',
                fontSize: '20px',
                color: '#ff028d'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true })
            this.cubatita.setTexture('cubatitaSit').setScale(0.8)
            this.input.keyboard.once('keydown-SPACE', () => {
                    this.scene.launch('phone');
                    this.scene.stop(this.scene.key);
            })
        })
    }
}
