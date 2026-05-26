import Phaser from 'phaser';
import GameEntity from './gameEntity.js';

export default class Monster extends GameEntity {
    constructor(scene, x, y) {
        const ratVariants = ['rat', 'rat1', 'rat2'];
        const selectedRat = Phaser.Utils.Array.GetRandom(ratVariants);

        super(scene, x, y, selectedRat, 0);

        this.ratKey = selectedRat;

        this.play(`${this.ratKey}_move`);

        // --- AJUSTES DE AGRESIVIDAD (VELOCIDADES REDUCIDAS A LA MITAD) ---
        this.patrolSpeed = 17.5; // Modificado: Antes 35
        this.chaseSpeed = 42.5;  // Modificado: Antes 85
        this.speed = this.patrolSpeed;

        this.waypoints = [
            { x: x, y: y },
            { x: x + 40, y: y },
            { x: x + 40, y: y + 40 },
            { x: x, y: y + 40 }
        ];

        this.currentWaypointIndex = 0;
        this.detectionRange = 90; // Detecta al jugador desde mucho más lejos
        this.chaseRange = 450;     // No dejará de perseguir fácilmente
        this.currentVisionRange = this.detectionRange;

        this.canBeHit = true;
        this.hitCooldown = 500;
        this.isKnocked = false;
        this.knockbackTime = 200;

        this.body.setDrag(200);

        this.maxHealth = 60;
        this.health = 60;

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

        if (!this.isKnocked) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);

            // Sistema de alerta y persecución implacable
            if (distance < this.currentVisionRange) {
                this.currentVisionRange = this.chaseRange;
                this.chase(target);
            } else {
                // Si el jugador logra escapar del rango máximo, vuelve a patrullar
                this.currentVisionRange = this.detectionRange;
                this.patrol();
            }

            // Ataque físico por colisión de hitboxes nativas (más preciso y agresivo que la distancia matemática directa)
            if (target && target.takeDamage) {
                this.scene.physics.overlap(this, target, () => {
                    target.takeDamage(this);
                });
            }
        }

        this.drawHealthBar();
    }

    chase(target) {
        this.speed = this.chaseSpeed;

        const dir = new Phaser.Math.Vector2(
            target.x - this.x,
            target.y - this.y
        ).normalize();

        this.body.setVelocity(dir.x * this.speed, dir.y * this.speed);

        this.setFlipX(dir.x > 0);

        if (this.anims.currentAnim?.key !== `${this.ratKey}_move`) {
            this.play(`${this.ratKey}_move`, true);
        }
    }

    patrol() {
        this.speed = this.patrolSpeed;

        const wp = this.waypoints[this.currentWaypointIndex];

        if (Phaser.Math.Distance.Between(this.x, this.y, wp.x, wp.y) < 5) {
            this.currentWaypointIndex =
                (this.currentWaypointIndex + 1) % this.waypoints.length;
        }

        const dir = new Phaser.Math.Vector2(
            wp.x - this.x,
            wp.y - this.y
        ).normalize();

        this.body.setVelocity(dir.x * this.speed, dir.y * this.speed);

        this.setFlipX(dir.x > 0);

        if (this.anims.currentAnim?.key !== `${this.ratKey}_move`) {
            this.play(`${this.ratKey}_move`, true);
        }
    }

    receiveHit(from, force = 200) {
        if (!this.canBeHit || this.health <= 0) return;

        this.canBeHit = false;
        this.isKnocked = true;
        this.health -= from.damage;

        if (this.health <= 0) {
            this.die();
            return;
        }

        
        let blinkCount = 0;
        const totalBlinks = 4; // Cuántas veces va a cambiar de color

        const flashEvent = this.scene.time.addEvent({
            delay: 140, // Velocidad del parpadeo en milisegundos
            repeat: totalBlinks - 1,
            callback: () => {
                if (!this.active) return; // Por seguridad si la rata muere mientras parpadea

                if (blinkCount % 2 === 0) {
                    // Se pone oscuro (0x555555 es un gris/negro que oscurece el sprite original)
                    this.setTint(0x555555); 
                } else {
                    // Vuelve a su color normal y limpio
                    this.clearTint(); 
                }
                blinkCount++;
            }
        });
        // =========================================================================

        const dir = new Phaser.Math.Vector2(
            this.x - from.x,
            this.y - from.y
        ).normalize();

        this.body.setVelocity(dir.x * force, dir.y * force);

        this.scene.time.delayedCall(this.knockbackTime, () => {
            this.isKnocked = false;
        });

        this.scene.time.delayedCall(this.hitCooldown, () => {
            this.canBeHit = true;
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
        // 1. Desactivar físicas, controles y limpiar la barra de vida de inmediato
        this.body.enable = false;
        this.healthBar.clear();
        this.isKnocked = true; // Evita que se ejecute lógica de movimiento en el update

        // Detener la animación de caminar si se estaba reproduciendo
        this.anims.stop();

        // 2. Crear un Tween para rotar 90 grados en sentido horario
        this.scene.tweens.add({
            targets: this,
            angle: 90,           // Rota 90 grados (sentido horario)
            duration: 400, 
            ease: 'Quad.easeOut', // Efecto de frenado suave al caer
            onComplete: () => {
                // 3. Destruir definitivamente el sprite tras una pequeña pausa en el suelo
                this.scene.time.delayedCall(300, () => {
                    this.destroy();
                });
            }
        });
    }
}