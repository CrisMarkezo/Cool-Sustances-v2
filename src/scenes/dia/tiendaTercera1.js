import Phaser from 'phaser'
import InventorySprite from '../../game-objects/inventorySprite.js'
import RuedaSprite from '../../game-objects/ruedaSprite.js'
import dialogTextSprite from '../../game-objects/dialogTextSprite.js'
import nextDialogSprite from '../../game-objects/nextDialogSprite.js'
import { addMoney, createMoneyHud, trySpendMoney } from '../../utils/money.js'

export default class TiendaTercera1 extends Phaser.Scene {
    constructor(){
        super({key: 'tienda-tercera-1'});

        // Game state
        this.contextComplete = false;
        this.opcionesVisibles = false;
        this.opcionElegida = false;
        this.opcion1 = null;
        this.opcion2 = null;
        this.opcion3 = null;
        this.opcion4 = null;
        this.opcion1Bubble = null;
        this.opcion2Bubble = null;
        this.opcion3Bubble = null;
        this.opcion4Bubble = null;
        this.nextDialogHint = null;
        this.selectedOption = 0;
        this.optionBubbles = [];

        // Keyboard keys
        this.keyUp = null;
        this.keyDown = null;
        this.keyR = null;
        this.keyE = null;
        this.keyA = null;
        this.keyB = null;
        this.keyC = null;
        this.keyD = null;
     
        this.keySpace = null;
        this.keyQ = null;

        this.hao = null
        this.pico = null

    }

    create(){

        const bgImg = this.add.image(500, 350, 'tienda_dia');
        //const player = this.add.image(200, 500, 'cubatita');
        RuedaSprite.create(this, 920, 85, 'rueda_tienda')  
        const icon = this.add.image(920, 85, 'tiendaIcon')
        this.hao = this.add.image(400, 190, 'haoNeutro')
        this.add.text(670, 77, 'TUTORIAL: Tienda', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '25px',
            color: '#ffffff'
        }).setOrigin(0.5)
        this.add.text(700, 110, 'POR LA TIENDA CUBATITA', {
            fontFamily: '"ToonwayEmpty", sans-serif',
            fontSize: '20px',
            color: '#ffe2f9'
        }).setOrigin(0.5)
        createMoneyHud(this)


        //keyboard keys set up
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        const settingsBtn = this.add.image(20, 670, 'settings').setInteractive().setScale(0.7);
        const inventoryBtn = InventorySprite.create(this, 50, 60)

        //contexto
        this.mostrarContexto([
            '你好咪咪，',
            '欢迎来到我的商店，我这里应有尽有',
            '我可是很多能祝你度过此夜，你想要什么?',
            '(Hola, Bienvenido a mi tienda! Aquí tenemos de todo para ayudarte a pasar la noche. ¿Qué te gustaría comprar?)'
        ])

        
    }

    update(){
        // Show options when space is pressed (after hint is shown)
        if (this.contextComplete && !this.opcionesVisibles && this.nextDialogHint && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.mostrarOpciones();
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
        if (this.opcionesVisibles && !this.opcionElegida) {
            if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {
                this.moverSeleccion(-1)
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {
                this.moverSeleccion(1)
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                this.confirmarSeleccion()
            }
        }
    }

    mostrarContexto(texto) {
        this.contextComplete = false;
        this.opcionesVisibles = false;
        this.opcionElegida = false;

        if (this.contexto) {
            this.contexto.destroy();
        }
        if (this.contextoBubble) {
            this.contextoBubble.destroy();
        }
        if (this.nextDialogHint) {
            this.nextDialogHint.destroy();
            this.nextDialogHint = null;
        }
        if (this.opcion1) this.opcion1.destroy();
        if (this.opcion2) this.opcion2.destroy();
        if (this.opcion3) this.opcion3.destroy();
        if (this.opcion4) this.opcion4.destroy();
        if (this.opcion1Bubble) this.opcion1Bubble.destroy();
        if (this.opcion2Bubble) this.opcion2Bubble.destroy();
        if (this.opcion3Bubble) this.opcion3Bubble.destroy();
        if (this.opcion4Bubble) this.opcion4Bubble.destroy();
        if (this.pico) this.pico.destroy();

        this.pico = this.add.triangle(400, 300, 0, 25, 50, 25, 25, 0, 0x69AAEC)
        this.pico.setStrokeStyle(3, 0xE2007C)
        this.contextoBubble = this.add.ellipse(375, 400, 500, 200, 0x69AAEC)
        this.contextoBubble.setStrokeStyle(3, 0xE2007C)
        this.contexto = dialogTextSprite.create(this, 375, 400, texto, {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff',
            wordWrap: { width: 460 },
            align: 'center'
        })

        this.contexto.once('complete', () => {
            this.contextComplete = true;
            this.nextDialogHint = nextDialogSprite.create(this, 375, 470)
        })
    }
    
    mostrarOpciones() {
        this.contexto.destroy()
        this.contextoBubble.destroy()
        if(this.pico) this.pico.destroy()
        if (this.nextDialogHint) {
            this.nextDialogHint.destroy()
            this.nextDialogHint = null
        }

        this.opcionesVisibles = true;
        this.selectedOption = 0;
        this.opcion1Bubble = this.add.rectangle(650, 500, 560, 60, 0x6969ec)
        this.opcion1Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion1 = this.add.text(650, 500, 'Comprar filtros (2€)', { 
            fontFamily: '"Keneric", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5);
        this.opcion2Bubble = this.add.rectangle(650, 550, 560, 60, 0x6969ec)
        this.opcion2Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion2 = this.add.text(650, 550, 'Comprar litrona (1€)', { 
            fontFamily: '"Keneric", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.opcion3Bubble = this.add.rectangle(650, 600, 560, 60, 0x6969ec)
        this.opcion3Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion3 = this.add.text(650, 600, 'Dar yanotekomo (+1€)', {
            fontFamily: '"Keneric", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5);
        this.opcion4Bubble = this.add.rectangle(650, 650, 560, 60, 0x6969ec)
        this.opcion4Bubble.setStrokeStyle(3, 0x000000).setInteractive({ useHandCursor: true })
        this.opcion4 = this.add.text(650, 650, 'Salir de la tienda', { 
            fontFamily: '"Keneric", sans-serif',
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5);

        this.optionBubbles = [this.opcion1Bubble, this.opcion2Bubble, this.opcion3Bubble, this.opcion4Bubble];
        this.actualizarSeleccionVisual();
    }

    moverSeleccion(direction) {
        if (!this.optionBubbles.length) return;

        const total = this.optionBubbles.length;
        this.selectedOption = (this.selectedOption + direction + total) % total;
        this.actualizarSeleccionVisual();
    }

    actualizarSeleccionVisual() {
        this.optionBubbles.forEach((bubble, index) => {
            const isSelected = index === this.selectedOption;
            bubble.setFillStyle(isSelected ? 0x2f2f8f : 0x6969ec);
            bubble.setStrokeStyle(isSelected ? 5 : 3, isSelected ? 0xffde59 : 0x000000);
        });
    }

    confirmarSeleccion() {
        if (this.selectedOption === 0) {
            if (trySpendMoney(this, 2)) {
                this.opcionElegida = true
                this.hao.setTexture('haoFeliz')
                this.mostrarRecompensa('¡Has comprado filtros (-2€)!')
            } else {
                this.hao.setTexture('haoEnfadado')
                this.mostrarContexto([
                    '看来你买滤镜的钱不够.', '快去赚点钱，这样才能买到它们',
                    'Parece que no tienes suficiente dinero para comprar los filtros. ¡Consigue más dinero para poder comprarlos!'
                ])
            }
            return;
        }

        if (this.selectedOption === 1) {
            if (trySpendMoney(this, 1)) {
                this.opcionElegida = true
                this.hao.setTexture('haoFeliz')
                this.mostrarRecompensa('¡Has comprado una litrona (-1€)!')
            } else {
                this.hao.setTexture('haoEnfadado')
                this.mostrarContexto([
                    '看来你买滤镜的钱不够.', '快去赚点钱，这样才能买到它们',
                    'Parece que no tienes suficiente dinero para comprar los filtros. ¡Consigue más dinero para poder comprarlos!'
                ])
            }
            return;
        }

        if (this.selectedOption === 2) {
            this.opcionElegida = true
            this.hao.setTexture('haoHorny').setScale(0.9)
            this.mostrarRecompensa('¡Has conseguido 1€ (+1€)!')
            addMoney(this, 1)
            return;
        }

        this.opcionElegida = true
        this.hao.setTexture('haoTriste')
        this.mostrarRecompensa('¡Has salido de la tienda sin comprar nada!')
    }

    mostrarRecompensa = (mensaje) => {
            this.opcion1.destroy()
            this.opcion2.destroy()
            this.opcion3.destroy()
            this.opcion4.destroy()
            this.opcion1Bubble.destroy()
            this.opcion2Bubble.destroy()
            this.opcion3Bubble.destroy()
            this.opcion4Bubble.destroy()
            this.optionBubbles = []

            const bubble = this.add.rectangle(600, 580, 580, 110, 0xffffff)
            bubble.setStrokeStyle(4, 0x000000)

            this.add.text(600, 580, mensaje, {
                fontFamily: '"PixelAE-Regular", monospace',
                fontSize: '28px',
                color: '#000000',
                align: 'center'
            }).setOrigin(0.5)

            this.time.delayedCall(2000, () => {
                const continuar = this.add.text(600, 660, 'Presiona espacio para continuar', {
                    fontFamily: '"PixelAE-Bold", monospace',
                    fontSize: '20px',
                    color: '#0080ff'
                }).setOrigin(0.5).setInteractive({ useHandCursor: true })

                this.input.keyboard.once('keydown-SPACE', () => {
                    this.scene.start('phone-tutorial')
                })
            })
        }
}