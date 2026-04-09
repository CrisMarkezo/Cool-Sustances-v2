import Phaser from 'phaser';
import GameEntity from './gameEntity.js';

export default class Monster extends GameEntity {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        
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
    }

    update(target) {
        // 1. Si está muerto, limpiar barra y salir
        if (this.health <= 0) {
            this.healthBarGraphics.clear();
            return; 
        }

        // 2. Si el inventario está abierto, congelar al monstruo y ocultar barra
        if (this.scene.inventoryOpen) {
            this.body.setVelocity(0, 0);
            this.healthBarGraphics.clear(); // Esto asegura que la barra desaparezca
            return;
        }

        // 3. Si está en estado de knockback, no ejecutar IA pero sí dibujar barra
        if (this.isKnocked) {
            this.drawHealthBar(this.x - 15, this.y - 20, 30, 4);
            return;
        }

        const distanceToTarget = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);

        // Lógica de IA
        if (distanceToTarget < this.currentVisionRange) {
            this.currentVisionRange = this.chaseRange;
            this.chaseTarget(target);
        } else {
            this.currentVisionRange = this.detectionRange;
            this.patrol();
        }

        // Daño al jugador
        if (distanceToTarget < 15 && target.takeDamage) {
            target.takeDamage(this);
        }

        // 4. Dibujar la barra solo si todo lo anterior permite que el update siga
        this.drawHealthBar(this.x - 15, this.y - 20, 30, 4);
    }

    chaseTarget(target) {
        this.speed = this.chaseSpeed;
        const direction = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize();
        this.body.setVelocity(direction.x * this.speed, direction.y * this.speed);

        if (direction.x < 0) this.setFlipX(true);
        else if (direction.x > 0) this.setFlipX(false);
    }

    patrol() {
        this.speed = this.patrolSpeed;
        const targetWaypoint = this.waypoints[this.currentWaypointIndex];
        const distanceToWaypoint = Phaser.Math.Distance.Between(this.x, this.y, targetWaypoint.x, targetWaypoint.y);

        if (distanceToWaypoint < 5) {
            this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.length;
        }

        const direction = new Phaser.Math.Vector2(targetWaypoint.x - this.x, targetWaypoint.y - this.y).normalize();
        this.body.setVelocity(direction.x * this.speed, direction.y * this.speed);

        if (direction.x < 0) this.setFlipX(true);
        else if (direction.x > 0) this.setFlipX(false);
    }

    receiveHit(from, force = 200) {
        if (!this.canBeHit || this.health <= 0) return;

        this.canBeHit = false;
        this.isKnocked = true;
        this.health -= from.damage;; 

        if (this.health <= 0) {
            this.die();
            return;
        }

        const direction = new Phaser.Math.Vector2(this.x - from.x, this.y - from.y).normalize();
        this.body.setVelocity(direction.x * force, direction.y * force);

        this.scene.time.delayedCall(this.knockbackTime, () => { 
            this.isKnocked = false; 
            if (!this.scene.inventoryOpen) this.body.setVelocity(0, 0); 
        });
        this.scene.time.delayedCall(this.hitCooldown, () => { this.canBeHit = true; });
    }

    die() {
        this.body.enable = false; 
        this.healthBarGraphics.clear(); 
        this.destroy(); 
    }
}