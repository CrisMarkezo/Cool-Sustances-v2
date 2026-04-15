import Phaser from 'phaser'

export default class InventorySprite {
    static create(scene, x, y) {
        if (!scene.anims.exists('catBoxAnim')) {
            scene.anims.create({
                key: 'catBoxAnim',
                frames: scene.anims.generateFrameNumbers('catBox', { start: 0, end: 3 }),
                frameRate: 4,
                repeat: -1
            });
        }

        return scene.add
            .sprite(x, y, 'catBox')
            .play('catBoxAnim')
            .setInteractive({ useHandCursor: true });
    }
}