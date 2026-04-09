export default class Inventory {
    constructor(rows = 3, cols = 3) {
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
}