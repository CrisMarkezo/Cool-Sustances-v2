import PowerUp from "./powerup";
import Phaser from 'phaser';

export default class Vaper extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'vaper', 'damage', 10);
    }

    applyEffect(player) {
        player.damage += this.parameter;
        this.destroy();
    }
}