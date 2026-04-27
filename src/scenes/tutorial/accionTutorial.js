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
        this.contextTutorialBubble = null;
        this.contextTutorial = null;
        this.contextTutorialComplete = false;
        this.selectTutorialBubble = null;
        this.selectTutorial = null;
        this.selectTutorialComplete = false;
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
        this.contextTutorialBubble = this.add.rectangle(325, 450, 500, 150, 0x00C4FF)
        this.contextTutorialBubble.setStrokeStyle(3, 0X000000)
        this.contextTutorial = dialogTextSprite.create(this, 325, 450, [
            'Nos econtramos en la escena de accion, donde el objetivo es conseguir recursos para sobrevivir en el dia a dia.',
            'Primero nos presentan con el contexto de la escena, donde nos dan pistas sobre los objetos que nos podemos encontrar.', 'Dale al espacio cuando acabes de leer para continuar.'
        ], {
            fontFamily: '"PixelAE-Regular", monospace',
            fontSize: '16px', 
            fill: '#000000',
            wordWrap: { width: 480 },
            align: 'center'
        })

        
        this.contextTutorial.once('complete', () => {
            this.contextTutorialComplete = true;
        })

        this.contexto.once('complete', () => {
            this.contextComplete = true;
            this.nextDialogHint = nextDialogSprite.create(this, 550, 300)
        })
    }

    update(){
        
        if(this.contextTutorialComplete && Phaser.Input.Keyboard.JustDown(this.keySpace)){
            this.contextTutorial.destroy()
            this.contextTutorialBubble.destroy()
            this.contextTutorialComplete = false; // Para evitar que se vuelva a entrar en este bloque
            return 
        }
        if (this.selectTutorialComplete && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.selectTutorial.destroy()
            this.selectTutorialBubble.destroy()
            this.selectTutorialComplete = false; // Para evitar que se vuelva a entrar en este bloque
            return
        }
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
        this.opcion1 = this.add.text(650, 320, 'Recoger dinero del suelo (+2€)', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive()

        this.opcion2Bubble = this.add.rectangle(650, 380, 360, 60, 0Xe76d2c)
        this.opcion2Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion2 = this.add.text(650, 380, 'Buscar en la basura (+1 yanotekomo)', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive()

        this.selectTutorialBubble = this.add.rectangle(325, 500, 500, 150, 0x00C4FF)
        this.selectTutorialBubble.setStrokeStyle(3, 0X000000)
        this.selectTutorial = dialogTextSprite.create(this, 325, 500, [
            'Aqui tienes las opciones que puedes elegir, se navegan con las teclas W y S y seleccionas con la tecla E.',
            'Una vez elegida la opción, puedes ver los diferentes objetos que tienes en el inventario, que se encuentra pulsando la tecla I. ¡Elige la que más te guste!'
        ], {
            fontFamily: '"PixelAE-Regular", monospace',
            fontSize: '16px', 
            fill: '#000000',
            wordWrap: { width: 480 },
            align: 'center'
        })

        this.optionBubbles = [this.opcion1Bubble, this.opcion2Bubble]
        this.actualizarSeleccionVisual()
        
        this.selectTutorial.once('complete', () => {
            this.selectTutorialComplete = true;
        })
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
            addMoney(this, 2)
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
                    this.scene.start('phone-tutorial')
            })
        })
    }
}
