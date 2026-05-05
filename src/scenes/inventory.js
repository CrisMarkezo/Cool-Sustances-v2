import Phaser from 'phaser';

export default class Inventory extends Phaser.Scene {

    constructor() {
        super('inventory');
        this.inventoryItems = null;
        this.inventorySlots = null;
    }

    create(){
        try {
            const sourceSceneKey = this.scene.settings.data?.from;
            const sourceInventory = this.registry.get('inventory');

            // Informacion global del jugador
            const sourceData = this.registry.get('playerData');

            this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        const overlay = this.add.rectangle(500, 350, 1000, 700, 0x000000, 0.35)
            .setInteractive()
            .setDepth(1000);

        const panel = this.add.image(500, 350, 'inventario')
            .setDepth(1001);

            const formatNum = (value) => Number(Number(value || 0).toFixed(2));
            const statsText = 
                `${formatNum(sourceData.speed)}\n` +
                `${formatNum(sourceData.damage)}\n` +
                `${formatNum(300/sourceData.attackCooldown)}\n` +
                `${formatNum(sourceData.health)}`;

            this.add.text(550, 410, statsText, {
                fontFamily: '"Toonway", sans-serif',
                fontSize: '18px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5).setDepth(1004);

            this.add.text(500, 635, 'Presiona ESC para salir', {
                fontFamily: '"Toonway", sans-serif',
                fontSize: '22px',
                color: '#ffffff',
                stroke: '#000000',
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

        // Daba problemas
        // this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        //     this.keyEscape?.off('down', closeInventory);
        //     this.inventoryItems?.clear(true, true);
        //     this.inventorySlots?.clear(true, true);
        // });
        } catch (err) {
            console.error('❌ Error in Inventory.create():', err);
            console.error('Stack:', err.stack);
            throw err;
        }
    }
}