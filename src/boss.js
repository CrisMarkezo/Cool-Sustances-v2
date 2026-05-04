import Phaser from 'phaser';
import GameEntity from './gameEntity.js';
import BossLight from './BossLight.js';

export default class Monster extends GameEntity {
    constructor(scene, x, y) {
        super(scene, x, y, 'boss', 0);

        this.play('boss_move');
        this.body.setImmovable(true); 
        this.body.setAllowGravity(false);

        // --- CONFIGURACIÓN TORRETA ---
        this.fireRate = 2000;
        this.nextFire = 0;
        this.projectileSpeed = 70;
        this.projectiles = scene.physics.add.group();

        // --- CONFIGURACIÓN ATAQUE ESPECIAL ---
        this.specialAttackCooldown = 15000; 
        this.nextSpecialAttack = this.scene.time.now + 5000;
        this.isDoingSpecial = false;
        this.activeLights = [];
        this.preparationTime = 10000;

        // --- ESTADOS Y VIDA ---
        this.canBeHit = true;
        this.hitCooldown = 500;
        this.maxHealth = 100;
        this.health = 100;
        this.isDead = false; 

        this.healthBar = scene.add.graphics();
    }

    update(target) {
        if (this.isDead || !target || this.health <= 0 || this.scene.inventoryOpen) {
            if (this.healthBar) this.healthBar.clear();
            return;
        }

        const currentTime = this.scene.time.now;
        
        if (this.body) this.setFlipX(target.x > this.x);

        if (!this.isDoingSpecial && currentTime > this.nextSpecialAttack) {
            this.startSpecialAttack(target);
        }

        if (!this.isDoingSpecial && currentTime > this.nextFire) {
            this.shootProjectile(target, this.projectileSpeed);
            this.nextFire = currentTime + this.fireRate;
        }

        this.drawHealthBar();
    }

    shootProjectile(target, speed) {
        if (this.isDead) return;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        this.createProjectile(angle, speed, target);
    }

    createProjectile(angle, speed, target) {
        if (this.isDead || !this.scene) return;

        
        const projectile = this.scene.physics.add.sprite(this.x, this.y, 'disc');
        projectile.setScale(0.3);
        this.projectiles.add(projectile);

        // Configuración física del proyectil
        projectile.body.setAllowGravity(false);
        // Ajustamos el body a 24x24 para que sea más justo, siendo el sprite 32x32
        projectile.body.setSize(5, 5); 

        // Movimiento
        projectile.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

        // Rotación: Le damos una rotación inicial aleatoria y una velocidad de giro constante
        projectile.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));
        projectile.body.setAngularVelocity(300); // Gira a 300 grados por segundo

        this.scene.physics.add.overlap(projectile, target, () => {
            if (target.takeDamage) target.takeDamage(this);
            projectile.destroy();
        });

        this.scene.time.delayedCall(5000, () => { 
            if (projectile && projectile.active) projectile.destroy(); 
        });
    }

    startSpecialAttack(target) {
        if (this.isDead) return;
        this.isDoingSpecial = true;
        
        if (this.body) this.body.setVelocity(0);
        this.stop();

        const dist = 55;
        const offsets = [{ x: -dist, y: 0 }, { x: dist, y: 0 }, { x: 0, y: -dist }, { x: 0, y: dist }];

        this.activeLights = offsets.map((off, index) => {
            return new BossLight(this.scene, this.x + off.x, this.y + off.y, target, index);
        });

        let finalTexture = 'boss';
        let finalFrame = 0;

        const flickerEvent = this.scene.time.addEvent({
            delay: 200,
            repeat: 35,
            callback: () => {
                if (this.isDead) return;
                const rand = Phaser.Math.Between(0, 3);
                if (rand === 0) {
                    this.setTexture('boss', 0);
                    finalTexture = 'boss';
                    finalFrame = 0;
                } else {
                    finalFrame = rand - 1;
                    this.setTexture('bossColours', finalFrame);
                    finalTexture = 'bossColours';
                }
            }
        });

        this.scene.time.delayedCall(7000, () => {
            if (this.isDead) return;
            this.scene.time.delayedCall(3000, () => {
                if (!this.isDead) this.resolveSpecialAttack(target, finalTexture, finalFrame);
            });
        });
    }

    resolveSpecialAttack(target, texture, frame) {
        if (this.isDead) return;

        let safeFrameId = 0;
        if (texture === 'boss') safeFrameId = 0;
        else if (texture === 'bossColours') {
            if (frame === 0) safeFrameId = 3;
            else if (frame === 1) safeFrameId = 2;
            else if (frame === 2) safeFrameId = 1;
        }

        const safeLight = this.activeLights.find(l => l.frameId === safeFrameId);
        const isSafe = safeLight && safeLight.isPlayerInside();

        if (!isSafe) {
            const totalProjectiles = 14;
            const spreadAngle = 0.6; 
            for (let i = 0; i < totalProjectiles; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    if (!this.isDead) {
                        const baseAngle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
                        const randomOffset = (Math.random() - 0.5) * spreadAngle;
                        this.createProjectile(baseAngle + randomOffset, 55, target);
                    }
                });
            }
        }

        this.activeLights.forEach(l => { if(l) l.destroy() });
        this.activeLights = [];
        this.isDoingSpecial = false;

        if (!this.isDead) {
            this.setTexture('boss', 0);
            this.play('boss_move');
            this.nextSpecialAttack = this.scene.time.now + this.specialAttackCooldown;
            this.nextFire = this.scene.time.now + 2000;
        }
    }

    receiveHit(from) {
        if (this.isDead || !this.canBeHit || this.health <= 0) return;
        this.canBeHit = false;
        this.health -= 5; 
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => { if(!this.isDead) this.clearTint(); });
        
        if (this.health <= 0) {
            this.die();
        } else {
            this.scene.time.delayedCall(this.hitCooldown, () => { this.canBeHit = true; });
        }
    }

    drawHealthBar() {
        if (this.isDead || !this.healthBar) return;
        this.healthBar.clear();
        this.healthBar.fillStyle(0x000000);
        this.healthBar.fillRect(this.x - 20, this.y - 35, 40, 6);
        this.healthBar.fillStyle(0xff0000);
        this.healthBar.fillRect(this.x - 20, this.y - 35, 40 * (this.health / this.maxHealth), 6);
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;

        this.activeLights.forEach(l => { if(l) l.destroy() });
        this.activeLights = [];

        if (this.projectiles) {
            this.projectiles.clear(true, true);
        }

        if (this.healthBar) {
            this.healthBar.clear();
            this.healthBar.destroy();
        }

        if (this.body) {
            this.body.enable = false;
        }

        this.destroy();
    }
}