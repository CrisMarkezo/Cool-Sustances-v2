export class EnemyTemplate extends Monster {
    constructor(scene, x, y, texture, templateConfig = {}) {
        super(scene, x, y, texture);

        this.templateConfig = {
            name: templateConfig.name || 'Enemy',
            type: templateConfig.type || 'melee',
            detectionRange: templateConfig.detectionRange || 150,
            attackRange: templateConfig.attackRange || 30,
            moveSpeed: templateConfig.moveSpeed || 80,
            attackDamage: templateConfig.attackDamage || 15,
            attackCooldown: templateConfig.attackCooldown || 1000,
            maxHealth: templateConfig.maxHealth || 50,
            lootPool: templateConfig.lootPool || null,
            attackType: templateConfig.attackType || null,
            ...templateConfig
        };

        this.maxHealth = this.templateConfig.maxHealth;
        this.health = this.templateConfig.maxHealth;
        this.speed = this.templateConfig.moveSpeed;
        this.damage = this.templateConfig.attackDamage;
        this.detectionRange = this.templateConfig.detectionRange;
        this.chaseRange = this.templateConfig.detectionRange * 1.5;

        this.attackSystem = new AttackSystem();
        if (this.templateConfig.attackType) {
            this.currentAttack = this.templateConfig.attackType;
            this.lastAttackTime = 0;
        }

        this.isChasing = false;
        this.lastPos = { x, y };
        this.stuckCounter = 0;
        this.stuckThreshold = 30;
    }

    update(target) {
        if (this.health <= 0) {
            this.healthBarGraphics.clear();
            return;
        }

        if (this.scene.inventoryOpen) {
            this.body.setVelocity(0, 0);
            this.healthBarGraphics.clear();
            return;
        }

        if (this.isKnocked) {
            this.drawHealthBar(this.x - 15, this.y - 20, 30, 4);
            return;
        }

        const distanceToTarget = Phaser.Math.Distance.Between(
            this.x, this.y,
            target.x, target.y
        );

        if (distanceToTarget < this.detectionRange) {
            this.isChasing = true;
            this.chaseTargetAdvanced(target);

            if (this.currentAttack && distanceToTarget < this.templateConfig.attackRange) {
                this.tryAttack(target);
            }
        } else {
            this.isChasing = false;
            this.patrol();
        }

        if (distanceToTarget < 15 && target.takeDamage && !this.currentAttack) {
            target.takeDamage(this);
        }

        // Detectar si está atrapado
        this.detectStuck();

        this.drawHealthBar(this.x - 15, this.y - 20, 30, 4);
    }

    chaseTargetAdvanced(target) {
        const direction = new Phaser.Math.Vector2(
            target.x - this.x,
            target.y - this.y
        ).normalize();

        this.body.setVelocity(
            direction.x * this.speed,
            direction.y * this.speed
        );

        if (direction.x < 0) this.setFlipX(true);
        else if (direction.x > 0) this.setFlipX(false);
    }

    tryAttack(target) {
        const currentTime = this.scene.time.now;

        if (currentTime - this.lastAttackTime < this.templateConfig.attackCooldown) {
            return false;
        }

        if (this.currentAttack) {
            const success = this.currentAttack.execute(this.scene, this, target);
            if (success) {
                this.lastAttackTime = currentTime;
            }
            return success;
        }

        return false;
    }

    detectStuck() {
        const distance = Phaser.Math.Distance.Between(
            this.x, this.y,
            this.lastPos.x, this.lastPos.y
        );

        if (distance < 2) {
            this.stuckCounter++;
            if (this.stuckCounter > this.stuckThreshold && this.isChasing) {
                // Romper el patrón: intentar movimiento aleatorio
                this.body.setVelocity(
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 200
                );
                this.stuckCounter = 0;
            }
        } else {
            this.stuckCounter = 0;
            this.lastPos = { x: this.x, y: this.y };
        }
    }

    /**
     * Patrulla con waypoints
     */
    patrol() {
        this.speed = this.templateConfig.moveSpeed * 0.6;
        const targetWaypoint = this.waypoints[this.currentWaypointIndex];
        const distanceToWaypoint = Phaser.Math.Distance.Between(
            this.x, this.y,
            targetWaypoint.x, targetWaypoint.y
        );

        if (distanceToWaypoint < 5) {
            this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.length;
        }

        const direction = new Phaser.Math.Vector2(
            targetWaypoint.x - this.x,
            targetWaypoint.y - this.y
        ).normalize();

        this.body.setVelocity(
            direction.x * this.speed,
            direction.y * this.speed
        );

        if (direction.x < 0) this.setFlipX(true);
        else if (direction.x > 0) this.setFlipX(false);
    }

    die() {
        if (this.templateConfig.lootPool) {
            const loot = this.templateConfig.lootPool.rollLoot();
            if (loot) {
                this.scene.eventEmitter?.emit('enemyDied', {
                    x: this.x,
                    y: this.y,
                    loot: loot,
                    enemy: this
                });
            }
        }

        this.body.enable = false;
        this.healthBarGraphics.clear();
        this.destroy();
    }

    setPatrolWaypoints(waypoints) {
        this.waypoints = waypoints;
        this.currentWaypointIndex = 0;
    }

    setAttackType(attackType) {
        this.currentAttack = attackType;
        this.lastAttackTime = 0;
    }
}
