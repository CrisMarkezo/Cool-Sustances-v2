import Phaser from 'phaser';
import GameEntity from './gameEntity.js';
import BossLight from './BossLight.js';

export default class Monster extends GameEntity {
    constructor(scene, x, y) {
        super(scene, x, y, 'boss', 0);

        this.play('boss_move');

        this.patrolSpeed = 30;
        this.chaseSpeed = 45;
        this.speed = this.patrolSpeed;

        this.waypoints = [
            { x: x, y: y },
            { x: x + 100, y: y },
            { x: x + 100, y: y + 100 },
            { x: x, y: y + 100 }
        ];

        this.currentWaypointIndex = 0;
        this.detectionRange = 25;
        this.chaseRange = 300;
        this.currentVisionRange = this.detectionRange;

        this.canBeHit = true;
        this.hitCooldown = 500;
        this.isKnocked = false;
        this.knockbackTime = 200;

        this.body.setDrag(200);

        this.maxHealth = 50;
        this.health = 50;

        // Flags para el ataque especial
        this.hasSpawnedPhase = false;
        this.activeLights = [];

        this.healthBar = scene.add.graphics();
    }

    update(target) {
        if (this.health <= 0) {
            this.healthBar.clear();
            return;
        }

        if (this.scene.inventoryOpen) {
            this.body.setVelocity(0);
            this.healthBar.clear();
            return;
        }

        // Activación al 50% de vida
        if (this.health <= this.maxHealth / 2 && !this.hasSpawnedPhase) {
            this.startSpecialAttack(target);
        }

        // Solo se mueve si no está ejecutando el ataque especial
        if (!this.isKnocked) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);

            if (distance < this.currentVisionRange) {
                this.currentVisionRange = this.chaseRange;
                this.chase(target);
            } else {
                this.currentVisionRange = this.detectionRange;
                this.patrol();
            }

            if (distance < 15 && target.takeDamage) {
                target.takeDamage(this);
            }
        }

        this.drawHealthBar();
    }

    startSpecialAttack(target) {
        this.hasSpawnedPhase = true;
        this.isKnocked = true;
        this.body.setVelocity(0);
        this.stop(); // Detiene animación de caminar

        // 1. INVOCAR LUCES MUY CERCA (40px de distancia)
        // Las posicionamos en cruz: Norte, Sur, Este, Oeste
        const dist = 40; 
        const offsets = [{x: -dist, y: 0}, {x: dist, y: 0}, {x: 0, y: -dist}, {x: 0, y: dist}];
        
        this.activeLights = offsets.map((off, index) => {
            return new BossLight(this.scene, this.x + off.x, this.y + off.y, target, index);
        });

        // 2. PARPADEO
        let finalTexture = 'boss';
        let finalFrame = 0;

        const flashTimer = this.scene.time.addEvent({
            delay: 100,
            repeat: 15,
            callback: () => {
                const rand = Phaser.Math.Between(0, 3);
                if (rand === 0) {
                    this.setTexture('boss', 0);
                    finalTexture = 'boss'; finalFrame = 0;
                } else {
                    finalFrame = rand - 1; 
                    this.setTexture('bossColours', finalFrame);
                    finalTexture = 'bossColours';
                }
            }
        });

        // 3. TIEMPO DE GRACIA EXTENDIDO (6 segundos)
        this.scene.time.delayedCall(6000, () => {
            this.resolveSpecialAttack(target, finalTexture, finalFrame);
        });
    }

    resolveSpecialAttack(target, texture, frame) {
        // REGLAS DE SEGURIDAD:
        // Boss (Normal) Frame 0  --> Luz ID 0
        // BossColours Frame 0    --> Luz ID 3
        // BossColours Frame 1    --> Luz ID 2
        // BossColours Frame 2    --> Luz ID 1
        
        let safeFrameId = 0;
        if (texture === 'boss') {
            safeFrameId = 0;
        } else if (texture === 'bossColours') {
            if (frame === 0) safeFrameId = 3;
            else if (frame === 1) safeFrameId = 2;
            else if (frame === 2) safeFrameId = 1;
        }

        // Buscar si el gato está sobre la luz segura
        const safeLight = this.activeLights.find(l => l.frameId === safeFrameId);
        const isSafe = safeLight && safeLight.isPlayerInside();

        if (!isSafe) {
            // CASTIGO: Teletransporte directo al gato
            this.x = target.x;
            this.y = target.y;
            
            // Efectos de impacto
            this.scene.cameras.main.shake(400, 0.03);
            this.scene.cameras.main.flash(400, 255, 0, 0);
            
            if (target.takeDamage) target.takeDamage(30); 
        }

        // Limpieza y vuelta a la normalidad
        this.activeLights.forEach(l => l.destroy());
        this.activeLights = [];
        this.isKnocked = false;
        
        // Volver a estado base
        this.setTexture('boss', 0);
        this.play('boss_move');
    }

    chase(target) {
        this.speed = this.chaseSpeed;
        const dir = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize();
        this.body.setVelocity(dir.x * this.speed, dir.y * this.speed);
        this.setFlipX(dir.x < 0);
        if (this.anims.currentAnim?.key !== 'boss_move') this.play('boss_move', true);
    }

    patrol() {
        this.speed = this.patrolSpeed;
        const wp = this.waypoints[this.currentWaypointIndex];
        if (Phaser.Math.Distance.Between(this.x, this.y, wp.x, wp.y) < 5) {
            this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.length;
        }
        const dir = new Phaser.Math.Vector2(wp.x - this.x, wp.y - this.y).normalize();
        this.body.setVelocity(dir.x * this.speed, dir.y * this.speed);
        this.setFlipX(dir.x < 0);
        if (this.anims.currentAnim?.key !== 'boss_move') this.play('boss_move', true);
    }

    receiveHit(from, force = 200) {
        if (!this.canBeHit || this.health <= 0) return;

        this.canBeHit = false;
        this.isKnocked = true;
        this.health -= 10; 

        if (this.health <= 0) {
            this.die();
            return;
        }

        const dir = new Phaser.Math.Vector2(this.x - from.x, this.y - from.y).normalize();
        this.body.setVelocity(dir.x * force, dir.y * force);

        this.scene.time.delayedCall(this.knockbackTime, () => {
            // No recuperar movimiento si el ataque especial está activo
            if (this.activeLights.length === 0) {
                this.isKnocked = false;
            }
        });

        this.scene.time.delayedCall(this.hitCooldown, () => {
            this.canBeHit=true;
        });
    }

    drawHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0x000000);
        this.healthBar.fillRect(this.x - 15, this.y - 20, 30, 4);
        this.healthBar.fillStyle(0xff0000);
        this.healthBar.fillRect(this.x - 15, this.y - 20, 30 * (this.health / this.maxHealth), 4);
    }

    die() {
        this.body.enable = false;
        this.healthBar.clear();
        this.destroy();
    }
}