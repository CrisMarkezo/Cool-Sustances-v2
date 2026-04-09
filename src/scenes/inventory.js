import Phaser from 'phaser';

export default class Inventory extends Phaser.Scene {

    constructor() {
        super('inventory');
    }

    create(){
        const sourceSceneKey = this.scene.settings.data?.from;

        const overlay = this.add
            .rectangle(500, 350, 1000, 700, 0x000000, 0.35)
            .setInteractive();

        const panel = this.add.image(500, 350, 'inventario');

        const closeInventory = () => {
            this.scene.stop();
            if (sourceSceneKey) {
                this.scene.resume(sourceSceneKey);
            }
        };

        overlay.on('pointerdown', (pointer) => {
            const bounds = panel.getBounds();
            const clickedInsidePanel = Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y);

            if (!clickedInsidePanel) {
                closeInventory();
            }
        });

        this.input.keyboard?.on('keydown-ESC', closeInventory);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.input.keyboard?.off('keydown-ESC', closeInventory);
        });
    }
}
