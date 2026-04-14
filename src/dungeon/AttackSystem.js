export class AttackType {
    constructor(options = {}) {
        this.range = options.range || 30;
        this.damage = options.damage || 10;
        this.cooldown = options.cooldown || 1000;
        this.knockback = options.knockback || 150;
        this.lastAttackTime = 0;
    }

    canAttack(currentTime) {
        return (currentTime - this.lastAttackTime) >= this.cooldown;
    }

    updateLastAttack(currentTime) {
        this.lastAttackTime = currentTime;
    }

    execute(scene, attacker, target) {
    }
}

export class MeleeAttack extends AttackType {
    constructor(options = {}) {
        super({
            range: options.range || 30,
            damage: options.damage || 15,
            cooldown: options.cooldown || 800,
            knockback: options.knockback || 200,
            ...options
        });
        this.knockbackDuration = options.knockbackDuration || 200;
    }

    execute(scene, attacker, target) {
        if (!target || !target.active) return false;

        const distance = Phaser.Math.Distance.Between(
            attacker.x, attacker.y,
            target.x, target.y
        );

        if (distance > this.range) return false;

        if (target.receiveHit) {
            target.receiveHit(attacker, this.knockback);
        }

        this.createMeleeEffect(scene, attacker, target);
        return true;
    }

    createMeleeEffect(scene, attacker, target) {
        const graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xff0000);
        graphics.beginPath();
        graphics.moveTo(attacker.x, attacker.y);
        graphics.lineTo(target.x, target.y);
        graphics.strokePath();

        scene.time.delayedCall(100, () => graphics.destroy());
    }
}

export class RangedAttack extends AttackType {
    constructor(options = {}) {
        super({
            range: options.range || 300,
            damage: options.damage || 10,
            cooldown: options.cooldown || 1200,
            knockback: options.knockback || 100,
            ...options
        });
        this.projectileSpeed = options.projectileSpeed || 300;
        this.projectileLifetime = options.projectileLifetime || 3000;
    }

    execute(scene, attacker, target) {
        if (!target || !target.active) return false;

        const distance = Phaser.Math.Distance.Between(
            attacker.x, attacker.y,
            target.x, target.y
        );

        if (distance > this.range) return false;

        this.createProjectile(scene, attacker, target);
        return true;
    }

    createProjectile(scene, attacker, target) {
        const projectile = scene.add.circle(
            attacker.x,
            attacker.y,
            4,
            0xffff00
        );
        scene.physics.add.existing(projectile);

        const direction = new Phaser.Math.Vector2(
            target.x - attacker.x,
            target.y - attacker.y
        ).normalize();

        projectile.body.setVelocity(
            direction.x * this.projectileSpeed,
            direction.y * this.projectileSpeed
        );

        projectile.damage = this.damage;
        projectile.knockback = this.knockback;
        projectile.attacker = attacker;

        scene.time.delayedCall(this.projectileLifetime, () => {
            if (projectile.active) projectile.destroy();
        });

        return projectile;
    }
}

export class AOEAttack extends AttackType {
    constructor(options = {}) {
        super({
            range: options.range || 100,
            damage: options.damage || 20,
            cooldown: options.cooldown || 2000,
            knockback: options.knockback || 250,
            radius: options.radius || 80,
            ...options
        });
        this.radius = options.radius || 80;
        this.duration = options.duration || 500;
    }

    execute(scene, attacker, enemyGroup) {
        const aoeZone = scene.add.zone(
            attacker.x,
            attacker.y,
            this.radius * 2,
            this.radius * 2
        );
        scene.physics.world.enable(aoeZone);

        const overlap = scene.physics.overlap(aoeZone, enemyGroup);
        if (overlap) {
            enemyGroup.getChildren().forEach(enemy => {
                const distance = Phaser.Math.Distance.Between(
                    attacker.x, attacker.y,
                    enemy.x, enemy.y
                );

                if (distance <= this.radius && enemy !== attacker) {
                    if (enemy.receiveHit) {
                        enemy.receiveHit(attacker, this.knockback);
                    }
                }
            });
        }

        this.createAOEEffect(scene, attacker);

        aoeZone.destroy();
        return true;
    }

    createAOEEffect(scene, center) {
        const graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xff6600);
        graphics.strokeCircle(center.x, center.y, this.radius);

        scene.time.delayedCall(this.duration, () => graphics.destroy());
    }
}

export class AttackSystem {
    constructor() {
        this.attacks = {};
    }

    registerAttack(name, attackType) {
        this.attacks[name] = attackType;
    }

    getAttack(name) {
        return this.attacks[name];
    }

    tryAttack(scene, name, attacker, target, currentTime) {
        const attack = this.attacks[name];
        if (!attack) return false;

        if (!attack.canAttack(currentTime)) return false;

        const success = attack.execute(scene, attacker, target);
        if (success) {
            attack.updateLastAttack(currentTime);
        }

        return success;
    }
}
