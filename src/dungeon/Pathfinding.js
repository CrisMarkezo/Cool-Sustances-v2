export class Pathfinding {
    constructor(gridWidth = 2000, gridHeight = 2000, cellSize = 50) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.cellSize = cellSize;
        this.cols = Math.ceil(gridWidth / cellSize);
        this.rows = Math.ceil(gridHeight / cellSize);
        
        this.grid = this.createEmptyGrid();
    }

    createEmptyGrid() {
        const grid = [];
        for (let y = 0; y < this.rows; y++) {
            grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                grid[y][x] = 0;
            }
        }
        return grid;
    }

    addObstacle(x, y, width, height) {
        const startX = Math.floor(x / this.cellSize);
        const startY = Math.floor(y / this.cellSize);
        const endX = Math.ceil((x + width) / this.cellSize);
        const endY = Math.ceil((y + height) / this.cellSize);

        for (let py = Math.max(0, startY); py < Math.min(this.rows, endY); py++) {
            for (let px = Math.max(0, startX); px < Math.min(this.cols, endX); px++) {
                this.grid[py][px] = 1;
            }
        }
    }

    getDirection(fromX, fromY, toX, toY) {
        const dx = toX - fromX;
        const dy = toY - fromY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return { x: 0, y: 0 };

        return {
            x: dx / distance,
            y: dy / distance
        };
    }

    findPath(fromX, fromY, toX, toY) {
        const startCol = Math.floor(fromX / this.cellSize);
        const startRow = Math.floor(fromY / this.cellSize);
        const endCol = Math.floor(toX / this.cellSize);
        const endRow = Math.floor(toY / this.cellSize);

        if (startCol < 0 || startCol >= this.cols || 
            startRow < 0 || startRow >= this.rows ||
            endCol < 0 || endCol >= this.cols ||
            endRow < 0 || endRow >= this.rows) {
            return null;
        }

        const path = [];
        const visited = new Set();
        const openSet = [{ x: startCol, y: startRow, g: 0, h: this.heuristic(startCol, startRow, endCol, endRow) }];

        while (openSet.length > 0) {
            let current = openSet[0];
            let currentIndex = 0;

            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].g + openSet[i].h < current.g + current.h) {
                    current = openSet[i];
                    currentIndex = i;
                }
            }

            if (current.x === endCol && current.y === endRow) {
                path.push({ x: toX, y: toY });
                return path;
            }

            openSet.splice(currentIndex, 1);
            const key = `${current.x},${current.y}`;
            visited.add(key);

            const neighbors = [
                { x: current.x + 1, y: current.y },
                { x: current.x - 1, y: current.y },
                { x: current.x, y: current.y + 1 },
                { x: current.x, y: current.y - 1 },
                { x: current.x + 1, y: current.y + 1 },
                { x: current.x - 1, y: current.y + 1 },
                { x: current.x + 1, y: current.y - 1 },
                { x: current.x - 1, y: current.y - 1 }
            ];

            for (const neighbor of neighbors) {
                const nKey = `${neighbor.x},${neighbor.y}`;
                if (visited.has(nKey)) continue;

                if (neighbor.x < 0 || neighbor.x >= this.cols ||
                    neighbor.y < 0 || neighbor.y >= this.rows ||
                    this.grid[neighbor.y][neighbor.x] === 1) {
                    continue;
                }

                const g = current.g + 1;
                const h = this.heuristic(neighbor.x, neighbor.y, endCol, endRow);
                const neighborInOpen = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);

                if (!neighborInOpen || g < neighborInOpen.g) {
                    openSet.push({ x: neighbor.x, y: neighbor.y, g, h });
                }
            }
        }

        return null;
    }

    heuristic(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    clearGrid() {
        this.grid = this.createEmptyGrid();
    }
}
