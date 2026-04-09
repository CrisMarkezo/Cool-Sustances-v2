import Phaser from 'phaser';

export default class IconSprite extends Phaser.GameObjects.Sprite {
    static create(scene, x, y, iconTexture = 'accion', interval = 1200) {
        return new IconSprite(scene, x, y, iconTexture, interval);
    }

    constructor(scene, x, y, iconTexture = 'accion', interval = 1200) {
            const frames = iconTexture === 'accion'
                ? ['accionIcon1', 'accionIcon2', 'accionIcon3', 'accionIcon4']
                : ['dialogoIcon1', 'dialogoIcon2', 'dialogoIcon3'];

            super(scene, x, y, frames[0]);
            scene.add.existing(this);
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