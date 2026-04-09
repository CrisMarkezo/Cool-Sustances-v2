import Phaser from 'phaser';

export default class IconSprite extends Phaser.GameObjects.Sprite {
    static create(scene, x, y, iconTexture = 'accion', interval = 1200) {
        return new IconSprite(scene, x, y, iconTexture, interval);
    }

    constructor(scene, x, y, iconTexture = 'accion', interval = 1200) {
            super(scene, x, y, iconTexture);
            scene.add.existing(this);
            let frames = [];
            if (iconTexture === 'accion') {
                frames = ["accionIcon1", "accionIcon2", "accionIcon3", "accionIcon4"];
            }
            else {
                frames = ["dialogoIcon1", "dialogoIcon2", "dialogoIcon3"];
            }
            let frameIndex = 0;
            
            this.animationEvent = scene.time.addEvent({
                delay: interval,
                loop: true,
                callback: () => {
                    frameIndex = (frameIndex + 1) % frames.length;
                    this.setTexture(frames[frameIndex]);
                }
            });
    
            this.once(Phaser.GameObjects.Events.DESTROY, () => {
                this.animationEvent?.remove();
            });
        }

}