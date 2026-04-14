import { LootPool } from './LootPool.js';

export class DungeonConfig {
    constructor(name = 'Dungeon') {
        this.name = name;
        this.width = 2000;
        this.height = 2000;
        
        this.enemies = {};
        
        this.lootPools = {};
        
        this.spawners = [];
        
        this.obstacles = [];
        
        this.specialSpawns = [];
    }

    registerEnemy(key, enemyFactory) {
        this.enemies[key] = enemyFactory;
        return this;
    }

    registerLootPool(key, lootPool) {
        this.lootPools[key] = lootPool;
        return this;
    }

    addSpawner(spawnerConfig) {
        this.spawners.push(spawnerConfig);
        return this;
    }

    addObstacle(x, y, width, height) {
        this.obstacles.push({ x, y, width, height });
        return this;
    }

    addSpecialSpawn(x, y, enemyKey, config = {}) {
        this.specialSpawns.push({
            x, y,
            enemyKey,
            config
        });
        return this;
    }

    getConfig() {
        return {
            name: this.name,
            width: this.width,
            height: this.height,
            enemies: this.enemies,
            lootPools: this.lootPools,
            spawners: this.spawners,
            obstacles: this.obstacles,
            specialSpawns: this.specialSpawns
        };
    }
}

export class DungeonFactory {
    static createTestDungeon() {
        const config = new DungeonConfig('Test Dungeon');

        // Loot pools
        config.registerLootPool('common', new LootPool([
            { id: 'gold_5', weight: 50, quantity: 5 },
            { id: 'gold_10', weight: 30, quantity: 10 },
            { id: 'health_potion', weight: 20, quantity: 1 }
        ]));

        config.registerLootPool('rare', new LootPool([
            { id: 'gold_25', weight: 40, quantity: 25 },
            { id: 'rare_weapon', weight: 30, quantity: 1 },
            { id: 'health_potion_max', weight: 30, quantity: 1 }
        ]));

        return config;
    }

    static createNormalDungeon() {
        const config = new DungeonConfig('Normal Dungeon');
        config.width = 2500;
        config.height = 2500;

        // Loot pools
        config.registerLootPool('goblin', new LootPool([
            { id: 'gold_5', weight: 60, quantity: 5 },
            { id: 'gold_10', weight: 30, quantity: 10 },
            { id: 'iron_ore', weight: 10, quantity: 2 }
        ]));

        config.registerLootPool('orc', new LootPool([
            { id: 'gold_15', weight: 50, quantity: 15 },
            { id: 'gold_25', weight: 30, quantity: 25 },
            { id: 'rare_armor', weight: 20, quantity: 1 }
        ]));

        return config;
    }

    static createHardDungeon() {
        const config = new DungeonConfig('Hard Dungeon - Boss Lair');
        config.width = 3000;
        config.height = 3000;

        config.registerLootPool('boss', new LootPool([
            { id: 'legendary_weapon', weight: 40, quantity: 1 },
            { id: 'gold_100', weight: 35, quantity: 100 },
            { id: 'artifact', weight: 25, quantity: 1 }
        ]));

        return config;
    }
}
