import GameEntity from './gameEntity.js';

export default class Scratcher extends GameEntity {

    constructor(scene, x, y) {
        super(scene, x, y, 'rascador', 0);
        this.setScale(2);
        
        // Configurar las físicas del propio rascador (el sprite visible)
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.isScratching = false;

        // Crear la hurtbox pequeña (10x10) para el área de contacto real
        this.hurtbox = scene.add.rectangle(x, y, 10, 10);
        scene.physics.add.existing(this.hurtbox);
        this.hurtbox.body.setSize(10, 10);
        this.hurtbox.body.setAllowGravity(false);
        this.hurtbox.body.moves = false; // No se mueve por físicas externas
        this.hurtbox.setVisible(false); // Oculta el rectángulo rojo si no lo necesitas para debugear
        this.hurtbox.setDepth(5);
    }

    // Ya no necesitas el preUpdate/update de sincronización manual aquí, 
    // porque al ser estático (moves = false) se queda en su x, y iniciales.

    scratch() {
        if (this.isScratching) return;
        this.isScratching = true;
        
        this.anims.play('rascador_scratch');

        this.once('animationcomplete', () => {
            this.anims.stop();
            this.setFrame(0);
            this.isScratching = false;
        });
    }
}