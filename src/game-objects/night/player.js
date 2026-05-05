import Phaser from 'phaser';
import Inventory from '../../Inventory.js';
import GameEntity from './gameEntity.js';

export default class Player extends GameEntity {
    constructor(scene, x, y) {
        super(scene, x, y, 'cat_idle', 0);

        this.uiBarGraphics = null;

         // --- CONFIGURACIÓN FÍSICA (HITBOX) ---
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.setDepth(10);
        this.body.setDrag(1000);

        this.body.setSize(12, 12); // Cambia la hitbox 20,22
        this.body.setOffset(this.width / 2 - 6, this.height / 2 - 4);
        this.body.setMaxVelocity(400, 400);

        // Atributos y llaves guardadas
        const savedData = scene.registry.get('playerData');

        // --- ATRIBUTOS ---
        this.maxHealth = savedData ? savedData.maxHealth : 100;
        this.health = savedData ? savedData.health : 100;
        this.speed = savedData ? savedData.speed : 200;
        this.damage = savedData ? savedData.damage : 20;
        this.attackCooldown = savedData ? savedData.attackCooldown : 300;
        
        this.invincibilityDuration = 1500;
        this.damageKnockbackForce = 180;

        //Llaves
        this.llave_almacen = savedData ? savedData.llaves.almacen : false;
        this.llave_balcon = savedData ? savedData.llaves.balcon : false;
        this.llave_basura = savedData ? savedData.llaves.basura : false;
        this.llave_boss = savedData ? savedData.llaves.boss : false;

        // Si es la primera vez que lo creamos guardamos sus valores
        if(!savedData) this.savePlayerData();

        this.isAttacking = false;
        this.isGrabbing = false;
        this.isInvincible = false;
        this.isKnocked = false;
        this.isPushing = false;
        this.canAttack = true;

        // --- CONTROLES ---
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        this.inventory = scene.registry.get('inventory') || new Inventory(3, 3);
        scene.registry.set('inventory', this.inventory);
        scene.registry.set('health', this.health);
        scene.registry.set('damage', this.damage);
        scene.registry.set('speed', this.speed);
        scene.registry.set('attack_speed', 300 / this.attackCooldown);
        scene.registry.set('player', this);

        this.nearbyInteractable = null;

        // --- ATAQUE ---
        this.attackHitbox = scene.add.rectangle(this.x, this.y, 20, 20, 0xff0000);
        scene.physics.add.existing(this.attackHitbox);
        this.attackHitbox.body.setAllowGravity(false);
        this.attackHitbox.body.moves = false;
        this.attackHitbox.body.setSize(10, 12);
        this.attackHitbox.setVisible(false);
        this.attackHitbox.body.enable = false;

        this.attackSprite = scene.add.sprite(this.x, this.y, 'cat_attack');
        this.attackSprite.setVisible(false);
        this.attackSprite.setDepth(15);
        this.attackSprite.setScale(1);

        this.lockedOffsetX = 0;
        this.lockedOffsetY = 0;
        this.lastMoveX = 1;
        this.lastMoveY = 0;

       // --- CONFIGURACIÓN UI VIDA ---
        this.barX = 910; // Coordenada X en healthbar.png
        this.barY = 28;  // Coordenada Y en healthbar.png
        this.barWidth = 53;
        this.barHeight = 20;
        
        this.currentUiScale = 2; 

        this.lifeBarBg = scene.add.image(0, 0, 'healthbar');
        this.lifeBarBg.setOrigin(1, 0);
        this.lifeBarBg.setDepth(9998);
        this.lifeBarBg.setTint(0x000000);
        this.lifeBarBg.setAlpha(0.6);
        this.lifeBarBg.setCrop(this.barX, this.barY, this.barWidth, this.barHeight);
        this.lifeBarBg.setScale(this.currentUiScale);

        this.lifeBar = scene.add.image(0, 0, 'healthbar');
        this.lifeBar.setOrigin(1, 0);
        this.lifeBar.setDepth(9999);
        this.lifeBar.setScale(this.currentUiScale);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Logica del inventario
        if (Phaser.Input.Keyboard.JustDown(this.keyQ)){
            this.scene.scene.pause(); // Se puede quitar si quisierasmos
            this.scene.scene.launch('inventory', { from: this.scene.scene.key });
            this.scene.scene.bringToTop('inventory');
        }

        const cam = this.scene.cameras.main;
        var velocidadActual = this.speed;

        // --- ACTUALIZACIÓN UI ---
        const marginX = 50;
        const marginY = -8;
        const finalX = Math.round(cam.worldView.right - marginX);
        const finalY = Math.round(cam.worldView.y + marginY);

        this.lifeBarBg.setScale(0.5);
        this.lifeBarBg.setPosition(finalX, finalY);

        this.lifeBar.setScale(0.5);
        this.lifeBar.setPosition(finalX, finalY);

        // --- RECORTE Y LÓGICA ---
        const percentage = Math.max(0, this.health / this.maxHealth);
        this.lifeBar.setCrop(
            this.barX,
            this.barY,
            this.barWidth * percentage,
            this.barHeight
        );

        if (this.health <= 0) {
            this.lifeBar.setVisible(false);
            this.lifeBarBg.setVisible(false);
            return;
        }

        // --- MOVIMIENTO E INTERACCIÓN ---
        if (Phaser.Input.Keyboard.JustDown(this.keyE) && this.nearbyInteractable) {
            this.nearbyInteractable.interact(this);
        }

        let vx = 0;
        let vy = 0;

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            vx = -1;
            this.setFlipX(true);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            vx = 1;
            this.setFlipX(false);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -1;
        else if (this.cursors.down.isDown || this.wasd.down.isDown) vy = 1;

        if (vx !== 0 || vy !== 0) {
            this.lastMoveX = vx;
            this.lastMoveY = vy;
        }

        velocidadActual = this.isPushing ? (this.speed * 0.1) : this.speed;

        if (!this.isGrabbing && !this.isKnocked) {
            if (vx !== 0 || vy !== 0) {
                const velocity = new Phaser.Math.Vector2(vx, vy).normalize().scale(velocidadActual);
                this.body.setVelocity(velocity.x, velocity.y);

                if (!this.isAttacking && this.anims.currentAnim?.key !== 'cat_run') {
                    this.anims.play('cat_run');
                }
            } else {
                this.body.setVelocity(0);

                if (!this.isAttacking && this.anims.currentAnim?.key !== 'cat_idle') {
                    this.anims.play('cat_idle');
                }
            }
        }

        // --- LÓGICA DE ATAQUE ---
        if (Phaser.Input.Keyboard.JustDown(this.space) && this.canAttack && !this.isGrabbing && !this.isAttacking && !this.isKnocked) {
            this.canAttack = false;
            this.isAttacking = true;
            this.lockedOffsetX = 0;
            this.lockedOffsetY = 0;

            if (this.lastMoveY !== 0 && this.lastMoveX === 0) {
                this.lockedOffsetY = this.lastMoveY * 15;
                this.attackSprite.setFlipX(false);
            } else {
                this.lockedOffsetX = this.lastMoveX * 15;
                this.attackSprite.setFlipX(this.lastMoveX === -1);
            }

            this.attackHitbox.setPosition(this.x + this.lockedOffsetX, this.y + this.lockedOffsetY);
            this.attackHitbox.body.enable = true;
            this.attackSprite.setPosition(this.x + this.lockedOffsetX, this.y + this.lockedOffsetY);
            this.attackSprite.setVisible(true);
            this.attackSprite.play('cat_attack');

            const animSpeed = 300 / this.attackCooldown;
            this.attackSprite.anims.timeScale = animSpeed;
            this.attackSprite.once('animationcomplete', () => {
                this.isAttacking = false;
                this.attackHitbox.body.enable = false;
                this.attackSprite.setVisible(false);

                this.scene.time.delayedCall(this.attackCooldown, () => {
                    this.canAttack = true;
                });
            });
        }

        if (this.isAttacking) {
            this.attackSprite.setPosition(this.x + this.lockedOffsetX, this.y + this.lockedOffsetY);
            this.attackHitbox.setPosition(this.x + this.lockedOffsetX, this.y + this.lockedOffsetY);
        }

        this.isPushing = false;
        this.savePlayerData();
    }

    takeDamage(source) {
        if (this.isInvincible || this.health <= 0) return;

        this.health -= 20;
        this.scene.registry.set('health', this.health); // Actualizamos la vida actual 

        if (this.health <= 0) {
            this.health = 0;
            if (this.body)
                this.body.setVelocity(0, 0);
        }

        this.isInvincible = true;
        this.isKnocked = true;
        this.scene.cameras.main.shake(150, 0.001);

        if (source && this.health > 0) {
            const knockbackDirection = new Phaser.Math.Vector2(
                this.x - source.x,
                this.y - source.y
            ).normalize();

            this.body.setVelocity(
                knockbackDirection.x * this.damageKnockbackForce,
                knockbackDirection.y * this.damageKnockbackForce
            );
        }

        this.scene.time.delayedCall(250, () => {
            this.isKnocked = false;
        });

        this.scene.tweens.add({
            targets: this,
            alpha: 0.2,
            duration: 100,
            yoyo: true,
            repeat: Math.floor(this.invincibilityDuration / 200) - 1,
            onComplete: () => {
                this.alpha = 1;
                this.isInvincible = false;
            }
        });
    }

    revive(){
        this.health = 100;
        this.savePlayerData();
    }

    savePlayerData() {
        // Creamos un objeto solo con la información que nos importa
        const playerData = {
            health: this.health,
            maxHealth: this.maxHealth,
            damage: this.damage,
            speed: this.speed,
            attackCooldown: this.attackCooldown,
            llaves: {
                almacen: this.llave_almacen,
                balcon: this.llave_balcon,
                basura: this.llave_basura,
                boss: this.llave_boss
            }
        };

        // Guardamos objeto
        this.scene.registry.set('playerData', playerData);
    }
}