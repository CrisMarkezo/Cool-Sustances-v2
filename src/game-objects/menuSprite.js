import Phaser from "phaser";
import onlyMenuImg1 from '../../assets/sprites/menu/onlyMenu1.png'
import onlyMenuImg12 from '../../assets/sprites/menu/onlyMenu1.2.png'
import onlyMenuImg13 from '../../assets/sprites/menu/onlyMenu1.3.png'
import onlyMenuImg14 from '../../assets/sprites/menu/onlyMenu1.4.png'
import onlyMenuImg15 from '../../assets/sprites/menu/onlyMenu1.5.png'
import onlyMenuImg16 from '../../assets/sprites/menu/onlyMenu1.6.png'
import onlyMenuImg17 from '../../assets/sprites/menu/onlyMenu1.7.png'
import onlyMenuImg18 from '../../assets/sprites/menu/onlyMenu1.8.png'
import onlyMenuImg2 from '../../assets/sprites/menu/onlyMenu2.png'
export default class MenuSprite extends Phaser.Physics.Arcade.Sprite {
    static preload(scene) {
        scene.load.image("onlyMenu1", onlyMenuImg1);
        scene.load.image("onlyMenu1.2", onlyMenuImg12);
        scene.load.image("onlyMenu1.3", onlyMenuImg13);
        scene.load.image("onlyMenu1.4", onlyMenuImg14);
        scene.load.image("onlyMenu1.5", onlyMenuImg15);
        scene.load.image("onlyMenu1.6", onlyMenuImg16);
        scene.load.image("onlyMenu1.7", onlyMenuImg17);
        scene.load.image("onlyMenu1.8", onlyMenuImg18);
        scene.load.image("onlyMenu2", onlyMenuImg2);
    }
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