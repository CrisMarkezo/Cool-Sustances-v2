import PowerUp from "./powerup";
import Phaser from 'phaser';

export default class Halcon extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'halcon', 'attack_speed', 20);
    }

    applyEffect(player) {
        player.speed += this.parameter;
        this.destroy();
    }
}