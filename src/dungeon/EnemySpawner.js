import { EnemyTemplate } from './EnemyTemplate.js';

export class EnemySpawner {
    constructor(scene, enemyGroup) {
        this.scene = scene;
        this.enemyGroup = enemyGroup;
        this.spawners = [];
        this.activeSpawners = 0;
    }

    addSpawner(spawnerConfig) {
        const spawner = new SpawnerRule(this.scene, spawnerConfig);
        this.spawners.push(spawner);
        return spawner;
    }

    startAll() {
        this.spawners.forEach(spawner => spawner.start());
    }

    stopAll() {
        this.spawners.forEach(spawner => spawner.stop());
    }

    removeSpawner(spawner) {
        spawner.stop();
        this.spawners = this.spawners.filter(s => s !== spawner);
    }

    update() {
        this.spawners.forEach(spawner => {
            if (spawner.active && spawner.shouldSpawn()) {
                const enemy = spawner.spawn(this.enemyGroup);
                if (enemy) {
                    this.enemyGroup.add(enemy, true);
                }
            }
        });
    }

    getEnemyCount() {
        return this.enemyGroup.getChildren().filter(e => e.active).length;
    }

    clear() {
        this.stopAll();
        this.enemyGroup.clear(true, true);
        this.spawners = [];
    }
}

class SpawnerRule {
    constructor(scene, config = {}) {
        this.scene = scene;
        this.config = {
            name: config.name || 'Spawner',
            enemyTemplate: config.enemyTemplate, // Función que retorna un Enemy
            maxAmount: config.maxAmount || 5,
            spawnInterval: config.spawnInterval || 3000,
            spawnRadius: config.spawnRadius || 200,
            spawnCenterX: config.spawnCenterX || 0,
            spawnCenterY: config.spawnCenterY || 0,
            enabled: config.enabled !== false,
            spawnCondition: config.spawnCondition || null, // Función condicional
            ...config
        };

        this.active = this.config.enabled;
        this.lastSpawnTime = 0;
        this.spawnedCount = 0;
    }

    start() {
        this.active = true;
        this.lastSpawnTime = this.scene.time.now;
    }

    stop() {
        this.active = false;
    }

    shouldSpawn() {
        if (!this.active) return false;
        if (this.spawnedCount >= this.config.maxAmount) return false;

        const currentTime = this.scene.time.now;
        if (currentTime - this.lastSpawnTime < this.config.spawnInterval) return false;

        if (this.config.spawnCondition && !this.config.spawnCondition(this.scene)) {
            return false;
        }

        return true;
    }

    spawn(enemyGroup) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * this.config.spawnRadius;
        
        const x = this.config.spawnCenterX + Math.cos(angle) * radius;
        const y = this.config.spawnCenterY + Math.sin(angle) * radius;

        const enemy = this.config.enemyTemplate(this.scene, x, y);

        if (enemy) {
            this.spawnedCount++;
            this.lastSpawnTime = this.scene.time.now;

            this.scene.eventEmitter?.emit('enemySpawned', {
                enemy: enemy,
                spawner: this
            });
        }

        return enemy;
    }

    onEnemyDeath() {
        this.spawnedCount = Math.max(0, this.spawnedCount - 1);
    }

    reset() {
        this.spawnedCount = 0;
        this.lastSpawnTime = this.scene.time.now;
    }
}
