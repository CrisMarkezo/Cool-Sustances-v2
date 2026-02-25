import Interactable from "./Interactable";

export class Pickup extends Interactable
{
  constructor(player,scene, x, y, texture, frame) 
  {

        super(scene, x, y, texture, frame);
        
        scene.physics.add.overlap(player, this, () => {
                // Cuando se tocan, disparamos la interacción
                this.triggerInteraction('player');
                this.destroy();
            });
  }
  
}