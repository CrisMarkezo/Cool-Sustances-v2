import Phaser from 'phaser';
import Player from '../../player.js';
import { DungeonManager } from '../../dungeon/DungeonManager.js';
import { DungeonConfig } from '../../dungeon/DungeonConfig.js';
import { EnemyTemplate } from '../../dungeon/EnemyTemplate.js';
import { LootPool } from '../../dungeon/LootPool.js';
import { MeleeAttack, RangedAttack, AOEAttack } from '../../dungeon/AttackSystem.js';

export class Dungeon extends Phaser.Scene {
    constructor() {
        super({ key: 'MiMazmorra' });
    }

    init(data) {
        this.spawnX = data.spawnX || 400; 
        this.spawnY = data.spawnY || 300;
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
        const config = new DungeonConfig('MI MAZMORRA');
        config.width = 2000;
        config.height = 2000;

        config.registerLootPool('common', new LootPool([
            { id: 'gold_5', weight: 60, quantity: 5 },
            { id: 'gold_10', weight: 30, quantity: 10 },
            { id: 'health_potion', weight: 10, quantity: 1 }
        ]));

        config.registerLootPool('rare', new LootPool([
            { id: 'gold_50', weight: 50, quantity: 50 },
            { id: 'rare_weapon', weight: 35, quantity: 1 },
            { id: 'mana_potion', weight: 15, quantity: 2 }
        ]));


        config.registerEnemy('enemigo_basico', (scene, x, y) => {
            const enemy = new EnemyTemplate(scene, x, y, 'enemigo', {
                name: 'Enemigo Básico',
                type: 'melee',
                maxHealth: 50,
                detectionRange: 120,
                attackRange: 25,
                moveSpeed: 70,
                attackDamage: 10,
                attackCooldown: 900,
                lootPool: config.lootPools['common'],
                attackType: new MeleeAttack({
                    range: 25,
                    damage: 10,
                    cooldown: 900
                })
            });

            enemy.setPatrolWaypoints([
                { x: x, y: y },
                { x: x + 100, y: y }
            ]);

            return enemy;
        });

        config.registerEnemy('enemigo_ranged', (scene, x, y) => {
            const enemy = new EnemyTemplate(scene, x, y, 'enemigo', {
                name: 'Arquero',
                type: 'ranged',
                maxHealth: 35,
                detectionRange: 200,
                attackRange: 150,
                moveSpeed: 60,
                attackDamage: 8,
                attackCooldown: 1200,
                lootPool: config.lootPools['common'],
                attackType: new RangedAttack({
                    range: 150,
                    damage: 8,
                    cooldown: 1200,
                    projectileSpeed: 250
                })
            });

            enemy.setPatrolWaypoints([
                { x: x, y: y },
                { x: x + 150, y: y - 50 }
            ]);

            return enemy;
        });

        config.registerEnemy('boss', (scene, x, y) => {
            const enemy = new EnemyTemplate(scene, x, y, 'enemigo', {
                name: 'Jefe Final',
                type: 'melee',
                maxHealth: 200,
                detectionRange: 200,
                attackRange: 35,
                moveSpeed: 70,
                attackDamage: 30,
                attackCooldown: 1000,
                lootPool: config.lootPools['rare'],
                attackType: new MeleeAttack({
                    range: 35,
                    damage: 30,
                    cooldown: 1000,
                    knockback: 250
                })
            });

            enemy.setScale(1.5);
            return enemy;
        });

        config.addSpawner({
            name: 'Spawn Enemigos Básicos',
            enemyTemplate: (scene, x, y) => config.enemies['enemigo_basico'](scene, x, y),
            maxAmount: 5,
            spawnInterval: 4000,
            spawnRadius: 300,
            spawnCenterX: 400,
            spawnCenterY: 600,
            enabled: true
        });

        config.addSpawner({
            name: 'Spawn Arqueros',
            enemyTemplate: (scene, x, y) => config.enemies['enemigo_ranged'](scene, x, y),
            maxAmount: 3,
            spawnInterval: 5000,
            spawnRadius: 250,
            spawnCenterX: 1000,
            spawnCenterY: 500,
            enabled: true
        });

        config.addSpecialSpawn(1200, 1200, 'boss', {});

        return config;
    }

    setupCollisions() {
        const enemyGroup = this.dungeonManager.getEnemyGroup();

        this.physics.add.collider(enemyGroup, enemyGroup);

        this.physics.add.overlap(
            this.player.attackHitbox,
            enemyGroup,
            (hitbox, enemy) => {
                if (this.player.isAttacking && enemy.active && enemy.canBeHit) {
                    enemy.receiveHit(this.player);
                }
            }
        );

        this.physics.add.overlap(
            this.player,
            this.grupoItems,
            (player, item) => {
                player.nearbyInteractable = item;
            }
        );
    }

    setupEventListeners() {
        this.eventEmitter.on('createLootItem', (data) => {
            this.dropLoot(data);
        });

        this.eventEmitter.on('enemyDied', (data) => {
        });
    }

    dropLoot(data) {
        const item = this.add.text(data.x, data.y, data.id, {
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
            id: data.id,
            quantity: data.quantity
        };

        this.grupoItems.add(item);

        this.time.delayedCall(30000, () => {
            if (item.active) item.destroy();
        });
    }

    update(time, delta) {
        this.player.nearbyInteractable = null;
        this.dungeonManager.update();
    }
}
