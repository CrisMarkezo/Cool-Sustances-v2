import PowerUp from "./powerup";
import Phaser from 'phaser';

export default class Halcon extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'halcon', 'attack_speed', 30);
    }

    applyEffect(player) {
        player.attackCooldown = Math.max(0, player.attackCooldown - this.parameter);

        // Actualizamos la data del jugador
        const sourceData = this.scene.registry.get('playerData');
        sourceData.attackCooldown = player.attackCooldown;
        this.scene.registry.set('playerData', sourceData); 

        this.destroy();
    }
}