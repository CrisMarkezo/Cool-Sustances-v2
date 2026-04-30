export default class Inventory {
    constructor(rows = 2, cols = 2) {
        this.rows = rows;
        this.cols = cols;
        // Definimos un tamaño estándar para los iconos en el inventario
        this.slotSize = 1; 

        this.slots = Array.from({ length: rows }, () =>
            Array(cols).fill(null)
        );
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
    removeAt(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            const prev = this.slots[row][col];
            this.slots[row][col] = null;
            return prev;
        }
        return null;
    }
}