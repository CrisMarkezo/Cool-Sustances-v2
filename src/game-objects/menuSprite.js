import Phaser from "phaser";
import onlyMenuImg1 from '../../../assets/sprites/menu/onlyMenu1.png'
import onlyMenyImg2 from '../../../assets/sprites/menu/onlyMenu2.png'
export default class MenuSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteName) {
        super(scene, x, y, spriteName);
        scene.add.existing(this);
    }

}