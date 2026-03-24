import Phaser from 'phaser'
import catBox from '../../assets/sprites/dia/Box3.png'

export default class InventorySprite {
    static preload(scene) {
        scene.load.spritesheet('catBox', catBox, { frameWidth: 90, frameHeight: 90 });
    }

    static create(scene, x, y) {
        if (!scene.anims.exists('catBoxAnim')) {
            scene.anims.create({
                key: 'catBoxAnim',
                frames: scene.anims.generateFrameNumbers('catBox', { start: 0, end: 3 }),
                frameRate: 4,
                repeat: -1
            });
        }

        return scene.add.sprite(x, y, 'catBox').play('catBoxAnim');
    }
}