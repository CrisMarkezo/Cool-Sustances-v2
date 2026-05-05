import Phaser from 'phaser';
import GameEntity from './gameEntity.js';

export default class Monster extends GameEntity {
    constructor(scene, x, y) {
        const ratVariants = ['rat', 'rat1', 'rat2'];
        const selectedRat = Phaser.Utils.Array.GetRandom(ratVariants);

        super(scene, x, y, selectedRat, 0);

        this.ratKey = selectedRat;

        this.play(`${this.ratKey}_move`);

        this.patrolSpeed = 30;
        this.chaseSpeed = 45;
        this.speed = this.patrolSpeed;

        this.waypoints = [
            { x: x, y: y },
            { x: x + 40, y: y },
            { x: x + 40, y: y + 40 },
            { x: x, y: y + 40 }
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

        this.maxHealth = 30;
        this.health = 30;

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

            if (distance < this.currentVisionRange) {
                this.currentVisionRange = this.chaseRange;
                this.chase(target);
            } else {
                this.patrol();
            }

            if (distance < 15 && target.takeDamage) {
                target.takeDamage(this);
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
        this.health -= 10;

        if (this.health <= 0) {
            this.die();
            return;
        }

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
        this.body.enable = false;
        this.healthBar.clear();
        this.destroy();
    }
}