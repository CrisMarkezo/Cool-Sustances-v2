import Phaser from 'phaser';

export default class Inventory extends Phaser.Scene {

    constructor() {
        super('Inventory');

        this.inventoryItems = null;
        this.inventorySlots = null;
    }

    create(){

        const sourceSceneKey = this.scene.settings.data?.from;
        const sourceInventory = this.registry.get('inventory');

        const overlay = this.add.rectangle(500, 350, 1000, 700, 0x000000, 0.35)
            .setInteractive()
            .setDepth(1000);

        const panel = this.add.image(500, 350, 'inventario')
            .setDepth(1001);

        this.add.text(500, 635, 'ESC para salir', {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '22px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(1004);

        this.inventorySlots = this.add.group();
        this.inventoryItems = this.add.group();

        const slots = [
            { x: -120, y: -135 },
            { x: 120, y: -135 },
            { x: -170, y: -20 },
            { x: 170, y: -20 }
        ];

        const items = sourceInventory
            ? sourceInventory.getFlatItems()
            : [];

        slots.forEach((s, i) => {

            const x = panel.x + s.x;
            const y = panel.y + s.y;

            this.add.ellipse(x, y, 86, 86, 0x2b1a12, 0.18)
                .setStrokeStyle(2, 0xf2c58a, 0.4)
                .setDepth(1002);

            const item = items[i];
            if (!item) return;

            const key = typeof item.texture === 'string'
                ? item.texture
                : item.texture?.key;

            if (!key) return;

            this.add.image(x, y, key)
                .setDisplaySize(56, 56)
                .setDepth(1003);
        });

        const closeInventory = () => {

            if (sourceSceneKey) {
                this.scene.resume(sourceSceneKey);
            }

            this.scene.stop();
        };

        overlay.on('pointerdown', (pointer) => {

            const bounds = panel.getBounds();

            const inside = Phaser.Geom.Rectangle.Contains(
                bounds,
                pointer.x,
                pointer.y
            );

            if (!inside) closeInventory();
        });

        this.input.keyboard.on('keydown-ESC', closeInventory);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.input.keyboard.off('keydown-ESC', closeInventory);
        });
    }
}