import { DungeonConfig } from './DungeonConfig.js';
import { EnemySpawner } from './EnemySpawner.js';
import { Pathfinding } from './Pathfinding.js';

export class DungeonManager {
    constructor(scene, dungeonConfig) {
        this.scene = scene;
        this.config = dungeonConfig;

        this.spawner = null;
        this.pathfinding = null;
        this.enemyGroup = null;

        this.isActive = false;
        this.difficulty = 1.0;

        // EventEmitter para comunicación
        if (!scene.eventEmitter) {
            scene.eventEmitter = new Phaser.Events.EventEmitter();
        }
    }

    initialize() {
        this.enemyGroup = this.scene.physics.add.group({
            runChildUpdate: false
        });

        this.pathfinding = new Pathfinding(
            this.config.width,
            this.config.height,
            50
        );

        this.config.obstacles.forEach(obstacle => {
            this.pathfinding.addObstacle(
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );
        });

        this.spawner = new EnemySpawner(this.scene, this.enemyGroup);

        this.setupSpawners();

        this.createSpecialSpawns();

        this.setupEventListeners();

        this.isActive = true;
    }

    setupSpawners() {
        this.config.spawners.forEach(spawnerConfig => {
            this.spawner.addSpawner(spawnerConfig);
        });

        this.spawner.startAll();
    }

    createSpecialSpawns() {
        this.config.specialSpawns.forEach(spawn => {
            const enemyFactory = this.config.enemies[spawn.enemyKey];
            if (enemyFactory) {
                const enemy = enemyFactory(this.scene, spawn.x, spawn.y, spawn.config);
                this.enemyGroup.add(enemy, true);
            }
        });
    }

    setupEventListeners() {
        this.scene.eventEmitter.on('enemyDied', (data) => {
            this.handleEnemyDeath(data);
        });

        this.scene.eventEmitter.on('enemySpawned', (data) => {
            this.handleEnemySpawned(data);
        });
    }

    handleEnemyDeath(data) {
        const { loot, x, y, enemy } = data;

        // Notificar al spawner
        this.spawner.spawners.forEach(spawner => {
            spawner.onEnemyDeath();
        });

        // Soltar el loot
        if (loot) {
            this.dropLoot(loot, x, y);
        }

        // Eventos adicionales
        this.scene.eventEmitter.emit('lootDropped', { loot, x, y });
    }

    handleEnemySpawned(data) {
        // Aquí puedes añadir lógica adicional cuando aparece un enemigo
    }

    dropLoot(loot, x, y) {
        // Emit evento para que la escena maneje el loot
        this.scene.eventEmitter.emit('createLootItem', {
            id: loot.id,
            quantity: loot.quantity,
            x: x,
            y: y
        });
    }

    update() {
        if (!this.isActive) return;

        // Update spawners
        this.spawner.update();

        // Update enemigos
        if (this.scene.player) {
            this.enemyGroup.getChildren().forEach(enemy => {
                if (enemy.active && enemy.update) {
                    enemy.update(this.scene.player);
                }
            });
        }
    }

    pause() {
        this.spawner.stopAll();
        this.isActive = false;
    }

    resume() {
        this.spawner.startAll();
        this.isActive = true;
    }

    destroy() {
        this.spawner.clear();
        this.enemyGroup.clear(true, true);
        this.pathfinding.clearGrid();
        this.scene.eventEmitter.removeAllListeners();
        this.isActive = false;
    }

    getStats() {
        return {
            enemyCount: this.spawner.getEnemyCount(),
            spawnerCount: this.spawner.spawners.length,
            difficulty: this.difficulty
        };
    }

    increaseDifficulty(amount = 0.1) {
        this.difficulty += amount;
    }

    getPathfinding() {
        return this.pathfinding;
    }

    getSpawner() {
        return this.spawner;
    }

    getEnemyGroup() {
        return this.enemyGroup;
    }
}
