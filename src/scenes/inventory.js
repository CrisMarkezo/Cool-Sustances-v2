import Phaser from 'phaser';

export default class Inventory extends Phaser.Scene {

    constructor() {
        super('inventory');
        this.inventoryItems = null;
        this.inventorySlots = null;
        this.keyEscape = null;
    }

    create(){
        try {
            const sourceSceneKey = this.scene.settings.data?.from;
            
            const sourceInventory = this.registry.get('inventory');

            this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

            const overlay = this.add
                .rectangle(500, 350, 1000, 700, 0x000000, 0.35)
                .setInteractive();
            overlay.setDepth(1000);

            const panel = this.add.image(500, 350, 'inventario');
            panel.setDepth(1001);

            this.add.text(500, 635, 'Presiona ESC para salir', {
                fontFamily: '"Toonway", sans-serif',
                fontSize: '22px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5).setDepth(1004);

            this.inventorySlots = this.add.group();
            this.inventoryItems = this.add.group();

            const slotLayout = [
                { x: -120, y: -135 },
                { x: 120, y: -135 },
                { x: -170, y: -20 },
                { x: 170, y: -20 },
            ];

            const inventoryObjects = sourceInventory
                ? sourceInventory.getFlatItems()
                : [];

            const visibleSlots = sourceInventory && typeof sourceInventory.getCapacity === 'function'
                ? slotLayout.slice(0, sourceInventory.getCapacity())
                : slotLayout;

            visibleSlots.forEach((slot, index) => {
                const slotX = panel.x + slot.x;
                const slotY = panel.y + slot.y;

                const slotMarker = this.add.ellipse(slotX, slotY, 86, 86, 0x2b1a12, 0.18)
                    .setStrokeStyle(2, 0xf2c58a, 0.4)
                    .setDepth(1002);

                this.inventorySlots.add(slotMarker);

                const item = inventoryObjects[index];

                if (!item) {
                    return;
                }

                const textureKey = typeof item.texture === 'string'
                    ? item.texture
                    : item.texture?.key;

                if (!textureKey) {
                    return;
                }

                const icon = this.add.image(slotX, slotY, textureKey)
                    .setDisplaySize(56, 56)
                    .setScrollFactor(0)
                    .setDepth(1003);

                this.inventoryItems.add(icon);
            });

            const closeInventory = () => {
                if (sourceSceneKey && this.scene.isPaused(sourceSceneKey)) {
                    this.scene.resume(sourceSceneKey);
                }
                this.scene.stop();
            };

            overlay.on('pointerdown', (pointer) => {
                const bounds = panel.getBounds();
                const clickedInsidePanel = Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y);

                if (!clickedInsidePanel) {
                    closeInventory();
                }
            });

            this.keyEscape?.on('down', closeInventory);

            this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
                this.keyEscape?.off('down', closeInventory);
                this.inventoryItems?.clear(true, true);
                this.inventorySlots?.clear(true, true);
            });
        } catch (err) {
            console.error('❌ Error in Inventory.create():', err);
            console.error('Stack:', err.stack);
            throw err;
        }
    }
}
