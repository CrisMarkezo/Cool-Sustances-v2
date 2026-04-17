import { EnemyTemplate } from './EnemyTemplate.js';
import { AttackType, MeleeAttack } from './AttackSystem.js';
import { DungeonConfig } from './DungeonConfig.js';
import { LootPool } from './LootPool.js';

export class BerserkEnemy extends EnemyTemplate {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, 'enemigo', config);
        this.berserkThreshold = 0.5;
        this.isBerserk = false;
        this.originalSpeed = this.speed;
        this.originalDamage = this.damage;
    }

    update(target) {
        super.update(target);

        const healthPercent = this.health / this.maxHealth;
        if (healthPercent < this.berserkThreshold && !this.isBerserk) {
            this.activateBerserk();
        } else if (healthPercent >= this.berserkThreshold && this.isBerserk) {
            this.deactivateBerserk();
        }
    }

    activateBerserk() {
        this.isBerserk = true;
        this.speed = this.originalSpeed * 1.5;
        this.damage = this.originalDamage * 1.3;
        this.setTint(0xff5555);
        
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 300,
            yoyo: true,
            repeat: 2
        });
    }

    deactivateBerserk() {
        this.isBerserk = false;
        this.speed = this.originalSpeed;
        this.damage = this.originalDamage;
        this.clearTint();
    }
}

export class PhaseBoss extends EnemyTemplate {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, 'boss', config);
        
        this.phases = [
            { healthPercent: 1.0, attack: config.phase1Attack, speed: this.speed },
            { healthPercent: 0.66, attack: config.phase2Attack, speed: this.speed * 1.2 },
            { healthPercent: 0.33, attack: config.phase3Attack, speed: this.speed * 1.5 }
        ];
        
        this.currentPhase = 0;
    }

    update(target) {
        const healthPercent = this.health / this.maxHealth;
        
        for (let i = this.phases.length - 1; i >= 0; i--) {
            if (healthPercent <= this.phases[i].healthPercent) {
                if (i !== this.currentPhase) {
                    this.transitionToPhase(i, target);
                }
                break;
            }
        }

        super.update(target);
    }

    transitionToPhase(phaseIndex, target) {
        const phase = this.phases[phaseIndex];
        this.currentPhase = phaseIndex;
        
        // Cambiar ataque
        this.currentAttack = phase.attack;
        
        this.speed = phase.speed;
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 500,
            yoyo: true,
            ease: 'Power2.easeOut'
        });

        console.log(`Boss entra en fase ${phaseIndex + 1}`);
    }
}

export class SummonerEnemy extends EnemyTemplate {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, 'summon', config);
        
        this.summonTemplate = config.summonTemplate; // Factory function
        this.summonCooldown = config.summonCooldown || 3000;
        this.lastSummonTime = 0;
        this.maxSummons = config.maxSummons || 3;
        this.activeSummons = [];
    }

    update(target) {
        super.update(target);

        this.activeSummons = this.activeSummons.filter(s => s.active);
        if (this.isChasing && this.activeSummons.length < this.maxSummons) {
            const currentTime = this.scene.time.now;
            if (currentTime - this.lastSummonTime > this.summonCooldown) {
                this.summonAlly();
                this.lastSummonTime = currentTime;
            }
        }
    }

    summonAlly() {
        const offsetX = (Math.random() - 0.5) * 100;
            this.scene,
            this.x + offsetX,
            this.y + offsetY
        ;

        this.activeSummons.push(minion);
        this.scene.dungeonManager.getEnemyGroup().add(minion, true);
    }
}

export class ProceduralDungeonFactory {
    static createRandomDungeon(seed = Date.now(), difficulty = 1.0) {
        const config = new DungeonConfig(`Procedural Dungeon #${seed}`);
        
        Math.seedrandom = function(seed) {
            return Math.sin(seed++) * 10000;
        };

        config.width = 2000 + difficulty * 1000;
        config.height = 2000 + difficulty * 1000;

        config.registerLootPool('rare', new LootPool([
            { id: 'gold_25', weight: 50 * difficulty, quantity: 25 },
            { id: 'artifact', weight: 30 * difficulty, quantity: 1 }
        ]));


        const enemyTypes = ['goblin', 'orc', 'mage'];
        enemyTypes.forEach((type, index) => {
            config.registerEnemy(type, (scene, x, y) => {
                return new EnemyTemplate(scene, x, y, 'enemigo', {
                    name: type.toUpperCase(),
                    maxHealth: 50 + index * 20 + difficulty * 30,
                    moveSpeed: 70 + difficulty * 20,
                    attackDamage: 10 + index * 5 + difficulty * 10
                });
            });
        });


        const spawnerCount = Math.floor(3 + difficulty * 2);
        for (let i = 0; i < spawnerCount; i++) {
            const enemyType = enemyTypes[i % enemyTypes.length];
            config.addSpawner({
                name: `${enemyType} Spawner ${i}`,
                enemyTemplate: (scene, x, y) => 
                    config.enemies[enemyType](scene, x, y),
                maxAmount: Math.floor(3 + difficulty * 2),
                spawnInterval: (6000 - difficulty * 1000),
                spawnRadius: 300 + difficulty * 100,
                spawnCenterX: Math.random() * config.width,
                spawnCenterY: Math.random() * config.height,
                enabled: true
            });
        }

        return config;
    }
}

export class DynamicDifficultySystem {
    constructor(dungeonManager) {
        this.dungeonManager = dungeonManager;
        this.baseMultiplier = 1.0;
        this.deathStreak = 0;
        this.adjustmentInterval = 30000; // Cada 30 segundos
    }

    onPlayerKill() {
        this.playerKillStreak++;
        this.deathStreak = 0;
        
        if (this.playerKillStreak > 5) {
            this.increaseDifficulty();
        }
    }

    onPlayerDamage() {
        this.deathStreak++;
        this.playerKillStreak = 0;
        
        if (this.deathStreak > 3) {
            this.decreaseDifficulty();
        }
    }

    increaseDifficulty() {
        this.baseMultiplier += 0.1;
        this.dungeonManager.increaseDifficulty(0.1);
        console.log(`Dificultad aumentada: ${this.baseMultiplier.toFixed(1)}x`);
    }

    decreaseDifficulty() {
        this.baseMultiplier = Math.max(1.0, this.baseMultiplier - 0.05);
        console.log(`Dificultad reducida: ${this.baseMultiplier.toFixed(1)}x`);
    }

    getStats() {
        return {
            multiplier: this.baseMultiplier,
            killStreak: this.playerKillStreak,
            deathStreak: this.deathStreak
        };
    }
}

export class ChainLightningAttack extends AttackType {
    constructor(options = {}) {
        super({
            range: options.range || 200,
            damage: options.damage || 20,
            cooldown: options.cooldown || 1500,
            knockback: options.knockback || 150,
            chainCount: options.chainCount || 3,
            chainRange: options.chainRange || 150,
            ...options
        });
        this.chainCount = options.chainCount || 3;
        this.chainRange = options.chainRange || 150;
    }

    execute(scene, attacker, target, enemyGroup) {
        if (!target || !target.active) return false;

        const distance = Phaser.Math.Distance.Between(
            attacker.x, attacker.y,
            target.x, target.y
        );

        if (distance > this.range) return false;

        this.chainHit(scene, attacker, target, 0);

        return true;
    }

    chainHit(scene, attacker, currentTarget, chain) {
        if (!currentTarget || chain >= this.chainCount) return;

        if (currentTarget.receiveHit) {
            currentTarget.receiveHit(attacker, this.knockback);
        }

        const graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.beginPath();
        graphics.moveTo(attacker.x, attacker.y);
        graphics.lineTo(currentTarget.x, currentTarget.y);
        graphics.strokePath();

        scene.time.delayedCall(100, () => graphics.destroy());

        if (chain < this.chainCount - 1) {
            const nextTarget = this.findChainTarget(scene, currentTarget, attacker);
            if (nextTarget) {
                scene.time.delayedCall(200, () => {
                    this.chainHit(scene, attacker, nextTarget, chain + 1);
                });
            }
        }
    }

    findChainTarget(scene, currentTarget, attacker) {
        const enemyGroup = scene.dungeonManager.getEnemyGroup();
        let closest = null;
        let closestDistance = this.chainRange;

        enemyGroup.getChildren().forEach(enemy => {
            if (enemy === currentTarget || !enemy.active) return;

            const distance = Phaser.Math.Distance.Between(
                currentTarget.x, currentTarget.y,
                enemy.x, enemy.y
            );

            if (distance < closestDistance) {
                closest = enemy;
                closestDistance = distance;
            }
        });

        return closest;
    }
}

// ============================================
// EJEMPLO 7: USO DE TODOS LOS COMPONENTES
// ============================================

/*
// En tu escena:

class AdvancedDungeonScene extends Phaser.Scene {
    create() {
        // Crear configuración avanzada
        const config = new DungeonConfig('Advanced Dungeon');
        
        // Registrar enemigos avanzados
        config.registerEnemy('berserk', (scene, x, y) => 
            new BerserkEnemy(scene, x, y, { maxHealth: 100 })
        );

        config.registerEnemy('boss', (scene, x, y) => {
            const boss = new PhaseBoss(scene, x, y, {
                maxHealth: 500,
                phase1Attack: new MeleeAttack({ damage: 20 }),
                phase2Attack: new MeleeAttack({ damage: 30 }),
                phase3Attack: new AOEAttack({ damage: 40 })
            });
            return boss;
        });

        // Inicializar dungeon
        this.dungeonManager = new DungeonManager(this, config);
        this.dungeonManager.initialize();

        // Inicializar sistema de dificultad dinámico
        this.difficultySystem = new DynamicDifficultySystem(this.dungeonManager);

        // Escuchar eventos
        this.eventEmitter.on('enemyDied', () => {
            this.difficultySystem.onPlayerKill();
        });

        this.player.on('damaged', () => {
            this.difficultySystem.onPlayerDamage();
        });
    }

    update() {
        this.dungeonManager.update();
        
        // Mostrar dificultad actual
        const difficulty = this.difficultySystem.getStats();
        console.log(`Dificultad: ${difficulty.multiplier.toFixed(1)}x`);
    }
}
*/
