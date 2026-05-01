import PowerUp from "./powerup";
import Phaser from 'phaser';

export default class Redbull extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'redbull', 'speed', 10);
    }

    applyEffect(player) {
        player.attackCooldown = Math.max(0, player.attackCooldown - this.parameter);
        this.destroy();
    }
}