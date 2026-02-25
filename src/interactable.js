export default class Interactable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // 1. Forzamos que sea "Abstracta"
        if (new.target === Interactable) {
            throw new TypeError("No puedes instanciar la clase abstracta Interactable directamente. Debes heredar de ella.");
        }

        // 2. Diccionario de interacciones: Mapa <Entidad, Array de Funciones>
        this.interactions = new Map();

        // 3. Añadimos el objeto a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Opcional: estático por defecto para que no lo empujen
    }

    /**
     * Suscribe una nueva función de interacción para una entidad específica.
     * @param {any} entityKey - La entidad o identificador (ej. clase Player, o string "player").
     * @param {Function} callback - La función a ejecutar.
     */
    onInteract(entityKey, callback) {
        // Si la entidad no existe en el diccionario, inicializamos su array vacío
        if (!this.interactions.has(entityKey)) {
            this.interactions.set(entityKey, []);
        }
        
        // Añadimos la función a la lista de esa entidad
        this.interactions.get(entityKey).push(callback);
    }

    /**
     * Ejecuta todas las funciones asociadas a la entidad que está interactuando.
     * @param {any} entityKey - La entidad que intenta interactuar.
     */
    triggerInteraction(entityKey) {
        if (this.interactions.has(entityKey)) {
            const callbacks = this.interactions.get(entityKey);
            
            // Ejecutamos cada función guardada, pasándole la entidad y el objeto interactuable
            callbacks.forEach(callback => callback(entityKey, this));
        } else {
            console.warn("Esta entidad no tiene interacciones definidas con este objeto.");
        }
    }

    /**
     * Método opcional para limpiar interacciones y liberar memoria si el objeto se destruye.
     */
    clearInteractions(entityKey = null) {
        if (entityKey) {
            this.interactions.delete(entityKey);
        } else {
            this.interactions.clear();
        }
    }
}