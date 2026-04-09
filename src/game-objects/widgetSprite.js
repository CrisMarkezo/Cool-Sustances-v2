import Phaser from 'phaser'


export default class WidgetSprite extends Phaser.Physics.Arcade.Sprite {
  
    constructor(scene, x, y, interval = 1200) {
        super(scene, x, y, "widget1");
        scene.add.existing(this);
        const frames = ["widget1", "widget2"];
        this.animationEvent = scene.time.addEvent({
            delay: interval,
            loop: true,
            callback: () => {
                this.setTexture(frames[0]);
                scene.time.delayedCall(100, () => {
                    this.setTexture(frames[1]);
                });
                scene.time.delayedCall(100 * 2, () => {
                    this.setTexture(frames[0]);
                });
                scene.time.delayedCall(100 , () => {
                    this.setTexture(frames[1]);
                });
                this.setTexture(frames[0]);
            }
        });

        this.once(Phaser.GameObjects.Events.DESTROY, () => {
            this.animationEvent?.remove();
        });
    }
}
