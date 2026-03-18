import Phaser from 'phaser'
import WidgetSpriteImg1 from '../../assets/sprites/menu/widget1Menu.png'
import WidgetSpriteImg2 from '../../assets/sprites/menu/widget2Menu.png'

export default class WidgetSprite extends Phaser.Physics.Arcade.Sprite {
    static preload(scene) {
        scene.load.image("widget1", WidgetSpriteImg1);
        scene.load.image("widget2", WidgetSpriteImg2);
    }
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
