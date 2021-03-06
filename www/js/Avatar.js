var avatar = null;

function setupAvatar(canvas, avatarH, avatarW, skin) {
    var world = tQuery.createWorld().boilerplate({stats: false, cameraControls: false}).start();
    world.appendTo(canvas);
    world.tCamera().position.z = 1.8;
    
    world.tRenderer().setClearColor(0xffffff, 0);
    world.tRenderer().setSize(avatarW, avatarH);
    
    avatar = new tQuery.MinecraftChar({ skinUrl: skin});
    avatar.model.addTo(world);
    
    world.loop().hook(function(delta, now) {
        var angle = 1/2 * now*Math.PI*2;
        avatar.parts.armR.rotation.x = 1.4 * Math.cos(angle + Math.PI);
        avatar.parts.armL.rotation.x = 1.4 * Math.cos(angle);
        avatar.parts.legR.rotation.x = 1.4 * Math.cos(angle);
        avatar.parts.legL.rotation.x = 1.4 * Math.cos(angle + Math.PI);
    });
    
    world.loop().hook(function(delta, now) {
        avatar.parts.headGroup.rotation.x = Math.sin(now*1.5)/3;
        avatar.parts.headGroup.rotation.y = Math.sin(now)/3;
    });
}

function rotateAvatar(x, y, z) {
    if (avatar !== null) {
        avatar.model.rotation(x, y, z);
    }
}

function modalChangeAvatar() {
    document.getElementById('floating-gear').hideItems();
    document.getElementById('change-avatar').show({animation: 'fade'});
}

function changeAvatar(skin) {
    avatar.loadSkin(skin);
    document.getElementById('change-avatar').hide({animation: 'fade'});
}