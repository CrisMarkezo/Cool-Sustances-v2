import Phaser from 'phaser';
import Player from '../../player.js';
import { DungeonManager } from '../../dungeon/DungeonManager.js';
import { DungeonFactory, DungeonConfig } from '../../dungeon/DungeonConfig.js';
import { EnemyTemplate } from '../../dungeon/EnemyTemplate.js';
import { LootPool } from '../../dungeon/LootPool.js';
import { MeleeAttack, RangedAttack, AOEAttack } from '../../dungeon/AttackSystem.js';

export class Mazmorra extends Phaser.Scene {
    constructor() {
        super({ key: 'Mazmorra' });
    }

    init(data) {
        this.spawnX = data.spawnX || 400; 
        this.spawnY = data.spawnY || 300;
        this.dungeonData = data.dungeonData || null;
    }

    preload() {
    }

    create() {
        this.physics.world.setBounds(0, 0, 2000, 2000);

        this.player = new Player(this, this.spawnX, this.spawnY);
        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        
        this.grupoItems = this.physics.add.group();

        const dungeonConfig = this.createDungeonConfig();

        this.dungeonManager = new DungeonManager(this, dungeonConfig);
        this.dungeonManager.initialize();

        this.setupCollisions();

        this.setupEventListeners();
    }

    createDungeonConfig() {
        const config = new DungeonConfig('Mazmorra Noche');
        config.width = 2000;
        config.height = 2000;

        config.registerLootPool('goblin_loot', new LootPool([
            { id: 'gold_5', weight: 60, quantity: 5 },
            { id: 'gold_10', weight: 25, quantity: 10 },
            { id: 'health_potion', weight: 15, quantity: 1 }
        ]));

        config.registerLootPool('orc_loot', new LootPool([
            { id: 'gold_15', weight: 50, quantity: 15 },
            { id: 'gold_25', weight: 30, quantity: 25 },
            { id: 'rare_armor', weight: 15, quantity: 1 },
            { id: 'health_potion', weight: 5, quantity: 2 }
        ]));

        config.registerLootPool('boss_loot', new LootPool([
            { id: 'legendary_weapon', weight: 40, quantity: 1 },
            { id: 'gold_100', weight: 35, quantity: 100 },
            { id: 'artifact', weight: 25, quantity: 1 }
        ]));

        config.registerEnemy('goblin_melee', (scene, x, y, customConfig = {}) => {
            const enemy = new EnemyTemplate(scene, x, y, 'enemigo', {
                name: 'Goblin Melee',
                type: 'melee',
                maxHealth: 40,
                detectionRange: 120,
                attackRange: 25,
                moveSpeed: 70,
                attackDamage: 10,
                attackCooldown: 900,
                lootPool: config.lootPools['goblin_loot'],
                attackType: new MeleeAttack({
                    range: 25,
                    damage: 10,
                    cooldown: 900,
                    knockback: 150
                }),
                ...customConfig
            });

            enemy.setPatrolWaypoints([
                { x: x, y: y },
                { x: x + 100, y: y },
                { x: x + 100, y: y + 80 },
                { x: x, y: y + 80 }
            ]);

            return enemy;
        });

        config.registerEnemy('goblin_ranged', (scene, x, y, customConfig = {}) => {
            const enemy = new EnemyTemplate(scene, x, y, 'enemigo', {
                name: 'Goblin Ranged',
                type: 'ranged',
                maxHealth: 30,
                detectionRange: 200,
                attackRange: 150,
                moveSpeed: 60,
                attackDamage: 8,
                attackCooldown: 1200,
                lootPool: config.lootPools['goblin_loot'],
                attackType: new RangedAttack({
                    range: 150,
                    damage: 8,
                    cooldown: 1200,
                    knockback: 100,
                    projectileSpeed: 250
                }),
                ...customConfig
            });

            enemy.setPatrolWaypoints([
                { x: x, y: y },
                { x: x + 150, y: y },
                { x: x + 150, y: y - 80 },
                { x: x, y: y - 80 }
            ]);

            return enemy;
        });

        config.registerEnemy('orc_warrior', (scene, x, y, customConfig = {}) => {
                name: 'Orc Warrior',
                type: 'melee',
                maxHealth: 90,
                detectionRange: 150,
                attackRange: 30,
                moveSpeed: 75,
                attackDamage: 20,
                attackCooldown: 1000,
                lootPool: config.lootPools['orc_loot'],
                attackType: new MeleeAttack({
                    range: 30,
                    damage: 20,
                    cooldown: 1000,
                    knockback: 220
                }),
                ...customConfig
            });

            enemy.setPatrolWaypoints([
                { x: x, y: y },
                { x: x + 120, y: y },
                { x: x + 120, y: y + 100 },
                { x: x, y: y + 100 }
            ]);

            return enemy;
        });

        config.registerEnemy('mage', (scene, x, y, customConfig = {}) => {
                name: 'Mage',
                type: 'aoe',
                maxHealth: 50,
                detectionRange: 180,
                attackRange: 120,
                moveSpeed: 50,
                attackDamage: 25,
                attackCooldown: 1500,
                lootPool: config.lootPools['orc_loot'],
                attackType: new AOEAttack({
                    range: 120,
                    damage: 25,
                    cooldown: 1500,
                    knockback: 200,
                    radius: 80
                }),
                ...customConfig
            });

            enemy.setPatrolWaypoints([
                { x: x, y: y },
                { x: x + 100, y: y - 100 },
                { x: x - 100, y: y }
            ]);

            return enemy;
        });

        config.registerEnemy('boss_golem', (scene, x, y, customConfig = {}) => {
                name: 'Golem Boss',
                type: 'melee',
                maxHealth: 250,
                detectionRange: 200,
                attackRange: 40,
                moveSpeed: 60,
                attackDamage: 35,
                attackCooldown: 1200,
                lootPool: config.lootPools['boss_loot'],
                attackType: new MeleeAttack({
                    range: 40,
                    damage: 35,
                    cooldown: 1200,
                    knockback: 300
                }),
                ...customConfig
            });

            enemy.setScale(1.5);
            enemy.setPatrolWaypoints([
                { x: x, y: y },
                { x: x + 150, y: y },
                { x: x, y: y - 150 }
            ]);

            return enemy;
        });

        config.addSpawner({
            name: 'Goblin Melee Spawns',
            enemyTemplate: (scene, x, y) => config.enemies['goblin_melee'](scene, x, y),
            maxAmount: 5,
            spawnInterval: 4000,
            spawnRadius: 300,
            spawnCenterX: 400,
            spawnCenterY: 600,
            enabled: true
        });

        config.addSpawner({
            name: 'Goblin Ranged Spawns',
            enemyTemplate: (scene, x, y) => config.enemies['goblin_ranged'](scene, x, y),
            maxAmount: 3,
            spawnInterval: 5000,
            spawnRadius: 250,
            spawnCenterX: 1000,
            spawnCenterY: 400,
            enabled: true
        });

        config.addSpawner({
            name: 'Orc Warrior Spawns',
            enemyTemplate: (scene, x, y) => config.enemies['orc_warrior'](scene, x, y),
            maxAmount: 2,
            spawnInterval: 7000,
            spawnRadius: 350,
            spawnCenterX: 1400,
            spawnCenterY: 1000,
            enabled: true
        });

        config.addSpawner({
            name: 'Mage Spawns',
            enemyTemplate: (scene, x, y) => config.enemies['mage'](scene, x, y),
            maxAmount: 2,
            spawnInterval: 8000,
            spawnRadius: 200,
            spawnCenterX: 600,
            spawnCenterY: 1500,
            enabled: true
        });

        config.addSpecialSpawn(1200, 1500, 'boss_golem', {});

        return config;
    }

    setupCollisions() {
        const dungeonEnemyGroup = this.dungeonManager.getEnemyGroup();

        this.physics.add.collider(dungeonEnemyGroup, dungeonEnemyGroup);

        this.physics.add.overlap(this.player.attackHitbox, dungeonEnemyGroup, (hitbox, enemigo) => {
            if (this.player.isAttacking && enemigo.active && enemigo.canBeHit) {
                enemigo.receiveHit(this.player);
            }
        });

        this.physics.add.overlap(this.player, this.grupoItems, (jugador, item) => {
            jugador.nearbyInteractable = item;
        });
    }

    setupEventListeners() {
        this.eventEmitter.on('createLootItem', (data) => {
            this.crearItemDropeado(data.id, data.x, data.y, data.quantity);
        });

        this.eventEmitter.on('enemyDied', () => {
        });
    }

    crearItemDropeado(itemId, x, y, quantity) {
        const item = this.add.text(x, y, itemId, {
            font: 'bold 10px Arial',
            fill: '#ffcc00'
        });

        this.physics.add.existing(item);
        item.body.setBounce(0.5);
        item.body.setVelocity(
            (Math.random() - 0.5) * 200,
            -150 + Math.random() * 100
        );

        item.itemData = {
            id: itemId,
            quantity: quantity
        };

        this.grupoItems.add(item);

        this.time.delayedCall(30000, () => {
            if (item.active) item.destroy();
        });
    }

    update(time, delta) {
        this.dungeonManager.update();
    }
}