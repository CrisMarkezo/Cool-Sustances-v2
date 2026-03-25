import Phaser from "phaser";

export default class MenuSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, interval = 200) {
        super(scene, x, y, "onlyMenu1");
        scene.add.existing(this);
        const frames = [
            "onlyMenu1",
            "onlyMenu1.2",
            "onlyMenu1.3",
            "onlyMenu1.4",
            "onlyMenu1.5",
            "onlyMenu1.6",
            "onlyMenu1.7",
            "onlyMenu1.8",
            "onlyMenu2"
        ];
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