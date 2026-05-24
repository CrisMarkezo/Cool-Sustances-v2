export default class Inventory {
    constructor(rows = 2, cols = 2) {
        this.rows = rows;
        this.cols = cols;
        this.slots = Array.from({ length: rows }, () =>
            Array(cols).fill(null)
        );
    }

    getCapacity() {
        return this.rows * this.cols;
    }

    addItem(item) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.slots[i][j] === null) {
                    this.slots[i][j] = item;
                    console.log("Inventario:", this.slots);
                    return true;
                }
            }
        }
        console.log("Inventario lleno");
        return false;
    }

    // Devuelve todos los items en el inventario aplanados en un array
    getFlatItems() {
        return this.slots.flat().filter(Boolean);
    }

    // Comprueba si hay espacio libre en el inventario
    hasSpace() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.slots[i][j] === null) return true;
            }
        }
        return false;
    }

    // Elimina el item en una posición concreta (fila, col)
    removeItem(identifier) {
        if (identifier == null) return null;
        const idStr = String(identifier).toLowerCase();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const item = this.slots[i][j];
                if (!item) continue;
                const name = item.name ? String(item.name).toLowerCase() : null;
                const id = item.id ? String(item.id).toLowerCase() : null;
                if (name === idStr || id === idStr) {
                    const prev = this.slots[i][j];
                    this.slots[i][j] = null;
                    return prev;
                }
            }
        }
        return null;
    }

    hasItem(name) {
        if (name == null) return false;
        const idStr = String(name).toLowerCase();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const item = this.slots[i][j];
                if (!item) continue;
                const itemName = item.name ? String(item.name).toLowerCase() : null;
                const itemId = item.id ? String(item.id).toLowerCase() : null;
                if (itemName === idStr || itemId === idStr) {
                    return true;
                }
            }
        }
        return false;
    }
}