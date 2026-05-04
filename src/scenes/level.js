import Phaser from 'phaser';
import Player from '../game-objects/night/player.js';
import Scratcher from '../scratcher.js';
import Phone from '../Phone.js';
import Monster from '../game-objects/night/monster.js';
import PowerUp from '../game-objects/powerups/powerup.js';

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

        const colisiones = map.createLayer('colisiones', paredes, 0, 0);
        colisiones.setCollisionByExclusion([-1]);

        const startX = map.widthInPixels / 2;
        const startY = map.heightInPixels / 2;

        this.player = new Player(this, startX, startY);
        this.monster = new Monster(this, startX - 100, startY, 'boss');
        this.rascador = new Scratcher(this, startX + 210, startY);
        this.phone = new Phone(this, startX + 100, startY);
        this.phone.setScale(0.5);
        this.phone2 = new Phone(this, startX + 130, startY);
        this.phone2.setScale(0.5);

        this.interactables = this.physics.add.group();
        this.interactables.add(this.phone);
        this.interactables.add(this.phone2);

        this.physics.add.collider(this.player, colisiones);
        this.physics.add.collider(this.monster, colisiones);
        this.physics.add.overlap(this.player, this.monster, this.handlePlayerMonsterContact, null, this);

        this.physics.add.overlap(this.player.attackHitbox, this.rascador.hurtbox, () => {
            this.hitRascador(this.player.attackHitbox, this.rascador);
        }, null, this);

        this.physics.add.overlap(this.player.attackHitbox, this.monster, this.hitMonster, null, this);

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
        this.cameras.main.setZoom(5);

        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.inventoryOpen = false;

        this.inventoryUI = this.add.image(this.player.x, this.player.y, 'Inventory');
        this.inventoryUI.setDepth(2100);
        this.inventoryUI.setVisible(false);
        this.inventoryUI.setScale(0.2);

        this.inventoryItems = this.add.group();

        // 🪧 TUTORIAL
        this.tutorialText = this.add.text(
            0,
            0,
            'WASD: moverse | ESPACIO: atacar\nE: interactuar | Golpea el rascador',
            {
                fontFamily: 'Arial',
                fontSize: 'px',
                color: '#f5e6c8',
                align: 'center',
                backgroundColor: '#4b2e1a',
                padding: { x: 6, y: 4 },
                resolution: 2
            }
        );

        this.tutorialText.setOrigin(0.5, 0);
        this.tutorialText.setDepth(3000);

        this.isGameOver = false;

        this.gameOverImage = this.add.image(this.player.x, this.player.y, 'gameover');
        this.gameOverImage.setDepth(99999);
        this.gameOverImage.setVisible(false);
        this.gameOverImage.setScale(0.2);

        // =========================================================
        // 🚪 PUERTA (RECTÁNGULO NEGRO)
        // =========================================================
        this.hasRascadorItem = false; // 🔑 flag futuro

        const doorX = startX+192;
        const doorY = startY-55;

        this.doorZone = this.add.rectangle(doorX, doorY, 25, 45, 0x000000);
        this.physics.add.existing(this.doorZone, true);

        this.physics.add.overlap(this.player, this.doorZone, () => {
            if (this.hasRascadorItem && !this.isGameOver) {
                this.triggerGameOver(); // 🔴 ahora mismo: GAME OVER
                // futuro: this.scene.start('level2');
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

        if (this.tutorialText) {
            this.tutorialText.setPosition(this.player.x, this.player.y + 25);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyI)) {
            this.inventoryOpen = !this.inventoryOpen;
            this.inventoryUI.setVisible(this.inventoryOpen);

            if (this.inventoryOpen) {
                this.physics.pause();
                this.player.body.setVelocity(0);
                this.inventoryUI.setPosition(cam.worldView.centerX, cam.worldView.centerY);
                this.renderInventory(this.inventoryUI.x - 30, this.inventoryUI.y - 20);
                if (this.tutorialText) this.tutorialText.setVisible(false);
            } else {
                this.physics.resume();
                this.inventoryItems.clear(true, true);
                if (this.tutorialText) this.tutorialText.setVisible(true);
            }
        }

        if (this.inventoryOpen) return;

        this.monster.update(this.player);
        this.player.nearbyInteractable = null;

        this.physics.overlap(this.player, this.interactables, (player, obj) => {
            player.nearbyInteractable = obj;
        });
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

            // 🔑 SIMULA que obtiene el objeto del rascador
            this.hasRascadorItem = true;

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