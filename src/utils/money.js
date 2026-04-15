import Phaser from 'phaser';

export function getMoney(scene) {
    return scene.registry.get('money') || 0;
}

export function addMoney(scene, amount) {
    const currentMoney = getMoney(scene);
    scene.registry.set('money', currentMoney + amount); 
}

export function trySpendMoney(scene, amount) {
    const currentMoney = getMoney(scene);
    if (currentMoney >= amount) {
        scene.registry.set('money', currentMoney - amount);
        return true;
    } else {
        return false;
    }
}


export function createMoneyHud(scene) {
    const money = getMoney(scene);
    const moneyBubble = scene.add.ellipse(250, 100, 180, 40, 0xE2007C).setOrigin(0.5);
    const moneyText = scene.add.text(250, 100, `Dinero:${money}€`, {
        fontFamily: '"Toonway", sans-serif',
        fontSize: '24px',
        color: '#ffffff'
    }).setOrigin(0.5);
     const onMoneyChanged = (_parent, key, value) => {
        if (key === 'money') {
            moneyText.setText(`Dinero: ${value}€`)
        }
    }

    scene.registry.events.on('changedata', onMoneyChanged)

    const cleanup = () => {
        scene.registry.events.off('changedata', onMoneyChanged)
    }

    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, cleanup)
    scene.events.once(Phaser.Scenes.Events.DESTROY, cleanup)

    return moneyText
}