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
    removeItem(name) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.slots[i][j] && this.slots[i][j].name === name) {
                    const prev = this.slots[i][j];
                    this.slots[i][j] = null;
                    return prev;
                }
            }
        }
        return null;
    }

    hasItem(name) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.slots[i][j] && this.slots[i][j].name === name) {
                    return true;
                }
            }
        }        return false;
    }
}