export class LootPool {
    constructor(items = []) {
        this.items = items;
        this.totalWeight = this.calculateTotalWeight();
    }

    calculateTotalWeight() {
        return this.items.reduce((sum, item) => sum + (item.weight || 1), 0);
    }

    rollLoot() {
        if (this.items.length === 0) return null;

        let random = Math.random() * this.totalWeight;
        
        for (const item of this.items) {
            random -= (item.weight || 1);
            if (random <= 0) {
                return {
                    id: item.id,
                    quantity: item.quantity || 1
                };
            }
        }

        return this.items[0];
    }

    addItem(id, weight = 1, quantity = 1) {
        this.items.push({ id, weight, quantity });
        this.totalWeight = this.calculateTotalWeight();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.totalWeight = this.calculateTotalWeight();
    }

    setItemWeight(id, weight) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.weight = weight;
            this.totalWeight = this.calculateTotalWeight();
        }
    }

    rollMultiple(count = 1) {
        const drops = [];
        for (let i = 0; i < count; i++) {
            const loot = this.rollLoot();
            if (loot) drops.push(loot);
        }
        return drops;
    }
}
