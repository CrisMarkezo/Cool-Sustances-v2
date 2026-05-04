import Phaser from 'phaser'
import InventorySprite from '../../game-objects/inventorySprite.js'
import RuedaSprite from '../../game-objects/ruedaSprite.js'
import dialogTextSprite from '../../game-objects/dialogTextSprite.js';
import nextDialogSprite from '../../game-objects/nextDialogSprite.js';
import IconSprite from '../../game-objects/iconSprite.js'

export default class DialogoSegundo1 extends Phaser.Scene {
    constructor(){
        super({key: 'dialogo-segunda-1'})
        // Game state
        this.contextComplete = false;
        this.opcionesVisibles = false;
        this.opcionElegida = 0;
        this.opcion1 = null;
        this.opcion2 = null;
        this.opcion1Bubble = null;
        this.opcion2Bubble = null;
        this.respuestaBubble = null;
        this.respuesta = null;
        this.nextDialogHint = null;
        this.selectedOption = 0;
        this.optionBubbles = [];

        // Keyboard keys
        this.keyA = null;
        this.keyB = null;
        this.keySpace = null;
        this.keyR = null;
        this.keyW = null;
        this.keyE = null;
        this.keyQ = null;
        this.keyS = null;
        this.keyEnter = null;

        this.character = null;
        this.contexto = null;
        this.contextoBubble = null;
        this.pico = null;
    }

    create(){
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //IU setup
        this.add.image(500, 350, 'dia');
        RuedaSprite.create(this, 920, 85, 'rueda')
        IconSprite.create(this, 920, 85, 'dialogo', 1200)
        this.add.text(670, 75, 'Dialogo', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5)
        this.add.text(700, 110, 'POR LA TARDE CUBATITA', {
            fontFamily: '"ToonwayEmpty", sans-serif',
            fontSize: '20px',
            color: '#ffe2f9'
        }).setOrigin(0.5)
        //this.add.image(200, 500, 'cubatita');
        this.character = this.add.image(700, 500, 'laliNeutro').setScale(1.2);

        //Buttons
        const settingsBtn = this.add.image(20, 670, 'settings').setInteractive().setScale(0.7);
        const inventoryBtn = InventorySprite.create(this, 50, 60)

        //Contexto
        this.contextoBubble = this.add.rectangle(325, 250, 500, 150, 0xC8006E)
        this.contextoBubble.setStrokeStyle(3, 0Xe76d2c)
        this.contexto = dialogTextSprite.create(this, 325, 250, [
            'Después de asustarte por la reacción del chaval decides ir hacía la entrada principal, donde te quedas mirando a la gente pasar, hasta que ves a una chico que te llama la atención. Decides acercarte a hablar con el.'
        ], {       
            fontFamily: '"Toonway", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 500 },
            align: 'center'
        });

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
        // Settings menu
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.add.image(20, 670, 'settings2').setScale(0.7);
            this.scene.pause();
            this.scene.launch('settings', { from: this.scene.key });
            this.scene.bringToTop('settings');
        }
        // Inventory menu
        if (Phaser.Input.Keyboard.JustDown(this.keyQ)){
            this.scene.pause()
            this.scene.launch('inventory', { from: this.scene.key })
            this.scene.bringToTop('inventory')
        }

        if (this.opcionesVisibles && this.opcionElegida == 0) {
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
        if (this.opcionElegida == 1 && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.respuesta.destroy()
            this.respuestaBubble.destroy()
            if (this.nextDialogHint) {
                this.nextDialogHint.destroy()
            }
            this.mostrarRecompensa('¡Has conseguido más velocidad!')
            this.opcionElegida = 0; // Reset to prevent multiple triggers
        }
        if (this.opcionElegida == 2 && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.respuesta.destroy()
            this.respuestaBubble.destroy()
            if (this.nextDialogHint) {
                this.nextDialogHint.destroy()
            }
            this.mostrarRecompensa('¡Has conseguido más información!')
            this.opcionElegida = 0; // Reset to prevent multiple triggers
        }

    }

    mostrarOpciones() {
        this.contexto.destroy()
        this.contextoBubble.destroy()
        if (this.nextDialogHint) {
            this.nextDialogHint.destroy()
            this.nextDialogHint = null
        }
        this.opcion1Bubble = this.add.rectangle(400, 350, 360, 60, 0Xe76d2c)
        this.opcion1Bubble.setStrokeStyle(3, 0x1F2A44).setInteractive({ useHandCursor: true })
        this.opcion1 = this.add.text(400, 350, 'Intentar coger el objeto de su mano', { 
            fontFamily: '"Keneric", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff', 
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.opcion2Bubble = this.add.rectangle(400, 400, 360, 60, 0Xe76d2c)
        this.opcion2 = this.add.text(400, 400, 'Dejar que te acaricie y escucharle', { 
            fontFamily: '"Keneric", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.opcionesVisibles = true;
        this.opcionElegida = 0;
        this.selectedOption = 0;
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
            bubble.setStrokeStyle(isSelected ? 5 : 3, isSelected ? 0xffde59 : 0x1F2A44)
        })
    }

    confirmarSeleccion() {
        if (this.selectedOption === 0) {
            this.opcionElegida = 1
            this.opcion1.destroy()
            this.opcion2.destroy()
            this.opcion1Bubble.destroy()
            this.opcion2Bubble.destroy()
            this.optionBubbles = []
            this.character.setTexture('laliEnfadada').setScale(1.2)
            this.pico = this.add.triangle(480, 500, 0, 0, 50, 0, 25, 0, 0xdaff8f)
            this.pico.setStrokeStyle(4, 0x000000)
            this.respuestaBubble = this.add.ellipse(400, 300, 300, 150, 0xdaff8f)
            this.respuestaBubble.setStrokeStyle(4, 0x000000).setInteractive({ useHandCursor: true })
            this.respuesta = dialogTextSprite.create(this, 400, 300, ['Pero porque quieres tanto esta monster? toma un euro si eso ya te comrpas tu una no te jode'], {
                fontFamily: '"Toonway", monospace',
                fontSize: '28px',
                color: '#000000',
                wordWrap: { width: 280 },
                align: 'center'
            })
            this.respuesta.once('complete', () => {
                this.contextComplete = true;
                this.nextDialogHint = nextDialogSprite.create(this, 400, 320)
            })
            return
        }

        this.opcionElegida = 2
        this.opcion1.destroy()
        this.opcion2.destroy()
        this.opcion1Bubble.destroy()
        this.opcion2Bubble.destroy()
        this.optionBubbles = []
        this.character.setTexture('laliFeliz').setScale(1.2)
        this.pico = this.add.triangle(480, 500, 0, 0, 50, 0, 25, 0, 0xdaff8f)
        this.pico.setStrokeStyle(4, 0x000000)
        this.respuestaBubble = this.add.ellipse(400, 300, 500, 300, 0xdaff8f)
        this.respuestaBubble.setStrokeStyle(4, 0x000000).setInteractive({ useHandCursor: true })
        this.respuesta = dialogTextSprite.create(this, 400, 300, ['Seguro que le caerias bien a Iker un tío que fuma una cosa que huele MUY bien en techito... a bueno que digo seguro que a mi novia Albani te intentaría raptar de lo mono que eres... es una chica que siempre esta bebiendo vodka. '], {
            fontFamily: '"Toonway", monospace',
            fontSize: '28px',
            color: '#000000',
            wordWrap: { width: 340 },
            align: 'center'
        })
        this.respuesta.once('complete', () => {
            this.contextComplete = true;
            this.nextDialogHint = nextDialogSprite.create(this, 450, 320)
        })
    }

    mostrarRecompensa = (mensaje) => {
            if (this.respuestaBubble) {
                this.respuestaBubble.destroy()
            }
            if (this.respuesta) {
                this.respuesta.destroy()
            }

            const bubble = this.add.rectangle(500, 580, 300, 110, 0xffffff)
            bubble.setStrokeStyle(4, 0x000000)

            this.add.text(500, 580, mensaje, {
                fontFamily: '"PixelAE-Regular", monospace',
                fontSize: '28px',
                color: '#000000',
                wordWrap: { width: 280 },
                align: 'center'
            }).setOrigin(0.5)
            this.character.setTexture('laliTriste').setScale(0.95)
            this.pico = this.add.triangle(480, 400, 0, 0, 50, 0, 25, 0, 0xdaff8f)
            this.pico.setStrokeStyle(4, 0x000000)
            const dialogoFinalBubble = this.add.ellipse(400, 300, 320, 150, 0xdaff8f)
            dialogoFinalBubble.setStrokeStyle(4, 0x000000)
            const dialogoFinal = dialogTextSprite.create(this, 400, 300, ['Bueno me voy a la cafeteria gatito, mi nombre es turras encantado! Estaremos por Moncloa espero verte ahí!'], {
                fontFamily: '"Toonway", sans-serif',
                fontSize: '25px',
                color: '#000000',
                wordWrap: { width: 320 },
                align: 'center'
            })
            this.time.delayedCall(2000, () => {
                const continuar = this.add.text(500, 660, 'Presiona enter para continuar', {
                    fontFamily: '"PixelAE-Bold", monospace',
                    fontSize: '20px',
                    color: '#C8006E'
                }).setOrigin(0.5).setInteractive()

                this.input.keyboard.once('keydown-SPACE', () => {
                    this.scene.start('phone')
                })
            })
        }
}