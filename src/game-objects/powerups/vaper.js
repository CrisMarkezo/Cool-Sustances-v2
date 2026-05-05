import PowerUp from "./powerup";
import Phaser from 'phaser';

export default class Vaper extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'vaper', 'damage', 10);
    }

    applyEffect(player) {
        player.damage += this.parameter;
       
        // Actualizamos la data del jugador
        const sourceData = this.scene.registry.get('playerData');
        sourceData.damage = player.damage;
        this.scene.registry.set('playerData', sourceData); 

        this.destroy();
    }
}