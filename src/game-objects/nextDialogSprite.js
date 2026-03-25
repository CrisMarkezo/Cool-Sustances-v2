import Phaser from 'phaser'

export default class nextDialogSprite extends Phaser.GameObjects.Sprite {
    static create(scene, x, y) {
        return new nextDialogSprite(scene, x, y);
    }
    
    constructor(scene, x, y) {
        super(scene, x, y, 'patas');
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.animationEvent = scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.setVisible(!this.visible);
            }
        });
    }

    destroy(fromScene) {
        if (this.animationEvent) {
            this.animationEvent.remove(false);
            this.animationEvent = null;
        }
        super.destroy(fromScene);
    }
}