import Phaser from 'phaser';
import Inventory from './Inventory.js';
import GameEntity from './gameEntity.js';

export default class Player extends GameEntity {
    constructor(scene, x, y) {
        super(scene, x, y, 'cat_idle', 0); 

        this.uiBarGraphics = null;

        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.setDepth(10);
        this.body.setDrag(1000); 

        this.speed = 100;
        this.isAttacking = false;
        this.isGrabbing = false;
        this.isInvincible = false;
        this.isKnocked = false; 
        this.invincibilityDuration = 1500;
        this.damageKnockbackForce = 180;

        this.canAttack = true;
        this.attackCooldown = 300;

        this.maxHealth = 100;
        this.health = 100;

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.inventory = new Inventory(3, 3);
        this.nearbyInteractable = null;

        this.attackHitbox = scene.add.rectangle(this.x, this.y, 20, 20, 0xff0000);
        scene.physics.add.existing(this.attackHitbox);
        this.attackHitbox.body.setAllowGravity(false);
        this.attackHitbox.body.moves = false;
        this.attackHitbox.body.setSize(20, 20);
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

        this.lifeBar = scene.add.image(0, 0, 'healthbar');
        this.lifeBar.setOrigin(0, 0.5);
        this.lifeBar.setScrollFactor(0);
        this.lifeBar.setDepth(9999);

        this.barX = 0;
        this.barY = 0;
        this.barWidth = 55i;
        this.barHeight = 20;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        const cam = this.scene.cameras.main;
        const x = cam.width / 2-1000;
        const y = cam.height / 2-200;

        this.lifeBar.setPosition(x, y);

        const percentage = this.health / this.maxHealth;

        this.lifeBar.setCrop(
            this.barX+910,
            this.barY+30,
            this.barWidth * percentage,
            this.barHeight
        );

        if (this.health <= 0) return;

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

        if (!this.isGrabbing && !this.isKnocked) {
            if (vx !== 0 || vy !== 0) {
                const velocity = new Phaser.Math.Vector2(vx, vy).normalize().scale(this.speed);
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
    }

    takeDamage(source) {
        if (this.isInvincible || this.health <= 0) return;

        this.health -= 10;

        if (this.health <= 0) {
            this.health = 0;
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
}