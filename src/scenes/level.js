import Phaser from 'phaser';
import Player from '../player.js';
import Scratcher from '../Scratcher.js';
import Phone from '../Phone.js';
import Monster from '../Monster.js';

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
        this.monster = new Monster(this, startX - 100, startY, 'monster');
       
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

        this.physics.add.overlap(
            this.player.attackHitbox,
            this.rascador.hurtbox, 
            () => {
                this.hitRascador(this.player.attackHitbox, this.rascador);
            },
            null,
            this
        );

        this.physics.add.overlap(
            this.player.attackHitbox,
            this.monster,
            this.hitMonster,
            null,
            this
        );

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setZoom(5);
        this.cameras.main.centerOn(this.player.x, this.player.y);

        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.inventoryOpen = false;

        this.inventoryUI = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Inventory'
        );

        this.inventoryUI.setScrollFactor(0);
        this.inventoryUI.setDepth(2100);
        this.inventoryUI.setVisible(false);
        this.inventoryUI.setScale(6.4 / this.cameras.main.zoom);

        this.inventoryItems = this.add.group();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
            this.scene.start('phone-tutorial');
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyI)) {
            this.inventoryOpen = !this.inventoryOpen;
            this.inventoryUI.setVisible(this.inventoryOpen);

            if (this.inventoryOpen) {
                this.physics.pause();
                this.player.setVelocity(0);
                this.cameras.main.stopFollow();

                this.cameras.main.setZoom(1);

                const uiScale = this.inventoryUI.scaleX;
                const uiWidth = this.inventoryUI.width * uiScale;
                const uiHeight = this.inventoryUI.height * uiScale;

                const paddingX = 60; 
                const paddingY = 60; 

                const firstSlotX = this.inventoryUI.x - (uiWidth / 2) + paddingX;
                const firstSlotY = this.inventoryUI.y - (uiHeight / 2) + paddingY;

                this.renderInventory(firstSlotX, firstSlotY);
            } else {
                this.physics.resume();
                this.cameras.main.setZoom(5);
                this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

                this.inventoryItems.clear(true, true);
            }
        }

        if (this.inventoryOpen) {
            return;
        }

        this.monster.update(this.player);

        this.player.nearbyInteractable = null;

        this.physics.overlap(
            this.player,
            this.interactables,
            (player, obj) => {
                player.nearbyInteractable = obj;
            }
        );
    }

    renderInventory(firstX, firstY) {
        this.inventoryItems.clear(true, true);

        const inv = this.player.inventory.slots;
        const cols = this.player.inventory.cols;
        const rows = this.player.inventory.rows;

        const slotSpacing = 85;    
        const itemVisualSize = 64; 

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const item = inv[i][j];

                if (item) {
                    const x = firstX + (j * slotSpacing);
                    const y = firstY + (i * slotSpacing); 

                    const textureKey = item.texture.key || item.texture;
                    const icon = this.add.image(x, y, textureKey);

                    icon.setScrollFactor(0);
                    icon.setDepth(2200);
                    
                    icon.setDisplaySize(itemVisualSize, itemVisualSize);

                    this.inventoryItems.add(icon);
                }
            }
        }
    }

    hitRascador(hitbox, rascador) {
        if (!rascador.isScratching) {
            rascador.scratch();
            hitbox.body.enable = false; 
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