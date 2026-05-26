import Phaser from 'phaser';
import Player from '../game-objects/night/player.js';
import Scratcher from '../scratcher.js';
import Phone from '../Phone.js';
import Monster from '../game-objects/night/monster.js';
import PowerUp from '../game-objects/powerups/powerup.js';
import Boss from '../game-objects/night/boss.js';
import Kebab from '../game-objects/powerups/kebab.js';

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'level' });
    }

    create() {
        const map = this.make.tilemap({ key: 'tutorial' });
        const muebles4 = map.addTilesetImage('Muebles4', 'Muebles4');
        const muebles6 = map.addTilesetImage('Muebles6', 'Muebles6');
        const paredes = map.addTilesetImage('Paredes y suelos', 'Paredes y suelos');
        const objetos = map.addTilesetImage('Objetos pequeños', 'Objetos pequeños');

        map.createLayer('Capa de patrones 1', paredes, 0, 0);
        map.createLayer('Paredes', paredes, 0, 0);
        map.createLayer('Capa de patrones 3', muebles4, 0, 0);
        map.createLayer('Capa de patrones 4', muebles6, 0, 0);
        map.createLayer('cama', muebles4, 0, 0);
        map.createLayer('planta', objetos, 0, 0);

        this.colisiones = map.createLayer('colisiones', paredes, 0, 0);
        this.colisiones.setCollisionByExclusion([-1]);

        const startX = map.widthInPixels / 2;
        const startY = map.heightInPixels / 2;

        this.player = new Player(this, startX, startY);
        this.rascador = new Scratcher(this, startX + 210, startY);

        this.interactables = this.physics.add.group();

        this.physics.add.collider(this.player, this.colisiones);
    
        this.physics.add.overlap(this.player.attackHitbox, this.rascador.hurtbox, () => {
            this.hitRascador(this.player.attackHitbox, this.rascador);
        }, null, this);

        this.physics.add.overlap(
            this.player,
            this.powerUps,
            this.handlePowerUpPickup,
            null,
            this
        );

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(4);

        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.inventoryOpen = false;

        this.inventoryUI = this.add.image(this.player.x, this.player.y, 'Inventory');
        this.inventoryUI.setDepth(2100);
        this.inventoryUI.setVisible(false);
        this.inventoryUI.setScale(0.2);

        this.inventoryItems = this.add.group();

        this.tutorialText = this.add.text(
            0,
            0,
            'WASD: moverse | ESPACIO: atacar\nE: interactuar | Golpea el rascador',
                {
                fontFamily: '"Toonway", sans-serif',
                fontSize: '8px',                  // Mantiene el tamaño pequeño porque tu cámara tiene zoom (x4)
                color: '#ffffff',                 // Blanco como el inventario
                align: 'center',
                stroke: '#000000',                // Contorno negro
                strokeThickness: 3,               // Grosor del contorno adaptado al tamaño de la fuente
                resolution: 4                     // Mayor resolución para que los bordes pixelados se vean ultra definidos
            }
        );

        this.tutorialText.setOrigin(0.5, 1);
        this.tutorialText.setDepth(3000);

        this.isGameOver = false;

        this.gameOverImage = this.add.image(this.player.x, this.player.y, 'gameover');
        this.gameOverImage.setDepth(99999);
        this.gameOverImage.setVisible(false);
        this.gameOverImage.setScale(0.23);

        this.comic = this.add.image(this.player.x, this.player.y, 'comic_2');
        this.comic.setDepth(99999);
        this.comic.setVisible(false);
        this.comic.setScale(0.2);

        // PUERTA
        const doorX = startX + 192;
        const doorY = startY - 55;

        this.doorVisual = this.add.rectangle(doorX, doorY, 25, 45, 0x000000);

        //ÚNICA HITBOX AZUL (Solo para colisión de cambio de escena)
        
        this.doorZone = this.add.rectangle(doorX, doorY - 12, 12, 15, 0x0000ff, 0); 
        this.physics.add.existing(this.doorZone, true);

        this.physics.add.overlap(this.player, this.doorZone, () => {
            if (this.playerHasItem() && !this.isGameOver) {
                this.triggerMenu();
                this.time.delayedCall(5000, () => {
                this.scene.start('MenuTutorial');
            }) 
            }
        }, null, this);
    }

    update() {
        const cam = this.cameras.main;

        if (!this.isGameOver && this.player.health <= 0) {
            this.triggerGameOver();
        }

        if (this.isGameOver) {
            this.gameOverImage.setPosition(cam.worldView.centerX, cam.worldView.centerY);
            return;
        }

        // CONFIGURACIÓN DEL RECTÁNGULO ROJO 
        const offsetY = 34;
        const width = 30;
        const height = 50;

        // DEBUG VISUAL ROJO (Mantenido según tu petición)
        if (!this.debugRect) {
            this.debugRect = this.add.rectangle(
                this.doorZone.x,
                this.doorVisual.y + offsetY, // Usamos doorVisual como referencia base
                width,
                height,
                0xff0000,
                0
            );
        } else {
            this.debugRect.setPosition(this.doorZone.x, this.doorVisual.y + offsetY);
        }

        if (this.playerHasItem() && this.colisiones) {
            const tileStartX = this.colisiones.worldToTileX(this.doorZone.x - width / 2);
            const tileEndX = this.colisiones.worldToTileX(this.doorZone.x + width / 2);

            const tileStartY = this.colisiones.worldToTileY(this.doorVisual.y + offsetY - height / 2);
            const tileEndY = this.colisiones.worldToTileY(this.doorVisual.y + offsetY + height / 2);

            for (let x = tileStartX; x <= tileEndX; x++) {
                for (let y = tileStartY; y <= tileEndY; y++) {
                    const tile = this.colisiones.getTileAt(x, y);
                    if (tile && tile.collides) {
                        tile.setCollision(false, false, false, false);
                    }
                }
            }
        }

        if (this.tutorialText) {
            this.tutorialText.setPosition(
                cam.worldView.centerX,
                cam.worldView.bottom - 5
            );
        }

        // if (Phaser.Input.Keyboard.JustDown(this.keyI)) {
        //     this.inventoryOpen = !this.inventoryOpen;
        //     this.inventoryUI.setVisible(this.inventoryOpen);

        //     if (this.inventoryOpen) {
        //         this.physics.pause();
        //         this.player.body.setVelocity(0);
        //         this.inventoryUI.setPosition(cam.worldView.centerX, cam.worldView.centerY);
        //         this.renderInventory(this.inventoryUI.x - 30, this.inventoryUI.y - 20);
        //         if (this.tutorialText) this.tutorialText.setVisible(false);
        //     } else {
        //         this.physics.resume();
        //         this.inventoryItems.clear(true, true);
        //         if (this.tutorialText) this.tutorialText.setVisible(true);
        //     }
        // }

        if (this.inventoryOpen) return;


        this.player.nearbyInteractable = null;

        this.physics.overlap(this.player, this.interactables, (player, obj) => {
            player.nearbyInteractable = obj;
        });
    }

    playerHasItem() {
        const inv = this.player.inventory.slots;

        for (let i = 0; i < inv.length; i++) {
            for (let j = 0; j < inv[i].length; j++) {
                if (inv[i][j]) return true;
            }
        }

        return false;
    }

    triggerGameOver() {
        this.isGameOver = true;
        this.physics.pause();
        this.player.body.setVelocity(0, 0);
        this.gameOverImage.setVisible(true);
        this.gameOverImage.setPosition(
            this.cameras.main.worldView.centerX,
            this.cameras.main.worldView.centerY
        );

    }

    triggerMenu() {
        this.scene.start('phone-tutorial');

    }

    renderInventory(firstX, firstY) {
        this.inventoryItems.clear(true, true);
        const inv = this.player.inventory.slots;
        const cols = this.player.inventory.cols;
        const rows = this.player.inventory.rows;
        const slotSpacing = 15;
        const itemVisualSize = 12;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const item = inv[i][j];
                if (item) {
                    const x = firstX + (j * slotSpacing);
                    const y = firstY + (i * slotSpacing);
                    const icon = this.add.image(x, y, item.texture.key || item.texture);
                    icon.setDepth(2200);
                    icon.setDisplaySize(itemVisualSize, itemVisualSize);
                    this.inventoryItems.add(icon);
                }
            }

            const icon = this.add.image(x, y, textureKey);

            icon.setScrollFactor(0);
            icon.setDepth(2200);
            icon.setDisplaySize(itemVisualSize, itemVisualSize);

            this.inventoryItems.add(icon);
        }
    }

    hitRascador(hitbox, rascador) {
        if (!rascador.isScratching) {
            rascador.scratch();
            hitbox.body.enable = false;

            if (this.tutorialText) {
                this.tutorialText.destroy();
                this.tutorialText = null;
            }
        }
    }

    hitMonster(hitbox, monster) {
        if (this.player.isAttacking && monster.canBeHit && hitbox.body.enable) {
            monster.receiveHit(this.player);
            hitbox.body.enable = false;
        }
    }

    handlePlayerMonsterContact(player, monster) {}

}