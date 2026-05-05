import Phaser from 'phaser'
import MenuSprite from '../../game-objects/menuSprite.js'
import widgetSprite from '../../game-objects/widgetSprite.js'

export default class Menu extends Phaser.Scene {

    constructor(){
        super({ key: 'phone' });

        this.currentStep = 0;
        this.currentPosition = 1;
        this.selectedPath = [];

        this.menuNodes = [];
        this.currentRowNodes = [];
        this.selectedIndex = 0;

        this.keyLeft = null;
        this.keyRight = null;
        this.keyUp = null;
        this.keyDown = null;
        this.keyE = null;
        this.keyEnter = null;
        this.keyG = null;

        this.xByPosition = [410, 500, 590];
        this.yByStep = [450, 390, 330, 260, 200];
    }

    create(){

        if (!this.registry.has('step')) this.registry.set('step', 0);
        if (!this.registry.has('position')) this.registry.set('position', 1);
        if (!this.registry.has('selectedPath')) this.registry.set('selectedPath', []);

        this.currentStep = this.registry.get('step');
        this.currentPosition = this.registry.get('position');
        this.selectedPath = this.registry.get('selectedPath');

        if (!this.scene.isActive('MenuAudioScene')) {
            this.scene.launch('MenuAudioScene');
        }

        // mostrar onlyMenu de fondo
        this.menuSprite = new MenuSprite(this, 500, 350);

        const drawSelectedPath = () => {

            const points = [];

            this.selectedPath.forEach((node, stepIndex) => {
                if (!node || typeof node.position !== 'number') return;

                const point = this.getNodePosition(stepIndex, node.position);
                if (point) points.push(point);
            });

            if (points.length > 1) {
                const graphics = this.add.graphics();
                graphics.lineStyle(5, 0x56beab, 0.9);
                graphics.beginPath();
                graphics.moveTo(points[0].x, points[0].y);

                for (let i = 1; i < points.length; i++) {
                    graphics.lineTo(points[i].x, points[i].y);
                }

                graphics.strokePath();
            }

            points.forEach(p => {
                this.add.image(p.x, p.y, 'pez')
                    .setScale(0.35)
                    .setDepth(5);
            });
        };

        drawSelectedPath();

        this.createNodes();

        this.widgetSprite = new widgetSprite(this, 500, 120)
            .setInteractive({ useHandCursor: true });

        this.widgetSprite.on('pointerdown', () => {
            if (this.currentStep === 5) {
                this.scene.launch('dungeon_1');
                const audioScene = this.scene.get('MenuAudioScene');
                audioScene.music.stop();
                this.scene.stop(this.scene.key);
            }
        });

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        this.buildCurrentRowSelection();
        this.updateSelectionVisuals();

        this.add.text(520, 550, 'Do not fret if you want to hurt yourself!', {
            fontFamily: '"pixelAE-Bold", monospace',
            fontSize: '10px',
            fill: '#000000',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(520, 570, 'Call or text the number 667 if you need asistance', {
            fontFamily: '"pixelAE-Regular", monospace',
            fontSize: '9px',
            fill: '#000000',
            align: 'center',
            wordWrap: { width: 200 }
        }).setOrigin(0.5);
    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(this.keyG)) {

            if (this.scene.isActive('Inventory')) return;

            this.scene.pause();
            this.scene.launch('Inventory', {
                from: 'phone'
            });

            return;
        }

        if (this.currentStep < 5) {

            if (Phaser.Input.Keyboard.JustDown(this.keyLeft) ||
                Phaser.Input.Keyboard.JustDown(this.keyUp)) {
                this.moveSelection(-1);
            }

            if (Phaser.Input.Keyboard.JustDown(this.keyRight) ||
                Phaser.Input.Keyboard.JustDown(this.keyDown)) {
                this.moveSelection(1);
            }

            if (Phaser.Input.Keyboard.JustDown(this.keyE) ||
                Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
                this.activateSelectedNode();
            }
        }

        if (this.currentStep === 5 && (Phaser.Input.Keyboard.JustDown(this.keyE) || Phaser.Input.Keyboard.JustDown(this.keyEnter))) {
            const audioScene = this.scene.get('MenuAudioScene');
            audioScene.music.stop();
            this.scene.stop(this.scene.key);
            this.scene.start('dungeon_1');
        }
    }

    getNodePosition(stepIndex, positionIndex){

        if (stepIndex < 0 || stepIndex >= this.yByStep.length) return null;
        if (positionIndex < 0 || positionIndex >= this.xByPosition.length) return null;

        return {
            x: this.xByPosition[positionIndex],
            y: this.yByStep[stepIndex]
        };
    }

    createNodes(){

        const nodeLayout = [
            [
                { key: 'accionMenu', scene: 'accion-primera-1' },
                { key: 'dialogoMenu', scene: 'dialogo-primera-1' },
                { key: 'accionMenu', scene: 'accion-primera-2' }
            ],
            [
                { key: 'dialogoMenu', scene: 'dialogo-segunda-1' },
                { key: 'accionMenu', scene: 'accion-segunda-1' },
                { key: 'accionMenu', scene: 'accion-segunda-2' }
            ],
            [
                { key: 'tiendaMenu', scene: 'tienda-tercera-1' },
                { key: 'tiendaMenu', scene: 'tienda-tercera-2' },
                { key: 'dialogoMenu', scene: 'dialogo-tercera-1' }
            ],
            [
                { key: 'accionMenu', scene: 'accion-cuarta-1' },
                { key: 'dialogoMenu', scene: 'dialogo-cuarta-1' },
                { key: 'tiendaMenu', scene: 'tienda-cuarta-1' }
            ],
            [
                { key: 'dialogoMenu', scene: 'dialogo-quinta-1' },
                { key: 'accionMenu', scene: 'accion-quinta-1' },
                { key: 'dialogoMenu', scene: 'dialogo-quinta-2' }
            ]
        ];

        this.menuNodes = [];

        nodeLayout.forEach((row, stepIndex) => {

            row.forEach((nodeConfig, positionIndex) => {

                const point = this.getNodePosition(stepIndex, positionIndex);

                const object = this.add.image(point.x, point.y, nodeConfig.key)
                    .setInteractive({ useHandCursor: true });

                const node = {
                    step: stepIndex,
                    position: positionIndex,
                    scene: nodeConfig.scene,
                    object
                };

                object.on('pointerdown', () => {
                    this.tryActivateNode(node);
                });

                this.menuNodes.push(node);
            });
        });
    }

    buildCurrentRowSelection(){

        this.currentRowNodes = this.menuNodes
            .filter(n =>
                n.step === this.currentStep &&
                this.isReachablePosition(n.position)
            )
            .sort((a, b) => a.position - b.position);

        if (!this.currentRowNodes.length) {
            this.selectedIndex = 0;
            return;
        }

        const found = this.currentRowNodes.findIndex(
            n => n.position === this.currentPosition
        );

        this.selectedIndex = found >= 0 ? found : 0;
    }

    isReachablePosition(nextPosition){
        if (this.currentStep === 0) return true;
        return Math.abs(nextPosition - this.currentPosition) <= 1;
    }

    moveSelection(direction){

        if (!this.currentRowNodes.length) return;

        const total = this.currentRowNodes.length;

        this.selectedIndex =
            (this.selectedIndex + direction + total) % total;

        this.updateSelectionVisuals();
    }

    activateSelectedNode(){

        const node = this.currentRowNodes[this.selectedIndex];
        if (!node) return;

        this.tryActivateNode(node);
    }

    tryActivateNode(node){

        if (!node) return;
        if (this.currentStep !== node.step) return;
        if (!this.isReachablePosition(node.position)) return;

        const updatedPath = [...this.registry.get('selectedPath')];
        updatedPath[this.currentStep] = { position: node.position };

        this.registry.set('selectedPath', updatedPath);
        this.registry.set('step', this.currentStep + 1);
        this.registry.set('position', node.position);

        this.scene.launch(node.scene);
        this.scene.stop(this.scene.key);
    }

    updateSelectionVisuals(){

        const selectedNode = this.currentRowNodes[this.selectedIndex];

        this.menuNodes.forEach(node => {

            const isRow = node.step === this.currentStep;
            const reachable = isRow && this.isReachablePosition(node.position);
            const selected = selectedNode === node;

            const completed = this.selectedPath[node.step];
            const isCompleted =
                node.step < this.currentStep &&
                completed &&
                completed.position === node.position;

            if (isCompleted) {
                node.object.clearTint();
                node.object.setScale(1);
                return;
            }

            if (selected) {
                node.object.clearTint();
                node.object.setScale(1.2);
                return;
            }

            if (reachable) {
                node.object.clearTint();
                node.object.setScale(1);
                return;
            }

            node.object.setTint(0x454545);
            node.object.setScale(1);
        });

        if (this.currentStep === 5) {
            this.widgetSprite.clearTint();
            this.widgetSprite.setScale(1.08);
        } else {
            this.widgetSprite.setTint(0x454545);
            this.widgetSprite.setScale(1);
        }
    }
}